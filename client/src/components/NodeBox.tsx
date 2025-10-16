import { useNodeContext } from "@/providers/NodeProvider";
import Node from "./Node";
import React from "react";

function NodeBox({}) {
    const nodectx = useNodeContext();
    return (
        <div className="m-auto w-8/10 border- border-white min-h-full relative">
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

export default React.memo(NodeBox);