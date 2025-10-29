export default function Loader({}) {
    return (
        <div className="w-full border-purple-400 p-2 aspect-square"
        style={{
            animation: "loader-bounce 2s linear infinite"
        }}>
            <div className="spacer h-2/10" />
            <div className="border w-67/100 m-auto h-9/100 grid grid-rows-1 grid-cols-7 rounded-lg origin-[13%_90%]"
            style={{
                animation: "loader-clap 0.7s linear infinite"
            }}>
                {
                    Array.from({length: 7},(_,i) => <div className={`${i%2===0 ? "bg-(--text-color)": ""} 
                    ${(i===6) ? "rounded-r-lg" : ""}
                    ${i===0 ? "rounded-l-lg" : ""}
                    `}
                    key={i} />)
                }
            </div>
            <div className="border w-67/100 m-auto h-9/100 grid grid-rows-1 grid-cols-7 rounded-lg">
                {
                    Array.from({length: 7},(_,i) => <div className={`${i%2===0 ? "bg-(--text-color)": ""} 
                    ${(i===6) ? "rounded-r-lg" : ""}
                    ${i===0 ? "rounded-l-lg" : ""}
                    `} 
                    key={i}/>)
                }
            </div>
            <div className="w-5/10 border-2 h-4/10 m-auto flex flex-col rounded-b-md justify-evenly items-center">
                <div className="border h-1/10 bg-(--text-color) rounded-full w-6/10" />
                <div className="border h-1/10 bg-(--text-color) rounded-full w-6/10" />
            </div>
        </div>
    )
}