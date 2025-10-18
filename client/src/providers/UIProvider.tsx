import { createContext, useContext, useState } from "react"

interface UIState {
    isSearchBoxOpen: boolean,
    openSearchBox: () => void,
    closeSearchBox: () => void
}

const UIContext = createContext<UIState>({
    isSearchBoxOpen: false,
    openSearchBox: () => {},
    closeSearchBox: () => {}
})

export default function UIProvider({children} : {children: React.ReactNode}) {
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
    const openSearchBox = () => setIsSearchBoxOpen(true);
    const closeSearchBox = () => setIsSearchBoxOpen(false);

    return (
        <UIContext.Provider value={{
            isSearchBoxOpen, openSearchBox, closeSearchBox
        }}>
            {children}
        </UIContext.Provider> 
    )
}

export function useUIContext() {
    return useContext(UIContext)
}