import { useEffect, useState } from "react";
import { useNodeContext } from "@/providers/NodeProvider"
import { Eraser, Plus } from "lucide-react";
import useHover from "@/hooks/useHover";
import { motion } from "motion/react";
import { useUIContext } from "@/providers/UIProvider";
import { movieSamples } from "@/temp/movies.samples";
import { useLineContext } from "@/providers/LineProvider";
import Responsive from "./Responsive";

export default function NodeControlButton(
    {role, point=false, test=false}: 
    {role: "add" | "clear", test?: boolean, point?:boolean}
) {
    const nodesCtx = useNodeContext();
    const uiCtx = useUIContext();
    const lineContext = useLineContext();
    const [num, setNum] = useState(0);
    const [isHovering, ref] = useHover<HTMLButtonElement>();

    const handleTestAdd = () => {
        if(nodesCtx?.nodeList.length as number >= 6)
        {}
        else {
            let newNum = num;
            if(nodesCtx.nodeList.length === 0)
                newNum = 0;
            nodesCtx.addNode({
                ...movieSamples[newNum % 6],
                nodeId: ''+num,
                excluded: false
            });
            setNum(newNum+1);
        }
    }

    const handleAdd = () => {
        if(nodesCtx?.nodeList.length as number >= 6) {
            uiCtx.setToast({
                kind: "warning",
                message: "You can only add a maximum of 6 nodes at a time"
            })
        }
        else{
            uiCtx.openSearchBox();
        }
    }

    const handleClear = () => {
        nodesCtx.clearNodes();
        setNum(0);
    }

    useEffect(() => {
        if (!ref.current || !point) return;

        const el = ref.current;

        const update = () => {
            const rect = el.getBoundingClientRect();
            lineContext.setLine(l => ({
                ...l,
                b: {
                    x: rect.left + rect.width / 2,
                    y: (rect.top + rect.height) * 1.3
                }
            }));
        };

        update();

        const observer = new ResizeObserver(update);
        observer.observe(el);

        window.addEventListener("scroll", update);
        window.addEventListener("resize", update);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [])

    return (
        <motion.button className='border border-white p-2 m-1 rounded-lg cursor-pointer text-sm flex gap-1
        max-md:text-[10px]' 
			onClick={() => {
                if(test) handleTestAdd();
                else{
                    if(role === "add")
                        handleAdd();
                        // handleTestAdd();
                    else if(role === "clear")
                        handleClear();
                }
            }}
            ref={ref}
            whileTap={{y: 2}}
        >
            {
                role === "add" ?
                <div style={{
                        transform: `${isHovering ? 'rotate(90deg)' : 'rotate(0deg)'}`
                    }} className="transition-all duration-500 linear">
                    <Plus size={18} className="max-md:size-3.5"/>
                </div> :
                role === "clear" ?
                <div style={{
                        animation: `${isHovering ? 'shake 0.5s linear 2' : ''}`
                    }} className="transition-all duration-500 linear">
                    <Eraser size={18} className="max-md:size-3.5"/>
                </div> :
                ""
            }
            <Responsive
                smaller={
                    test ? "test" : role === "add" ? "New node" : role === "clear" ? "Clear all" : ""
                }
                larger={
                    test ? "test" : role === "add" ? "Add new node" : role === "clear" ? "Clear all nodes" : ""
                }
            />
        </motion.button>
    )
}