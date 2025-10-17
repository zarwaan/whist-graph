import { useState } from "react";
import { useNodeContext, type MediaNode, type NodeList } from "@/providers/NodeProvider"
import killbill from '@/assets/images/posters/killbill.jpg'
import starwars from '@/assets/images/posters/starwars.webp'
import pandp from '@/assets/images/posters/pandp.webp'
import omshantiom from '@/assets/images/posters/omshantiom.webp'
import thelegomovie from '@/assets/images/posters/thelegomovie.webp'
import lailamajnu from '@/assets/images/posters/lailamajnu.webp'
import { Eraser, Plus } from "lucide-react";
import useHover from "@/hooks/useHover";
import { motion } from "motion/react";

const samples: NodeList<MediaNode> = [
    {
        nodeId: 1,
        id: 123,
        title: "Kill Bill Vol. 1",
        type: "movie",
        imagePath: killbill
    },
    {
        nodeId: 2,
        id: 123,
        title: "Star Wars",
        type: "movie",
        imagePath: starwars
    },
    {
        nodeId: 3,
        id: 123,
        title: "Pride and Prejudice",
        type: "movie",
        imagePath: pandp
    },
    {
        nodeId: 4,
        id: 123,
        title: "Om Shanti Om",
        type: "movie",
        imagePath: omshantiom
    },
    {
        nodeId: 5,
        id: 123,
        title: "The Lego Movie",
        type: "movie",
        imagePath: thelegomovie
    },
    {
        nodeId: 6,
        id: 123,
        title: "Laila Majnu",
        type: "movie",
        imagePath: lailamajnu
    }
]

export default function NodeControlButton({role}: {role: "add" | "clear"}) {
    const nodesCtx = useNodeContext();
    const [num, setNum] = useState(0);
    const [isHovering, ref] = useHover<HTMLButtonElement>();

    const handleAdd = () => {
        if(nodesCtx?.nodeList.length as number >= 6)
        {}
        else {
            let newNum = num;
            if(nodesCtx.nodeList.length === 0)
                newNum = 0;
            nodesCtx.addNode({
                ...samples[newNum % 6],
                nodeId: newNum
            });
            setNum(newNum+1);
        }
    }

    const handleClear = () => {
        nodesCtx.clearNodes();
        setNum(0);
    }

    return (
        <motion.button className='border border-white p-2 m-1 rounded-lg cursor-pointer text-sm flex gap-1' 
			onClick={() => {
                if(role === "add")
                    handleAdd();
                else if(role === "clear")
                    handleClear();
            }}
            ref={ref}
            whileTap={{y: 2}}
        >
            {
                role === "add" ?
                <div style={{
                        transform: `${isHovering ? 'rotate(90deg)' : 'rotate(0deg)'}`
                    }} className="transition-all duration-500 linear">
                    <Plus size={18}/>
                </div> :
                role === "clear" ?
                <div style={{
                        animation: `${isHovering ? 'shake 0.5s linear 2' : ''}`
                    }} className="transition-all duration-500 linear">
                    <Eraser size={18}/>
                </div> :
                ""
            }
            {
                role === "add" ? "Add new node" : role === "clear" ? "Clear all nodes" : ""
            }
        </motion.button>
    )
}