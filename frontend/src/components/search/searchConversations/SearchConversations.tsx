import { AiOutlineSearch } from "react-icons/ai";

const SearchConversations = () => {
    return (
        <div className="mx-2">
            <div className="border-2 border-stone-400 flex items-center bg-bgDarkmodeComment rounded-sm focus-within:border-2 focus-within:border-cyan-900 transition-all ">
                <div className="p-0.5 text-darkLight">
                    <AiOutlineSearch size="1rem" />
                </div>
                <input
                    type="text"
                    className="outline-none border-none w-full pl-1 bg-inherit text-xs font-thin"
                    placeholder="Search"
                />
            </div>
        </div>
    );
};

export default SearchConversations;
