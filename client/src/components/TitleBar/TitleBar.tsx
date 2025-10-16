import NodeControlButton from "../NodeControlButton";
import AppName from "./AppName";
import NavBar from "./NavBar/NavBar";

export default function TitleBar({}) {
    return (
        <div className="flex flex-row mt-3">
            <div className="w-30/100">
                <AppName />
            </div>
            <div className="flex-1 flex-center">
                <NavBar />
            </div>
            <div className="w-30/100">
                <div className="flex gap-2 w-fit m-auto">
                    <NodeControlButton role="add" />
                    <NodeControlButton role="clear"/>
                </div>
            </div>
        </div>
    )
}