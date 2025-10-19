import { motion } from "motion/react"
export default function Overlay({}) {
    return (
        <motion.div className="absolute inset-0 bg-black/85 z-3"
                    initial={{opacity:0}} 
                    animate={{opacity: 1}}
                    exit={{opacity: 0}} />
    )
}