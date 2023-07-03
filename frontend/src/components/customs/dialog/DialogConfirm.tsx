import React from "react";
import Button from "../Button";

const DialogConfirm = ({
    title,
    body,
    labelCancel = "Huỷ",
    labelAccept = "Xác Nhận",
    callback,
    cancelCallback,
}: {
    title?: string;
    body?: string;
    labelCancel?: string;
    labelAccept?: string;
    callback: () => any;
    cancelCallback: () => any;
}) => {
    const handleAccept = () => {
        callback();
        cancelCallback();
    };
    const handleCancel = () => {
        cancelCallback();
    };
    return (
        <div className="relative z-30 px-4 flex items-center justify-center mx-auto">
            <div className="bg-darkLight rounded-lg md:max-w-md md:min-w-[350px] min-w-[200px] p-4 ">
                <div className="md:flex items-center">
                    {/* <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                        <i className="bx bx-error text-3xl"></i>
                    </div> */}
                    <div className="mt-4 md:mt-0 text-center md:text-left">
                        <p className="font-bold">{title}</p>
                        <p className="text-sm text-stone-300 mt-1">{body}</p>
                    </div>
                </div>
                <div className=" mt-4 md:flex md:justify-end">
                    <Button
                        className="w-full md:w-auto md:py-2 text-stone-300 md:ml-2 md:order-2"
                        onClick={handleAccept}
                    >
                        {labelAccept}
                    </Button>
                    <Button
                        className="w-full md:w-auto md:py-2 
                        !bg-gray-200 hover:!bg-gray-300 mt-4
                          md:mt-0 md:order-1"
                        onClick={handleCancel}
                    >
                        {labelCancel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DialogConfirm;
