import { useNodeContext } from "@/providers/NodeProvider";
import Node from "./Node";
import CentralNode from "./CentralNode/CentralNode";
import { useUIContext } from "@/providers/UIProvider";
import { AnimatePresence } from "motion/react";

export default function NodeBox({}) {
    const nodectx = useNodeContext();
    const {showCommon} = useUIContext();

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
                            toggleExclusion={
                                () => nodectx.toggleExclusion(node.nodeId)
                            }
                        />
                    )
                })
            }
            <AnimatePresence>
                {showCommon && <CentralNode />}
            </AnimatePresence>
        </div>
    )
}