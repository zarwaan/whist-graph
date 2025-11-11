import { shapeConfig } from "@/configs/shape.config";
import type { Node } from "@/providers/NodeProvider";
import { Grid2X2Plus, Grid2X2X, Minus } from "lucide-react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import useHover from "@/hooks/useHover";
import makeImageSource from "@/utils/makeImageSource";

export default function Node({node, num, index, onRemove, toggleExclusion} : {node: Node, num: number, index: number, onRemove: () => void, toggleExclusion: () => void}) {
    const [isHovering, ref]= useHover<HTMLDivElement>();

    const ControlButton = ({action} : {action: "delete" | "exclude"}) => {
        return (
            <motion.div
                className={`w-6 aspect-square flex-center rounded-full absolute -top-1
                            ${action==="delete" ? "bg-red-900 -left-1" : action === "exclude" ? "bg-purple-900 -right-1" : ""}    
                        `}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                key={`${action}-${node.nodeId}`}
            >
                <button className="cursor-pointer"
                        onClick={async () => {
                            if(action === "delete"){
                                if(ref.current)
                                {
                                    ref.current.style.scale = "0%";
                                    setTimeout(onRemove,200)
                                }
                                else
                                    onRemove();
                            }
                            if(action === "exclude"){
                                // if(ref.current){
                                //     (ref.current.querySelector('img') as HTMLImageElement).style.filter = 
                                //     `grayscale(${node.excluded ? "0%" : "100%"})`;
                                    toggleExclusion();
                                // }
                            }
                        }}
                >
                    {action==="delete" && <Minus size={14} strokeWidth={5.5}/>}
                    {action==="exclude" && 
                        <>
                            {!node.excluded && <Grid2X2X size={14} strokeWidth={2.5} />}
                            {node.excluded && <Grid2X2Plus size={14} strokeWidth={2.5} />}
                        </>
                    }
                </button>
            </motion.div>
        )
    }
    

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            if(ref.current){
                ref.current.style.left= `calc(${shapeConfig[num][index].x}%)`
                ref.current.style.top= `calc(${shapeConfig[num][index].y}%)`
                ref.current.style.opacity = "1"
            }
        })
        return () => cancelAnimationFrame(id);
    },[num])

    return (
        <div className='node w-[6em] max-md:w-[5em] absolute transition-all duration-500 p-2 border-' ref={ref}
            style={{   
                left : `calc(${shapeConfig[num-1]?.[index-1]?.x || 50}%)`,
                top : `calc(${shapeConfig[num-1]?.[index-1]?.y || 51}%)`,
                transform: 'translate(-50%,-50%)',
                opacity: 0
            }}
        >
            <img src={makeImageSource(node.imagePath || "", "w185")} alt={node.title} 
                className='rounded-xl border-05 border-(--text-color) shadow-[0px_1px_15px_rgba(200,200,200,0.2)] 
                transition-all duration-500'
                style={{
                    filter : node.excluded ? 'grayscale(100%)' : 'grayscale(0%)'
                }}
            />
            <AnimatePresence mode="wait">
                {
                    isHovering &&
                    <>
                        <ControlButton action="delete" />
                        <ControlButton action="exclude" />
                    </>
                }
            </AnimatePresence>
            {
                isHovering &&
                <motion.div className="text-[13px] line-clamp-2" >{node.title}</motion.div>
            }
        </div> 
    )
}