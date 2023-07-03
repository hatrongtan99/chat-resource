"use client";

import {
    useEffect,
    useRef,
    useCallback,
    Dispatch,
    SetStateAction,
} from "react";
import { LIMIT_MESSAGES_PER_REQUEST } from "@/utils/constant";

const useIntersectionObserverMessages = (
    refWrapper: HTMLDivElement | null,
    id: number,
    {
        status: statusLoadMore,
        hasMore,
        setOffsetMessages,
    }: {
        status: "loading" | "success" | "error";
        hasMore: Map<number, boolean>;
        setOffsetMessages: Dispatch<SetStateAction<Map<number, number>>>;
    }
) => {
    const observe = useRef<IntersectionObserver>();
    const prevHeight = useRef<number>();

    useEffect(() => {
        if (refWrapper) {
            prevHeight.current = refWrapper.scrollHeight;
        }
    }, [refWrapper]);

    const messageRef = useCallback(
        (node: HTMLDivElement) => {
            if (statusLoadMore === "loading") return;
            observe.current?.disconnect();
            observe.current = new IntersectionObserver(
                (entries) => {
                    if (
                        entries[0].isIntersecting &&
                        (hasMore.get(id) ?? true)
                    ) {
                        refWrapper?.scrollTo({
                            top: refWrapper.scrollHeight - prevHeight.current!,
                        });
                        prevHeight.current = refWrapper?.scrollHeight;
                        setOffsetMessages((prev) => {
                            const prevOffset = prev.get(id);
                            prev.set(
                                id,
                                prevOffset
                                    ? prevOffset + LIMIT_MESSAGES_PER_REQUEST
                                    : LIMIT_MESSAGES_PER_REQUEST
                            );
                            return structuredClone(prev);
                        });
                    }
                },
                {
                    threshold: 0,
                }
            );
            if (node) {
                observe.current.observe(node);
            }
        },
        [hasMore.get(id), statusLoadMore, id]
    );

    return { messageRef };
};

export default useIntersectionObserverMessages;
