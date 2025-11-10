import { useNavConfig } from "@/hooks/useNavConfig"
import NavButton from "./NavButton"

export default function NavBar({}) {
    const navConfig = useNavConfig();
    return (
        <div className="border rounded-full w-55/100 max-xl:w-90 max-md:w-50 m-auto flex flex-row p-0.5">
            {
                Object.entries(navConfig).map(([k,v]) => 
                    <NavButton key={k} button={v} />
                )
            }
        </div>
    )
}