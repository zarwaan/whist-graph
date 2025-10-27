import { createContext, useContext, useEffect, useState } from "react"
import { useNodeContext } from "./NodeProvider";

export type ToastKind = "error" | "warning";
export interface Toast {
    message: string, 
    kind: ToastKind
}

interface UIState {
    isSearchBoxOpen: boolean,
    openSearchBox: () => void,
    closeSearchBox: () => void
    toast: Toast | null,
    setToast: (t: Toast | null) => void,
    showCommon: boolean
}

const UIContext = createContext<UIState>({
    isSearchBoxOpen: false,
    openSearchBox: () => {},
    closeSearchBox: () => {},
    toast: null,
    setToast: () => {},
    showCommon: false
})


export default function UIProvider({children} : {children: React.ReactNode}) {
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
    const openSearchBox = () => setIsSearchBoxOpen(true);
    const closeSearchBox = () => setIsSearchBoxOpen(false);

    const [toast, setToast] = useState<Toast | null>(null); 

    const [showCommon, setShowCommon] = useState(false)

    const {nodeList} = useNodeContext();
    useEffect(() => {
        if(nodeList.length > 1) setShowCommon(true)
        else setShowCommon(false)
    },[nodeList])

    return (
        <UIContext.Provider value={{
            isSearchBoxOpen, openSearchBox, closeSearchBox, toast, setToast, showCommon
        }}>
            {children}
        </UIContext.Provider> 
    )
}

export function useUIContext() {
    return useContext(UIContext)
}