import killbill from '../assets/killbill.jpg'

function Image({i} : {i: number}) {
    return (
        <div className='w-[6em]'>
            {
                [4,7,12,19,22,29,34,37].includes(i) ? 
                <div className=''>
                    <img src={killbill} alt="Kill Bill" className='rounded-xl'/>
                </div> :
                <div className='aspect-2/3 bg-(--text-colo)'>
                    {
                        i===25 ? "what i want" : ""
                    }
                </div>   
            }
        </div>
    )
}

export default function ImageCont({n} : {n: number}) {
    return (
        <div className="m-auto w-8/10 border-1 border-white flex flex-row min-h-full gap-1
                        flex-wrap justify-evenly">
            {
                Array.from({length: n}).map((_,i) => <Image key={i} i={i+1}/>)
            }
        </div>
    )
}