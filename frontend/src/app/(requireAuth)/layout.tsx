"use client";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import App from "@/components/App";
function LayoutRequireAuth({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    if (status === "loading") return <div>LOADING...</div>;

    if (!session?.user) {
        return redirect("/api/auth/signin");
    }

    return (
        <App>
            <div className="flex w-[100vw] overflow-x-hidden h-full">
                <Sidebar />
                <main className="w-full h-full">{children}</main>
            </div>
        </App>
    );
}

export default LayoutRequireAuth;
