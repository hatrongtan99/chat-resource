"use client";
import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number = 700) => {
    const [debounceValue, setDebounceValue] = useState<string>(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
