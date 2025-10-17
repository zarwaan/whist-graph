import { useEffect, useRef, useState } from "react";

export default function useHover<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        if(ref.current){
            const setHoveringTrue = () => setIsHovering(true);
            const setHoveringFalse = () => setIsHovering(false);
            
            ref.current.addEventListener('mouseenter',setHoveringTrue);
            ref.current.addEventListener('mouseleave',setHoveringFalse);
        
            return () => {
                ref.current?.removeEventListener('mouseenter',setHoveringTrue);
                ref.current?.removeEventListener('mouseleave',setHoveringFalse);
            }
        }
    },[ref])
    
    return [isHovering, ref] as const
}