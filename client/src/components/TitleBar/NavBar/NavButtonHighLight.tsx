import { useViewContext } from "@/providers/ViewProvider"

export default function NavButtonHighLight({}) {
    const ViewContext = useViewContext();
    return (
        <div className="absolute h-full w-full top-0 transition-all duration-300 ease-out flex flex-center -z-1"
            style={{
                left: `${ViewContext.pos * 100}%`,
                backgroundClip: 'text'
            }}
        >
            <div className="bg-(--text-color) w-full h-full rounded-full"></div>
        </div>
    )
}