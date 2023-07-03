"use client";

import { ReactElement, useRef, useState } from "react";
import { useAddEventListener, useHandleClickOutside } from "@/hook";
import { mergeClassName } from "@/utils";
import { ClassNameValue } from "tailwind-merge";
import ModalPopup from "../modal/ModalPopup";

interface ButtonWithHandleClickOutsideProps {
    buttonChildren: ReactElement;
    children: ReactElement;
    position?: "absolute" | "relative";
    className?: ClassNameValue;
    invisiable?: boolean;
    modal?: boolean;
    handleClick?: () => void;
}

const ButtonWithHandleClickOutside = ({
    buttonChildren,
    children,
    position = "relative",
    className,
    invisiable,
    modal,
    handleClick: handleClickModal = () => {},
}: ButtonWithHandleClickOutsideProps) => {
    const [openChildren, setOpenChildren] = useState(false);
    const refChildren = useRef<HTMLDivElement>(null);

    useHandleClickOutside(refChildren, () => {
        setOpenChildren(false);
    });

    const handleClick = () => {
        setOpenChildren(!openChildren);
    };

    useAddEventListener("keydown", (e: any) => {
        if (e.key === "Escape") {
            setOpenChildren(false);
        }
    });

    return (
        <div
            className={mergeClassName(
                `${position} w-auto h-auto mb-1.5 last:mb-0 ${
                    invisiable ? (openChildren ? "" : "invisible") : ""
                } `,
                className
            )}
        >
            {!modal ? (
                <div ref={refChildren}>
                    <div onClick={handleClick}>{buttonChildren}</div>
                    {openChildren && <>{children}</>}
                </div>
            ) : (
                <>
                    {openChildren ? (
                        <>
                            <div onClick={handleClick}>{buttonChildren}</div>
                            <ModalPopup handleClick={handleClickModal}>
                                <div ref={refChildren}>{children}</div>
                            </ModalPopup>
                        </>
                    ) : (
                        <>
                            <div onClick={handleClick}>{buttonChildren}</div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ButtonWithHandleClickOutside;
