type sizes = 
    "w92" |
    "w154" |
    "w185" |
    "w342" |
    "w500" |
    "w780" |
    "original"

export default function makeImageSource(imagePath: string, size: sizes ) {
    return `${import.meta.env.VITE_TMDB_IMAGE_URL_ROOT}/${size}${imagePath}`
}