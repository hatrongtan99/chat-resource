import React from "react";

const SpinnerLoadmore = () => {
    return (
        <div className=" w-full h-[50px] my-2 bg-transparent absolute">
            <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
            >
                <path
                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    className="spinner_aj0A"
                />
            </svg>
        </div>
    );
};

export default SpinnerLoadmore;
