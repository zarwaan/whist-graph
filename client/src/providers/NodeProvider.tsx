import type { Media } from "@/types/media";
import type { Person } from "@/types/person";
import { createContext, useContext, useState } from "react";

export interface MediaNode extends Media {
    nodeId: number
}

export interface PersonNode extends Person {
    nodeId: number
}

export type Node = MediaNode | PersonNode
export type NodeList<T extends Node = Node> = Array<T>

interface CurrentNodeView {
    nodeList: NodeList,
    addNode: (node: Node) => void,
    removeNode: (id: number) => void,
    clearNodes: () => void,
}

const NodeContext = createContext<CurrentNodeView | null>(null);

export default function NodeProvider({children}: {children: React.ReactNode}) {
    const [nodeList, setNodeList] = useState<NodeList>([]);

    const addNode = (node: Node) => {
        setNodeList(nl => [...nl,node]);
    }

    const removeNode = (nodeId: number) => {
        const updated = nodeList.filter(node => node.nodeId !== nodeId);
        setNodeList(updated);
    }

    const clearNodes = () => {
        setNodeList([]);
    }

    return (
        <NodeContext.Provider value={{
            nodeList, addNode, removeNode, clearNodes
        }}>
            {children}
        </NodeContext.Provider>
    )
}

export function useNodeContext(){
    return useContext(NodeContext)
}