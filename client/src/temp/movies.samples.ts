import killbill from '@/assets/images/posters/killbill.jpg'
import starwars from '@/assets/images/posters/starwars.webp'
import pandp from '@/assets/images/posters/pandp.webp'
import omshantiom from '@/assets/images/posters/omshantiom.webp'
import thelegomovie from '@/assets/images/posters/thelegomovie.webp'
import lailamajnu from '@/assets/images/posters/lailamajnu.webp'

import type { Media } from '@/types/media'


export const movieSamples: Array<Media> = [
    {
        id: 1,
        title: "Kill Bill Vol. 1",
        type: "movie",
        imagePath: killbill,
        year: '2003'
    },
    {
        id: 2,
        title: "Star Wars",
        type: "movie",
        imagePath: starwars,
        year: '1997'
    },
    {
        id: 3,
        title: "Pride and Prejudice",
        type: "movie",
        imagePath: pandp,
        year: '2005'
    },
    {
        id: 4,
        title: "Om Shanti Om",
        type: "movie",
        imagePath: omshantiom,
        year: '2008'
    },
    {
        id: 5,
        title: "The Lego Movie",
        type: "movie",
        imagePath: thelegomovie,
        year: '2014'
    },
    {
        id: 6,
        title: "Laila Majnu",
        type: "movie",
        imagePath: lailamajnu,
        year: '2018'
    }
]