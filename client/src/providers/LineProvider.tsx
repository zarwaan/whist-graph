import { createContext, useContext, useState } from "react"

interface Point {
    x: number,
    y: number
}

export interface Line {
    a: Point | null,
    b: Point | null
}

interface LineContext {
    line: Line,
    setLine : React.Dispatch<React.SetStateAction<Line>>
}

const LineContext = createContext<LineContext>({
    line: {a: null, b:null},
    setLine: () => {}
})

export default function LineProvider({children}: {children: React.ReactNode}) {
    const [line, setLine] = useState<Line>({a: null, b:null})
    return (
        <LineContext.Provider value={{
            line, setLine
        }}>
            {children}
        </LineContext.Provider>
    )
}

export function useLineContext(){
    return useContext(LineContext)
}