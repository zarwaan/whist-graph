import { shapeConfig } from "@/configs/shape.config";
import type { Node } from "@/providers/NodeProvider";
import { Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Node({node, num, index, onRemove} : {node: Node, num: number, index: number, onRemove: () => void}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const RemoveButton = () => {
        return (
            <div className="w-6 aspect-square bg-red-900 aspect-square flex-center rounded-full absolute -top-3 -left-3">
                <button className='cursor-pointer' onClick={onRemove}>
                    <Minus size={14} strokeWidth={5.5}/>
                </button>
            </div>
        )
    }

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            if(ref.current){
                ref.current.style.left= `calc(${shapeConfig[num][index].x}% - 3em)`
                ref.current.style.top= `calc(${shapeConfig[num][index].y}% - 4.5em)`
                ref.current.style.opacity = "1"
            }
        })
        return () => cancelAnimationFrame(id);
    },[num])

    return (
        <div className='w-[6em] absolute transition-all duration-500' ref={ref}
            style={{     
                left : `calc(${shapeConfig[num-1]?.[index-1]?.x || 50}% - 3em)`,
                top : `calc(${shapeConfig[num-1]?.[index-1]?.y || 51}% - 4.5em)`,
                opacity: 0
            }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        >
            <img src={node.imagePath} alt={node.title} className='rounded-xl border- border-(--text-color) shadow-[0px_1px_15px_rgba(200,200,200,0.2)]'/>
            {
                isHovering && <RemoveButton />
            }
        </div> 
    )
}