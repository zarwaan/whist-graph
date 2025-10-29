import { useNodeContext } from "@/providers/NodeProvider";
import { useUIContext } from "@/providers/UIProvider";
import type { Media } from "@/types/media";
import type { Person } from "@/types/person";
import makeImageSource from "@/utils/makeImageSource";
import { motion } from "motion/react";

export default function SearchResult({item}: {item: Media | Person}) {
    const nodeCtx = useNodeContext();
    const UIctx = useUIContext();
    return (
        <motion.button className="rounded-[20px] flex flex-row flex-center p-2 gap-5 
                        shadow-[0px_0px_5px_3px] shadow-indigo-400/50 cursor-pointer 
                        bg-black w-95/100 m-auto"
                        whileHover={{boxShadow: '0px 0px 5px 3px #8eaaffff', scale: 1.03}}
                        whileTap={{scale: 0.98}}
                        transition={{duration: 0.2, ease: 'linear'}}
                        onClick={()=>{
                            if(nodeCtx.nodeList.length >= 6) return;
                            requestAnimationFrame(() => 
                                nodeCtx.addNode(
                                    {
                                        ...item,
                                        nodeId: JSON.stringify({
                                            id: item.id,
                                            type: item.type
                                        }),
                                        excluded: false
                                    }
                                )
                            )
                            UIctx.closeSearchBox();
                        }}>
            <div className="flex-1">
                <img src={makeImageSource(item.imagePath || "", "w154")} alt={item.title} className="rounded-[calc(20px-var(--spacing)*2)]"/>
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
        </motion.button>
    )
}