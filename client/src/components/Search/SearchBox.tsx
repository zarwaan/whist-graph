import { useEffect, useState } from "react"
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { motion } from "motion/react";
import { useUIContext } from "@/providers/UIProvider";
import { Search, SearchX, X } from "lucide-react";
import type { Media } from "@/types/media";
import type { Person } from "@/types/person";
import { useViewContext } from "@/providers/ViewProvider";
import useDebounce from "@/hooks/useDebounce";
import useFetch from "@/hooks/useFetch";
import Loader from "../Loader";

const CloseButton = () => {
    const uiCtx = useUIContext();
    return (
        <div className="absolute right-2 top-2 leading-none">
            <button className="h-fit cursor-pointer" onClick={uiCtx.closeSearchBox}>
                <X strokeWidth={3} size={20} className="transition-[scale] hover:scale-[120%]"/>
            </button>
        </div>
    )
}

export default function SearchBox({}) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedTerm = useDebounce(searchTerm, 500);
    const [searchResult, setSearchResults] = useState<Array<Media | Person>>([]);
    const viewCtx = useViewContext();
    const {data, loading, fetchData} = useFetch(``);
    
    useEffect(() => {
        const resource = viewCtx.view === "media" ? "person" : "media"
        if(debouncedTerm)
        {
            const url = `search/${resource}?q=${encodeURIComponent(debouncedTerm)}`
            fetchData(url)
        }
    },[debouncedTerm,viewCtx.view])

    useEffect(() => {
        if(data){
            setSearchResults(data.result)
        }
    },[data])

    
    return (
        <motion.div className="mx-auto mt-3 w-6/10 rounded-xl bg-(--background-color) relative
                         z-10 text-(--text-color)/80 shadow-glow-purple 
                         h-fit max-h-[70%] min-h-0 flex overflow-hidden" 
            style={{
                gridArea: "stack"
            }}
            initial={{opacity: 0, scale: '0%'}}
            animate={{opacity: 1, scale: '100%'}}
            exit={{opacity: 0, scale: '0%'}}   
            transition={{duration:0.35, ease:"easeInOut"}}
        >
            <CloseButton />
            <div className="flex flex-col py-3 gap-2 bg-indigo-40080 rounded-xl flex-1 w-full">
                <div className="">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className="mx-auto w-75/100 flex flex-col gap-4 min-h-0 overflow-y-scroll custom-scroll p-3 py-2">
                    {
                        debouncedTerm === "" ?
                        <span className="flex gap-2 w-fit m-auto leading-[1.3]">
                            <div><Search size={18}/></div>
                            <span>Start typing to see search results</span>
                        </span>
                        :
                        loading ? 
                        <div className="w-15/100 m-auto">
                            <Loader />
                        </div>
                        :
                        searchResult.length > 0 ?
                        searchResult.map((item) => <SearchResult item={item} key={item.id}/>)
                        :
                        <span className="flex gap-2 w-fit m-auto leading-[1.3]">
                            <div><SearchX size={18}/></div>
                            <span>No results</span>
                        </span>
                    }
                </div>
                {
                    !loading && searchResult.length > 0 &&
                    <div className="absolute w-fit bottom-1 right-3 italics text-sm">
                        <i>{searchResult.length} results</i>
                    </div>
                }
            </div>
        </motion.div>
    )
}

// text-blue-100/80
