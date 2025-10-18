import { useState } from "react";
import { useNodeContext } from "@/providers/NodeProvider"
import { Eraser, Plus } from "lucide-react";
import useHover from "@/hooks/useHover";
import { motion } from "motion/react";
import { useUIContext } from "@/providers/UIProvider";

export default function NodeControlButton({role}: {role: "add" | "clear"}) {
    const nodesCtx = useNodeContext();
    const uiCtx = useUIContext();
    const [num, setNum] = useState(0);
    const [isHovering, ref] = useHover<HTMLButtonElement>();

    // const handleAdd = () => {
    //     if(nodesCtx?.nodeList.length as number >= 6)
    //     {}
    //     else {
    //         let newNum = num;
    //         if(nodesCtx.nodeList.length === 0)
    //             newNum = 0;
    //         nodesCtx.addNode({
    //             ...movieSamples[newNum % 6],
    //             nodeId: newNum
    //         });
    //         setNum(newNum+1);
    //     }
    // }

    const handleAdd = uiCtx.openSearchBox;

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