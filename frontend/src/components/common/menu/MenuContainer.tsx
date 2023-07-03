import { mergeClassName } from "@/utils";
import { Value } from "classnames";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

const MenuContainer = ({
    className,
    children,
}: {
    className?: ClassNameValue;
    children: ReactNode;
}) => {
    return (
        <div
            className={mergeClassName(
                "absolute top-10 right-0 menu-wraper z-10 bg-darkLight px-1.5 py-1 min-w-[100px] min-h-[100px] rounded-md shadow-2xl border-darkHover border",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MenuContainer;
