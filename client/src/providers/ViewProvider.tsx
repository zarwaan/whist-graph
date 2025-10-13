import { createContext, useContext, useState } from "react";

export type ViewType = 'people' | 'media'

interface CurrentViewType {
    view: ViewType,
    pos: number,
    setPeopleView: () => void,
    setMediaView: () => void
}

const ViewContext = createContext<CurrentViewType>({
    view: 'people',
    pos: 0,
    setPeopleView: () => {},
    setMediaView: () => {}
})

export default function ViewProvider({children} : {children: React.ReactNode}) {
    const [view, setView] = useState<ViewType>('people');
    const [pos, setPos] = useState<number>(0);

    const setPeopleView = () => {
        setView('people'); 
        setPos(0)
        console.log('people')
    }
    const setMediaView = () => {
        setView('media');
        setPos(1)
        console.log('media')
    }

    return (
        <ViewContext.Provider value={{
            view, pos, setPeopleView, setMediaView
        }}>
            {children}
        </ViewContext.Provider>
    )
}

export function useViewContext(){
    return useContext(ViewContext)
}