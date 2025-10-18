import type { Media } from "@/types/media";
import type { Person } from "@/types/person";

export default function SearchResult({item}: {item: Media | Person}) {
    return (
        <div className="rounded-[20px] flex flex-row flex-center p-2 gap-5 bg-[rgb(198,210,255)/50 
                        bg-indigo400/50 shadow-[0px_0px_5px_3px_rgb(198,210,255)]
                        shadow-indigo-400/50">
            <div className="flex-1">
                <img src={item.imagePath} alt={item.title} className="rounded-[calc(20px-var(--spacing)*2)]"/>
            </div>
            <div className="flex flex-col w-80/100">
                <span className="text-xl font-bold max-w-full w-fit truncate">
                    {
                        item.title
                    }
                </span>
                {
                    (item.type === "movie" || item.type === "tv") &&
                    <span className="w-fit text-[12px] font-light">
                        {
                            item.year
                        }
                    </span>
                }
            </div>
        </div>
    )
}