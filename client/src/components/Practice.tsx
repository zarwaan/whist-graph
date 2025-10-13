import { useEffect, useRef } from 'react'
import killbill from '../assets/killbill.jpg'
import starwars from '../assets/starwars.webp'
import pandp from '../assets/pandp.webp'
import { shapeConfig } from '@/configs/shape.config';

function Image({index, num} : {num: number, index:number}) {
        const posters = [killbill, starwars, pandp];
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const id = requestAnimationFrame(() => {
                if(ref.current){
                    ref.current.style.left= `calc(${shapeConfig[num][index].x}% - 3em)`
                    ref.current.style.top= `calc(${shapeConfig[num][index].y}% - 4.5em)`
                    ref.current.style.opacity = "1"
                }
            })
            return () => cancelAnimationFrame(id);
        },[num,index])

        return (
            <div className='w-[6em] absolute transition-all duration-500' ref={ref}
                style={{     
                    left : `calc(${shapeConfig[num-1]?.[index-1]?.x || 50}% - 3em)`,
                    top : `calc(${shapeConfig[num-1]?.[index-1]?.y || 51}% - 4.5em)`,
                    opacity: 0
                }}
            >
                <img src={posters[(index-1) % 3]} alt="Kill Bill" className='rounded-xl border- border-(--text-color) shadow-[0px_1px_15px_rgba(200,200,200,0.2)]'/>
            </div> 
        )
    }


export default function Practice({n} : {n: number}) {
    return (
        <div className="m-auto w-8/10 border-1 border-white min-h-full relative grid grid-rows-6 grid-cols-6 *:borde">
            {
                Array.from({length:n},(_,i)=> <Image key={i} index={i+1} num={n}/>)
            }
            {
                Array.from({length: 36},(_,i) => <div key={i}></div>)
            }
        </div>
    )
}