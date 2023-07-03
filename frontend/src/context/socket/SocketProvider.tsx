"use client";

import { createContext, ReactNode, useEffect, useRef, useState } from "react";

import { Socket, io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { useAccesstoken } from "@/hook/useAuth";
export const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    const { id, accessToken } = useAccesstoken();

    useEffect(() => {
        if (accessToken) {
            if (!socket) {
                setSocket(
                    io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
                        withCredentials: true,
                        auth: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                );
            }
        }
    }, [accessToken]);

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                console.log("connect success");
            });

            socket.on("connect_error", () => {
                console.log("Somthing wrong!");
            });

            socket.on("disconnect", () => {
                console.log("disconnect");
            });
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={socket!}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
