import type { Node } from "@/providers/NodeProvider";
import makeImageSource from "@/utils/makeImageSource";

export default function CommonNode({node}: {node: Node}) {
    return (
        <div className="flex flex-col max-md:flex-row w-[5em] max-md:h-[4.5em] max-md:w-full flex-shrink-0 gap-2 
                        hover:-translate-y-1 transition-all duration-300 max-md:gap-3">
            <div className="max-md:w-fit">
                <img src={makeImageSource(node.imagePath || "", "w185")} alt={node.title} 
                    className="rounded-xl shadow-[0px_1px_15px_rgba(200,200,200,0.2)] border-2 max-md:w-[3em]"/>
            </div>
            <div className="text-[11px] font-bold max-md:flex-1 
            max-md:flex max-md:items-center max-md:justify-center max-md:text-[13px]">
                <span className="line-clamp-2 max-md:line-clamp-3">{node.title}</span>
            </div>
        </div>
    )
}