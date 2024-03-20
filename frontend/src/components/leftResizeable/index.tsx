"use client";

import { ConfigContext } from "@/context/config/ConfigProvider";
import { mergeClassName } from "@/utils";
import cx from "classnames";
import React, {
    ReactNode,
    useRef,
    useEffect,
    useState,
    useCallback,
    useContext,
} from "react";
import { ClassNameValue } from "tailwind-merge/dist/lib/tw-join";
const LeftResizeable = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: ClassNameValue;
}) => {
    // RESIZE
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const { widthResize, setWidthResize, openSidebar } =
        useContext(ConfigContext);
    const refComponentResize = useRef<HTMLDivElement>(null);

    const resize = useCallback(
        (e: MouseEvent) => {
            if (isResizing) {
                setWidthResize(
                    `${
                        e.clientX -
                        refComponentResize.current?.getBoundingClientRect()!
                            ?.left
                    }px`
                );
            }
        },
        [isResizing]
    );

    useEffect(() => {
        const stopResize = () => {
            setIsResizing(false);
        };
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
        return () => {
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);
        };
    }, [isResizing]);

    return (
        <div
            className={mergeClassName(
                "flex border-r  border-darkHover flex-col relative",
                className,
                cx({
                    "min-w-[220px]": openSidebar,
                })
            )}
            style={{ width: widthResize }}
            ref={refComponentResize}
        >
            {children}
            <div
                className="absolute w-2 hover:w-4 transition-[width] hover:bg-blue-700 bg-transparent h-full hover:cursor-col-resize left-[100%] z-20 "
                onMouseDown={(e) => {
                    e.preventDefault();
                    setIsResizing(true);
                }}
            ></div>
        </div>
    );
};

export default LeftResizeable;
