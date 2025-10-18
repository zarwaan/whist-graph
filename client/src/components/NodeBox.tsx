import { useNodeContext } from "@/providers/NodeProvider";
import Node from "./Node";

export default function NodeBox({}) {
    const nodectx = useNodeContext();
    return (
        <div className="m-auto w-8/10 border- border-white min-h-full relative" style={{
            gridArea: "stack"
        }}>
            {
                nodectx?.nodeList.map((node,index) => {
                    return (
                        <Node 
                            node={node}
                            num={nodectx.nodeList.length}
                            index={index + 1}
                            key = {node.nodeId}
                            onRemove = {
                                () => nodectx.removeNode(node.nodeId)
                            }
                        />
                    )
                })
            }
        </div>
    )
}