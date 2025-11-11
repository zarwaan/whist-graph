// @ts-ignore
import { peopleSamples } from "@/temp/people.samples";
import CommonNode from "./CommonNode";
import { useViewContext } from "@/providers/ViewProvider";
import { useNodeContext } from "@/providers/NodeProvider";
import { useEffect, useState } from "react";
import type { Media } from "@/types/media";
import type { Person } from "@/types/person";
import useFetch from "@/hooks/useFetch";
import { motion } from "motion/react";
import Loader from "../Loader";

export default function CentralNode({}) {
    const viewCtx = useViewContext();
    const nodeCtx = useNodeContext();
    const [commonNodes, setCommonNodes] = useState<Array<Media | Person>>([])
    const {data, loading, error, fetchData} = useFetch(``);

    useEffect(() => {
        if(nodeCtx.nodeList.length <= 1) return;
        let url = viewCtx.view === "media" ? `common/media?personIds=` : "common/people?media=";
        nodeCtx.nodeList.forEach(n => {
            if(!n.excluded){
                if(viewCtx.view === "people")
                    url += `${n.type}${n.id},`
                else 
                    url += `${n.id},`
            }
        })
        fetchData(url.slice(0,-1))
    },[nodeCtx.nodeList,viewCtx.view])

    useEffect(() => {
        if(data)
            setCommonNodes(data.common)
        else
            setCommonNodes([])
    },[data])

    const fetchedWithoutErrors = () => (!loading && !error && data && data.common.length > 0)

    return (
        <motion.div className="absolute bg-(--background-color) shadow-glow-purple 
        w-fit max-w-45/100 rounded-2xl left-5/10 top-48/100 -translate-5/10 
        flex flex-center flex-col px-2 py-2 max-md:max-h-45/100 max-md:max-w-full"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5, ease:"linear"
            //     , layout: {
            //     duration: 0.4,
            //     ease: "easeIn"
            // }
        }}
            // layout
        >
            {
                fetchedWithoutErrors() &&
                <div className="text-xl max-md:text-base font-bold">
                    {data.common.length} Common {viewCtx.view === "media" ? "media" : "people"}:
                </div>
            }
            <div className="flex gap-5 max-md:gap-3 overflow-x-auto custom-scroll py-3 px-2 w-fit max-w-full m-auto max-md:flex-col"
            style={fetchedWithoutErrors() ? {
                WebkitMaskImage: `linear-gradient(to right,transparent 0,    
                                    black 20px,
                                    black calc(100% - 20px), 
                                    transparent 100%
                                )`,
                maskImage: `linear-gradient(
                            to right,
                            transparent 0,
                            black 20px,
                            black calc(100% - 20px),
                            transparent 100%
                        )`
            } : {}}
            >
                {
                    loading && 
                    <div className="w-[5em] max-md:m-auto">
                        <Loader />
                    </div>
                }
                {
                    error &&
                    <span>An error occured</span>
                }
                {
                    fetchedWithoutErrors() && commonNodes.map((item) => 
                        <CommonNode node={{...item, nodeId: ''+item.id, excluded: false}} key={item.id}/>
                    )
                    // peopleSamples.map((item) => 
                    //     <CommonNode node={{...item, nodeId: ''+item.id, excluded: false}} key={item.id}/>
                    // )
                }
                {
                    (data && !loading && data.common.length === 0) && 
                    <span>
                        No common {viewCtx.view === "media" ? "media" : "people"}!
                    </span>
                }
            </div>
        </motion.div>
    )
}