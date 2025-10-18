import type { resource } from "./resource";

export interface Media extends resource {
    type: "movie" | "tv",
    year? : string
}