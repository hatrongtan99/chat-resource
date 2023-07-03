"use client";

import useSocketFriends from "@/hook/useSocketFriends";
import useSocketGroup from "@/hook/useSocketGroup";
import useSocketMessages from "@/hook/useSocketMessages";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const App = ({ children }: { children: ReactNode }) => {
    useSocketFriends();
    useSocketMessages();
    useSocketGroup();
    return (
        <>
            {children}
            <Toaster />
        </>
    );
};

export default App;
