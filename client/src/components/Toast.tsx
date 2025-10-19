import { useUIContext, type ToastKind } from "@/providers/UIProvider"
import { CircleX, TriangleAlert } from "lucide-react"
import { motion } from "motion/react"
import { useEffect } from "react";

export default function Toast({message, kind}: {message:string, kind: ToastKind}) {
    const UIctx = useUIContext();

    const Icon = 
        kind === "warning" ? TriangleAlert :
        kind === "error" ? CircleX :
        null

    useEffect(() => {
        const timeout = setTimeout(() => {
            UIctx.setToast(null);
        },3000)

        return () => {
            clearTimeout(timeout)
        }
    },[])
    return (
        <motion.div className={`border-2 rounded-xl w-fit absolute right-14 py-2 px-3 flex gap-2 
                        text-lg font-bold leading-none flex-center
                        ${
                            kind === "warning" ? "bg-yellow-800 border-yellow-600/60":
                            kind === "error" ? "bg-red-800" :
                            ""
                        }`}
                    initial={{opacity:0, scale: '0%', bottom: "2%"}}
                    animate={{opacity:1, scale: '100%', bottom: "10%"}}
                    exit={{opacity: 0, scale: '0%', bottom: "2%"}}
                    transition={{type: 'spring', bounce: 0.35}}
                    >
            {
                Icon && 
                <div>
                    <Icon size={19} strokeWidth={2.5}/>
                </div>
            }
            <div>
                {message}
            </div>
        </motion.div>
    )
}