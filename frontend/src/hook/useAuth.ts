import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useReloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
};

export const useAccesstoken = (...args: any) => {
    const { data, status } = useSession();
    return {
        status,
        accessToken: data?.user.accessToken,
        id: data?.user.user.id,
    };
};

export const useAuth = () => {
    const { data } = useSession();
    return { user: data?.user };
};
