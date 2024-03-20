"use client";

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";
interface ConfigContextProps {
    setWidthResize: Dispatch<SetStateAction<string>>;
    widthResize: string;
    openSidebar: boolean;
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const ConfigContext = createContext({} as ConfigContextProps);

const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [widthResize, setWidthResize] = useState<string>("200px");
    const [openSidebar, setOpenSidebar] = useState<boolean>(true);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setOpenSidebar(false);
            setWidthResize("0px");
        }
        const handleResize = (e: Event) => {
            const target = e.target as Window;
            if (target.innerWidth <= 768) {
                setOpenSidebar(false);
            } else {
                setOpenSidebar(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <ConfigContext.Provider
            value={{ widthResize, setWidthResize, openSidebar, setOpenSidebar }}
        >
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigProvider;
