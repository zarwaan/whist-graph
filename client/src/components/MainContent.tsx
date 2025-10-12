export default function MainContent({children} : {children: React.ReactNode}) {
    return (
        <div className="mt-3 h-8/10 border border-white">
            {children}
        </div>
    )
}