import { useNodeContext } from "@/providers/NodeProvider";

export default function ClearNodesButton({}) {
    const nodectx = useNodeContext();
    const handleClick = nodectx?.clearNodes
    return (
        <button className='border border-white p-2 m-1 rounded-lg cursor-pointer absolute left-85/100 top-2' 
			onClick={handleClick}>
            Clear Nodes
        </button>
    )
}