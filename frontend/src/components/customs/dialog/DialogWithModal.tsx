"use client";

import ButtonWithHandleClickOutside from "@/components/common/buttonWithHandleClickOutside/ButtonWithHandleClickOutside";

import { ReactElement, useCallback, useState } from "react";
import DialogConfirm from "./DialogConfirm";

interface DialogWithModalProps {
    buttonChildren: ReactElement;
    callbackAccept: () => void;
    titleDialog: string;
    labelAccept?: string;
    labelCancel?: string;
    bodyDialog?: string;
}

const DialogWithModal = ({
    buttonChildren,
    callbackAccept,
    titleDialog,
    labelAccept,
    labelCancel,
    bodyDialog,
}: DialogWithModalProps) => {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <ButtonWithHandleClickOutside
            buttonChildren={
                <div onClick={() => setOpenDialog(true)}>{buttonChildren}</div>
            }
            modal={true}
        >
            <DialogConfirm
                callback={callbackAccept}
                cancelCallback={() => {
                    setOpenDialog(!openDialog);
                }}
                title={titleDialog}
                labelAccept={labelAccept}
                labelCancel={labelCancel}
                body={bodyDialog}
            />
        </ButtonWithHandleClickOutside>
    );
};

export default DialogWithModal;
