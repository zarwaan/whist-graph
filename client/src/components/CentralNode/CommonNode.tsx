import type { Node } from "@/providers/NodeProvider";
import makeImageSource from "@/utils/makeImageSource";

export default function CommonNode({node}: {node: Node}) {
    return (
        <div className="flex flex-col w-[5em] flex-shrink-0 gap-2 hover:-translate-y-2 transition-all duration-300">
            <div>
                <img src={makeImageSource(node.imagePath || "", "w185")} alt={node.title} 
                    className="rounded-xl shadow-[0px_1px_15px_rgba(200,200,200,0.2)] border-2"/>
            </div>
            <div className="text-[11px]">
                {node.title}
            </div>
        </div>
    )
}