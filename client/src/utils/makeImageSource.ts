import noImg from '@/assets/images/no_img.jpg'

type sizes = 
    "w92" |
    "w154" |
    "w185" |
    "w342" |
    "w500" |
    "w780" |
    "original"

export default function makeImageSource(imagePath: string, size: sizes ) {
    if(imagePath.startsWith("~~~")) return imagePath.substring(3)
    if(!imagePath || imagePath === "") return noImg
    return `${import.meta.env.VITE_TMDB_IMAGE_URL_ROOT}/${size}${imagePath}`
}