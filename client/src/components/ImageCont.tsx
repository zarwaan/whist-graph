import killbill from '../assets/killbill.jpg'

function Image() {
    return (
        <div>
            <img src={killbill} alt="Kill Bill" className='w-[6em] rounded-xl'/>
        </div>
    )
}

export default function ImageCont({n} : {n: number}) {
    return (
        <div className="m-auto w-6/10 border-white flex flex-row flex-center max-h-9/10 min-h-0 gap-4 
                        flex-wrap space-between">
            {
                Array.from({length: n}).map((_,i) => <Image key={i} />)
            }
        </div>
    )
}