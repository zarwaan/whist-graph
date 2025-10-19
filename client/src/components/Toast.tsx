import { CircleX, TriangleAlert } from "lucide-react"

export type ToastType = "warning" | "error"

export default function Toast({message, kind}: {message:string, kind: ToastType}) {
    const Icon = 
        kind === "warning" ? TriangleAlert :
        kind === "error" ? CircleX :
        null
    return (
        <div className={`border-2 rounded-xl w-fit absolute right-14 bottom-24 py-2 px-3 flex gap-2 
                        text-lg font-bold leading-none flex-center
                        ${
                            kind === "warning" ? "bg-yellow-800 border-yellow-600/60":
                            kind === "error" ? "bg-red-800" :
                            ""
                        }`}>
            {
                Icon && 
                <div>
                    <Icon size={19} strokeWidth={2.5}/>
                </div>
            }
            <div>
                {message}
            </div>
        </div>
    )
}