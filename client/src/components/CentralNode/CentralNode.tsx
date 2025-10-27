import { peopleSamples } from "@/temp/people.samples";
import CommonNode from "./CommonNode";
import { useViewContext } from "@/providers/ViewProvider";

export default function CentralNode({}) {
    const viewCtx = useViewContext();
    return (
        <div className="absolute bg-(--background-color) shadow-[0px_0px_10px_3px_rgb(198,210,255)]
        shadow-indigo-400/50 w-fit max-w-45/100 rounded-2xl left-5/10 top-48/100 -translate-5/10 
        flex flex-center flex-col px-4 py-2 gap-2">
            <div className="text-xl font-bold">
                Common {viewCtx.view === "media" ? "media" : "people"}:
            </div>
            <div className="flex gap-5 overflow-x-auto custom-scroll pb-3 pt-1 w-full">
                {
                    peopleSamples.map((item) => 
                            <CommonNode node={{...item, nodeId: ''+item.id}} key={item.id}/>
                    )
                }
                <CommonNode node={{
                    ...peopleSamples[0],
                    nodeId: ''+peopleSamples[0].id
                }} />
            </div>
        </div>
    )
}