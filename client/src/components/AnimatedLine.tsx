import { useLineContext } from "@/providers/LineProvider"
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AnimatedLine({}) {
    const { line } = useLineContext();

    const [d, setD] = useState<string>("")

    useEffect(() => {
        const {a,b} = line;
        if(a && b)
        {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const curve = Math.sqrt(dx*dx + dy*dy) * 0.35
            const cy = (a.y+b.y) / 2 + curve
            const cx = Math.max(b.x + curve, b.x + 100)
            const d = `M ${a.x},${a.y} Q ${cx},${cy} ${b.x},${b.y}`
            setD(d)
        }
    },[line])

    return (
        <svg className="pointer-events-none fixed top-0 left-0 w-screen h-screen"
        xmlns="http://www.w3.org/2000/svg">
            <motion.path 
                d={d}
                stroke={"currentcolor"}
                strokeWidth={3}
                fill={"none"}
                strokeDasharray="10 10"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </svg>
    )
}