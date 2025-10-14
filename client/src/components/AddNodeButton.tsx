import { useNodeContext, type MediaNode, type NodeList } from "@/providers/NodeProvider"
import killbill from '@/assets/images/posters/killbill.jpg'
import starwars from '@/assets/images/posters/starwars.webp'
import pandp from '@/assets/images/posters/pandp.webp'
import omshantiom from '@/assets/images/posters/omshantiom.webp'
import thelegomovie from '@/assets/images/posters/thelegomovie.webp'
import lailamajnu from '@/assets/images/posters/lailamajnu.webp'
import { useEffect, useState } from "react"

const samples: NodeList<MediaNode> = [
    {
        nodeId: 1,
        id: 123,
        title: "Kill Bill Vol. 1",
        type: "movie",
        imagePath: killbill
    },
    {
        nodeId: 2,
        id: 123,
        title: "Star Wars",
        type: "movie",
        imagePath: starwars
    },
    {
        nodeId: 3,
        id: 123,
        title: "Pride and Prejudice",
        type: "movie",
        imagePath: pandp
    },
    {
        nodeId: 4,
        id: 123,
        title: "Om Shanti Om",
        type: "movie",
        imagePath: omshantiom
    },
    {
        nodeId: 5,
        id: 123,
        title: "The Lego Movie",
        type: "movie",
        imagePath: thelegomovie
    },
    {
        nodeId: 6,
        id: 123,
        title: "Laila Majnu",
        type: "movie",
        imagePath: lailamajnu
    }
]

export default function AddNodeButton({}) {
    const nodectx = useNodeContext();
    const [num, setNum] = useState(0);
    const handleClick = nodectx?.nodeList.length === 6 ?
                        () => {}
                        :
                        () => {
                            setNum(n => n+1)
                            nodectx?.addNode({
                                ...samples[num % 6],
                                nodeId: num
                            });
                        }
    
    useEffect(() => {
        console.log(num)
    },[num])
    return (
        <button className='border border-white p-2 m-1 rounded-lg cursor-pointer absolute left-75/100 top-2' 
			onClick={handleClick}>
            Add Node
        </button>
    )
}