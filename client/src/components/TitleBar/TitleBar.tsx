import NodeControlButton from "../NodeControlButton";
import AppName from "./AppName";
import NavBar from "./NavBar/NavBar";

export default function TitleBar({}) {
    return (
        <div className="flex flex-row mt-3">
            <div className="w-30/100">
                <AppName />
            </div>
            <div className="w-40/100 flex-center">
                    <NavBar />
            </div>
            <div className="w-30/100 flex justify-end">
                <div className="flex gap-2 w-fit">
                    <NodeControlButton role="add" />
                    <NodeControlButton role="clear"/>
                    <NodeControlButton role="add" test/>
                </div>
            </div>
        </div>
    )
}