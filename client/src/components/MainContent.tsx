export default function MainContent({children} : {children: React.ReactNode}) {
    return (
        <div className="mt-3 h-90/100 border- border-white flex">
            {children}
        </div>
    )
}