import { useNodeContext } from "@/providers/NodeProvider";
import Node from "./Node";
import CentralNode from "./CentralNode/CentralNode";
import { useUIContext } from "@/providers/UIProvider";
import { AnimatePresence } from "motion/react";
import Greeting from "./Greeting";
import AnimatedLine from "./AnimatedLine";
import { motion } from "motion/react";

export default function NodeBox({}) {
    const nodectx = useNodeContext();
    const {showCommon} = useUIContext();

    return (
        <div className="m-auto w-8/10 border- border-white h-full relative" style={{
            gridArea: "stack"
        }}>
            <AnimatePresence>
            {
                nodectx.nodeList.length === 0 &&
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} 
                transition={{duration: 0.5, ease:"linear"}}>
                    <Greeting />
                    <AnimatedLine />
                </motion.div>
            }
            </AnimatePresence>
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