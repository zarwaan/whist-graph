import { useLineContext } from "@/providers/LineProvider";
import { useViewContext } from "@/providers/ViewProvider";
import { useEffect, useRef } from "react";

function Emphasis({text}: {text: string}) {
    return (
        <span className="bg-(--text-color) bg-blue-100 text-blue-800 rounded-2xl p-1.5 px-3 font-bold">
            {text}
        </span>
    )
}

export default function Greeting({}) {
    const { view } = useViewContext();
    const ref = useRef<HTMLDivElement>(null)
    const lineContext = useLineContext()

    useEffect(() => {
        if (!ref.current) return;

        const el = ref.current;

        const update = () => {
            const rect = el.getBoundingClientRect();
            lineContext.setLine(l => ({
                ...l,
                a: {
                    x: (rect.left + rect.width) * 1.02,
                    y: rect.top + rect.height / 2
                }
            }));
        };

        update();

        const observer = new ResizeObserver(update);
        observer.observe(el);

        window.addEventListener("scroll", update);
        window.addEventListener("resize", update);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [])

    return (
        <div className="border- mt-[15%] flex flex-col gap-6">
            <div className="text-4xl w-fit m-auto font-[800] bg-blue-800 p-3 px-5 rounded-2xl">
                Welcome!
            </div>
            <div className="text-2xl font-semibold m-auto leading-[2.2]" ref={ref}>
                Start searching for 
                &nbsp;
                {<Emphasis text={view==="media" ? "actors and directors" : "movies and TV shows"} />}
                <br />
                to discover common 
                &nbsp;
                {<Emphasis text={view==="media" ? "movies and TV shows" : "actors and directors"} />}
            </div>
        </div>
    )
}