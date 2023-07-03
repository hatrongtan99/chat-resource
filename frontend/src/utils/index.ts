import { TypeFile } from "@/types/Message";
import cx from "classnames";
import moment from "moment";
import { ClassNameValue, twMerge } from "tailwind-merge";

export const formatDate = (time: Date) => {
    // return moment(time).from(new Date());
    return moment(time).utc(true).from(new Date());
};

export const getTimeDate = (date: Date) => {
    return new Date(date).getTime();
};

export const typeFile = (file: File): TypeFile => {
    if (file.type.includes("image")) {
        return TypeFile.IMAGE;
    } else if (file.type.includes("video")) {
        return TypeFile.VIDEO;
    }
    return TypeFile.ORTHER;
};

export const mergeClassName = (...inputs: ClassNameValue[]) => {
    return twMerge(cx(inputs));
};
