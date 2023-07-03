import React, { ReactElement } from "react";
import ctx from "classnames";
import Link from "next/link";

const NavSidebarWrapper = ({
    children,
    active = false,
    tooltip,
    badge,
    link,
}: {
    children: ReactElement;
    active?: boolean;
    tooltip?: string;
    badge?: number;
    link: URL | string;
}) => {
    return (
        <Link
            className={ctx(
                "relative p-2 rounded-lg hover:bg-darkHover hover:cursor-pointer text-center group",
                { active }
            )}
            href={link}
        >
            <div className="flex justify-center items-center ">{children}</div>

            {badge && badge > 0 ? (
                <div className="badge">
                    <p className="text-xs font-thin text-white">{badge}</p>
                </div>
            ) : null}

            {tooltip ? (
                <div className="hidden absolute group-hover:block animate-fadeIn z-50 top-1/2 -translate-y-[50%] left-[calc(100%+4px)] ">
                    <div className="absolute border-4 border-t-sbg-slate-200 border-l-sbg-slate-200 border-b-transparent border-r-transparent -rotate-45 top-1/2 -translate-y-1/2 left-[-2px]"></div>

                    <div className="bg-slate-200 px-1 py-0.5 rounded-lg whitespace-nowrap">
                        <p className="text-stone-900 text-xs">{tooltip}</p>
                    </div>
                </div>
            ) : null}
        </Link>
    );
};

export default NavSidebarWrapper;
