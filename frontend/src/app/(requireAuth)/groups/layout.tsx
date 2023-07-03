import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return <div className="h-full flex">{children}</div>;
};

export default layout;
