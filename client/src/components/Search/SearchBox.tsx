import { useState } from "react"
import SearchBar from "./SearchBar";
import { movieSamples } from "@/temp/movies.samples";
import SearchResult from "./SearchResult";

export default function SearchBox({}) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    return (
        <div className="mx-auto mt-3 max-w-6/10 rounded-xl bg-(--background-color)
                         z-2 text-(--text-color)/80 shadow-[0px_0px_10px_3px_rgb(198,210,255)]
                        shadow-indigo-400/50 border-indigo-600/50 border-1 h-fit max-h-[70%] min-h-0 flex overflow-hidden" 
            style={{
                gridArea: "stack"
            }}
        >
            <div className="flex flex-col py-3 gap-2 bg-indigo-40080 rounded-xl flex-1 w-full">
                <div className="">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className="mx-auto w-70/100 flex flex-col gap-4 min-h-0 overflow-y-scroll custom-scroll p-3 py-2">
                    {
                        movieSamples.map((item) => <SearchResult item={item} key={item.id}/>)
                    }
                </div>
            </div>
        </div>
    )
}

// text-blue-100/80
