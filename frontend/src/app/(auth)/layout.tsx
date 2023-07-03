import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

const LayoutAuth = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(nextAuthOptions);

    if (session?.user) {
        return redirect("/");
    }

    return <>{children}</>;
};

export default LayoutAuth;
