import NodeProvider from "./NodeProvider";
import ViewProvider from "./ViewProvider";

export default function AppProviders({children} : {children: React.ReactNode}) {
    return (
        <NodeProvider>
            <ViewProvider>
                {children}
            </ViewProvider>
        </NodeProvider>
    )
}