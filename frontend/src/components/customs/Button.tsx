import ct from "classnames";
import { ClassNameValue, twMerge } from "tailwind-merge";
import React, { ComponentProps, ElementType, ReactNode } from "react";

interface ButtonProps<T extends ElementType> {
    variant?: "default" | "text";
    as?: T;
    children: ReactNode;
    size?: "sm" | "md" | "lg";
    className?: ClassNameValue;
    disabled?: boolean;
}

type MyButtonProps<T extends ElementType> = ButtonProps<T> &
    Omit<ComponentProps<T>, keyof ButtonProps<T>>;

const Button = <T extends ElementType>({
    variant = "default",
    children,
    as,
    size = "md",
    className,
    disabled,
    ...props
}: MyButtonProps<T>) => {
    const Component = as ?? "button";

    return (
        <Component
            className={twMerge(
                ct(
                    "btn",
                    {
                        [variant]: !!variant,
                        [size]: !!size,
                        disabled,
                    },
                    className
                )
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
