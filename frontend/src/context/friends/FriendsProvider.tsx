"use client";
import { User } from "@/types/User";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

interface FriendsContextProps {
    numberNotify: number;
    setNumberNotify: Dispatch<SetStateAction<number>>;
    friendsOnline: User[];
    setFriendsOnline: Dispatch<SetStateAction<User[]>>;
}
export const FriendsContext = createContext({} as FriendsContextProps);

const FriendsProvider = ({ children }: { children: ReactNode }) => {
    const [numberNotify, setNumberNotify] = useState<number>(0);

    const [friendsOnline, setFriendsOnline] = useState<User[]>([]);
    return (
        <FriendsContext.Provider
            value={{
                numberNotify,
                setNumberNotify,
                friendsOnline,
                setFriendsOnline,
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};

export default FriendsProvider;
