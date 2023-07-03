import { useAddEventListener } from "@/hook";
import React, { MouseEvent, ReactElement, useRef } from "react";

interface ModalPopupProps {
    children: ReactElement;
    handleClick: () => void;
}
const ModalPopup = ({ children, handleClick }: ModalPopupProps) => {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === overlay.current || e.target === wrapper.current) {
            handleClick();
        }
    };

    useAddEventListener("keydown", (e: any) => {
        if (e.key === "Escape") {
            handleClick();
        }
    });

    return (
        <div
            ref={overlay}
            className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
            onClick={(e) => onClick(e)}
        >
            <div
                ref={wrapper}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit"
            >
                {children}
            </div>
        </div>
    );
};

export default ModalPopup;
