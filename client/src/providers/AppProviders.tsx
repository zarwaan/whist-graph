import NodeProvider from "./NodeProvider";
import UIProvider from "./UIProvider";
import ViewProvider from "./ViewProvider";

export default function AppProviders({children} : {children: React.ReactNode}) {
    return (
        <NodeProvider>
            <ViewProvider>
                <UIProvider>
                    {children}
                </UIProvider>
            </ViewProvider>
        </NodeProvider>
    )
}