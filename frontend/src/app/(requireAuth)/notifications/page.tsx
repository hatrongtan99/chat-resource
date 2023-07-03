import LeftResizeable from "@/components/leftResizeable";
import { NotifiContainer } from "@/components/notifications/NotifiContainer";
import React from "react";

const page = () => {
    return (
        <div className="flex">
            {/* <LeftResizeable> */}
            <div className="basis-1/5 border-r border-darkHover h-[100vh] flex flex-col">
                <div className="mt-4 mx-2 mb-1">
                    <h2>Thông báo</h2>
                </div>
                <NotifiContainer />
            </div>

            {/* </LeftResizeable> */}
        </div>
    );
};

export default page;
