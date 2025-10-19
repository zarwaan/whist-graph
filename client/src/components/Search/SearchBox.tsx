import { useEffect, useState } from "react"
import SearchBar from "./SearchBar";
import { movieSamples } from "@/temp/movies.samples";
import SearchResult from "./SearchResult";
import { motion } from "motion/react";
import { useUIContext } from "@/providers/UIProvider";
import { Search, SearchX, X } from "lucide-react";
import type { Media } from "@/types/media";
import type { Person } from "@/types/person";
import { useViewContext } from "@/providers/ViewProvider";
import { peopleSamples } from "@/temp/people.samples";
import useDebounce from "@/hooks/useDebounce";

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
    const [filtered, setFiltered] = useState<Array<Media | Person>>([]);
    const viewCtx = useViewContext();

    useEffect(() => {
        const arr = viewCtx.view === "people" ? movieSamples : peopleSamples;
        setFiltered(arr.filter((item,_index) => 
                            item.title.toLowerCase().includes(debouncedTerm.toLowerCase())))
    },[debouncedTerm,viewCtx.view])

    
    return (
        <motion.div className="mx-auto mt-3 w-6/10 rounded-xl bg-(--background-color) relative
                         z-10 text-(--text-color)/80 shadow-[0px_0px_10px_3px_rgb(198,210,255)]
                        shadow-indigo-400/50 border-indigo-600/50 border-1 h-fit max-h-[70%] min-h-0 flex overflow-hidden" 
            style={{
                gridArea: "stack"
            }}
            initial={{opacity: 0, scale: '0%'}}
            animate={{opacity: 1, scale: '100%'}}
            exit={{opacity: 0, scale: '0%'}}
            // transition={{duration: 0.3, ease: 'sp'}}    
            transition={{type:'spring',bounce: 0.27,duration:1}}
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
                        filtered.length > 0 ?
                        filtered.map((item) => <SearchResult item={item} key={item.id}/>)
                        :
                        <span className="flex gap-2 w-fit m-auto leading-[1.3]">
                            <div><SearchX size={18}/></div>
                            <span>No results</span>
                        </span>
                    }
                </div>
            </div>
        </motion.div>
    )
}

// text-blue-100/80
