import { useAccesstoken, useReloadSession } from "@/hook/useAuth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchIntance = function <T>(
    url: URL | string,
    options?: RequestInit & { sendForm?: boolean }
): Promise<{ response: Response; data: T }> {
    return new Promise(async (resolve, rejects) => {
        const defaultHeader: { "Content-Type"?: string } = {
            "Content-Type": "application/json; charset=UTF-8",
        };
        if (options && options.sendForm) {
            delete defaultHeader["Content-Type"];
        }
        try {
            const response = await fetch(BASE_URL + "/api" + url, {
                method: "GET",
                ...options,
                headers: {
                    ...defaultHeader,
                    ...options?.headers,
                },
            });

            if (response.ok) {
                return resolve({ response, data: await response.json() });
            }
            response.json().then((data) => console.log(data));
            return rejects({
                status: response.status,
                statusText: response.statusText,
            });
        } catch (error) {
            console.log(error);
        }
    });
};

export default fetchIntance;
