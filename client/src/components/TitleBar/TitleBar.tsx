import NodeControlButton from "../NodeControlButton";
import AppName from "./AppName";
import NavBar from "./NavBar/NavBar";

export default function TitleBar({}) {
    return (
        <div className="flex flex-row mt-3 flex-center max-xl:flex-wrap max-xl:gap-y-3">
            <div className="w-30/100 max-xl:w-5/10">
                <AppName />
            </div>
            <div className="w-40/100 flex-center max-xl:basis-full max-xl:order-3">
                    <NavBar />
            </div>
            <div className="w-30/100 flex justify-end max-xl:w-5/10 max-xl:order-2">
                <div className="flex gap-2 w-fit">
                    <NodeControlButton role="add" point/>
                    <NodeControlButton role="clear"/>
                    {/* <NodeControlButton role="add" test/> */}
                </div>
            </div>
        </div>
    )
}