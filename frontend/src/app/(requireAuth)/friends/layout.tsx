import { ReactNode } from "react";

const layout = ({
    children,
    friendsId,
}: {
    children: ReactNode;
    friendsId: ReactNode;
}) => {
    return (
        <>
            {children}
            {friendsId}
        </>
    );
};

export default layout;
