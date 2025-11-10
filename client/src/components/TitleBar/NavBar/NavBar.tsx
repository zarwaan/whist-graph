import { useNavConfig } from "@/hooks/useNavConfig"
import NavButton from "./NavButton"

export default function NavBar({}) {
    const navConfig = useNavConfig();
    return (
        <div className="border rounded-full w-55/100 max-xl:w-80 max-md:w-50 m-auto flex flex-row p-0.5 disp">
            {
                Object.entries(navConfig).map(([k,v]) => 
                    <NavButton key={k} button={v} />
                )
            }
        </div>
    )
}