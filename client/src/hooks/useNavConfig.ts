import { useViewContext } from "@/providers/ViewProvider"
import type { NavButtonConfig } from "@/types/buttons"

export function useNavConfig() {
    const viewContext = useViewContext()

    const navConfig: NavButtonConfig = {
        people: {
            name: "Common people",
            pos: 0,
            onclick: viewContext.setPeopleView
        },
        media: {
            name: "Common media",
            pos: 1,
            onclick: viewContext.setMediaView
        }
    }

    return navConfig;
}


