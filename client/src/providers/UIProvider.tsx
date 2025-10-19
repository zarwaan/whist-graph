import { createContext, useContext, useState } from "react"

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
    setToast: (t: Toast | null) => void
}

const UIContext = createContext<UIState>({
    isSearchBoxOpen: false,
    openSearchBox: () => {},
    closeSearchBox: () => {},
    toast: null,
    setToast: () => {}
})


export default function UIProvider({children} : {children: React.ReactNode}) {
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
    const openSearchBox = () => setIsSearchBoxOpen(true);
    const closeSearchBox = () => setIsSearchBoxOpen(false);

    const [toast, setToast] = useState<Toast | null>(null); 

    return (
        <UIContext.Provider value={{
            isSearchBoxOpen, openSearchBox, closeSearchBox, toast, setToast
        }}>
            {children}
        </UIContext.Provider> 
    )
}

export function useUIContext() {
    return useContext(UIContext)
}