import { useViewContext } from "@/providers/ViewProvider";
import type { NavButton } from "@/types/buttons";
import NavButtonHighLight from "./NavButtonHighLight";

export default function NavButton({button}: {button: NavButton}) {
    const ViewContext = useViewContext();
    return (
        <div className="flex-1 box-border text-sm">
            <button className=" rounded-full w-full p-1.5 m-auto relative cursor-pointer z-2"
                    onClick={button.onclick}>
                {
                    button.pos === 0 && <NavButtonHighLight />
                }
                <span className="w-full whitespace-nowrap color-transparent font-semibold transition-all duration-300 ease-out"
                        style={{
                            color: `${ViewContext.pos === button.pos ? "black" : ""} `
                        }}>
                    { button.name }
                </span>
            </button>
        </div>
    )
}