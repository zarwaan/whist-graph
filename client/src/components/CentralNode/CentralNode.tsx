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
    const {data, loading, fetchData} = useFetch(``);
    useEffect(() => {
        if(nodeCtx.nodeList.length <= 1) return;
        let url = viewCtx.view === "media" ? `common/media?personIds=` : "common/people?media=";
        nodeCtx.nodeList.forEach(n => {
            if(viewCtx.view === "people")
                url += `${n.type}${n.id},`
            else 
                url += `${n.id},`
        })
        fetchData(url.slice(0,-1))
    },[nodeCtx.nodeList,viewCtx.view])

    useEffect(() => {
        if(data)
            setCommonNodes(data.common)
        else
            setCommonNodes([])
    },[data])

    return (
        <motion.div className="absolute bg-(--background-color) shadow-[0px_0px_10px_3px_rgb(198,210,255)]
        shadow-indigo-400/50 w-fit max-w-45/100 rounded-2xl left-5/10 top-48/100 -translate-5/10 
        flex flex-center flex-col px-4 py-2"
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
            <div className="text-xl font-bold">
                Common {viewCtx.view === "media" ? "media" : "people"}:
            </div>
            <div className="flex gap-5 overflow-x-auto custom-scroll pb-3 pt-3 w-fit max-w-full m-auto"
            >
                {
                    loading && 
                    <div className="w-[5em]">
                        <Loader />
                    </div>
                }
                {
                    (data && !loading && data.common.length > 0) && commonNodes.map((item) => 
                        <CommonNode node={{...item, nodeId: ''+item.id}} key={item.id}/>
                    )
                    
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
// peopleSamples.map((item, index) =>
//     <CommonNode node={{...item, nodeId: ''+item.id}} key={item.id}/>
// )