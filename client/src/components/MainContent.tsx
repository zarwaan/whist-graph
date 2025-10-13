export default function MainContent({children} : {children: React.ReactNode}) {
    return (
        <div className="mt-3 h-9/10 border- border-white flex">
            {children}
        </div>
    )
}