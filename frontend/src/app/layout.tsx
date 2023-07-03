import React from "react";
import "./globals.css";
import ProvidersContext from "@/context/ProvidersContext";

const RooLayout = ({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}) => {
    return (
        <html lang="en">
            <body className="text-stone-900 dark:bg-bgDarkmode dark:text-white w-[100%] h-[100vh]">
                <ProvidersContext session={session}>
                    {children}
                </ProvidersContext>
            </body>
        </html>
    );
};

export default RooLayout;
