"use client";

import { RefObject, useEffect } from "react";
type Event = keyof GlobalEventHandlersEventMap;

const useHandleClickOutside = <T extends HTMLElement>(
    ref: RefObject<T>,
    callback: () => void
) => {
    const hanldeClickoutside = (e: MouseEvent) => {
        if (ref.current && ref.current.contains(e.target as Node)) {
            return;
        }
        callback();
    };
    useEffect(() => {
        document.addEventListener("mousedown", hanldeClickoutside);

        return () => {
            document.removeEventListener("mousedown", hanldeClickoutside);
        };
    }, [ref, callback]);
};

const useAddEventListener = (eventName: Event, handler: (e: any) => void) => {
    useEffect(() => {
        document.addEventListener(eventName, handler);

        return () => {
            document.removeEventListener(eventName, handler);
        };
    }, [eventName, handler]);
};

export { useHandleClickOutside, useAddEventListener };
