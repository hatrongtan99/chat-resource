import { mergeClassName } from "@/utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ClassNameValue } from "tailwind-merge";

const ButtonMenu = ({
    SIZE_ICON,
    className,
}: {
    SIZE_ICON: string;
    className?: ClassNameValue;
}) => {
    return (
        <div className={mergeClassName("btn-icon", className)}>
            <BsThreeDotsVertical size={SIZE_ICON} />
        </div>
    );
};

export default ButtonMenu;
