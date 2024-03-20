import React from "react";
import ModalPopup from "../common/modal/ModalPopup";

const CreateOrUpdateProfileForm = () => {
    return (
        <ModalPopup handleClick={() => {}}>
            <div className="rounded-lg p-6 bg-darkLight mx-auto min-w-[300px] md:min-w-[500px]">
                <form>
                    <div className="mb-6"></div>
                </form>
            </div>
        </ModalPopup>
    );
};

export default CreateOrUpdateProfileForm;
