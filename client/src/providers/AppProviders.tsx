import LineProvider from "./LineProvider";
import NodeProvider from "./NodeProvider";
import UIProvider from "./UIProvider";
import ViewProvider from "./ViewProvider";

export default function AppProviders({children} : {children: React.ReactNode}) {
    return (
        <NodeProvider>
            <ViewProvider>
                <UIProvider>
                    <LineProvider>
                        {children}
                    </LineProvider>
                </UIProvider>
            </ViewProvider>
        </NodeProvider>
    )
}