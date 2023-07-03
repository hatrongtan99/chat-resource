"use client";

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";
interface ConfigContextProps {
    setWidthResize: Dispatch<SetStateAction<string>>;
    widthResize: string;
}

export const ConfigContext = createContext({} as ConfigContextProps);

const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [widthResize, setWidthResize] = useState<string>("200px");
    return (
        <ConfigContext.Provider value={{ widthResize, setWidthResize }}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigProvider;
