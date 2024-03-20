import { ProfileUser } from "@/types/User";
import fetchIntance from "./fetchIntance";

export const updateProfileUserAPI = (token: string, formData: FormData) => {
    return fetchIntance<ProfileUser>("/profile", {
        method: "PATCH",
        body: formData,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};
