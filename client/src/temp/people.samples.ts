import type { Person } from "@/types/person";
import deepika from '@/assets/images/profiles/deepika.webp';
import emilia from '@/assets/images/profiles/emilia.webp';
import michael from '@/assets/images/profiles/michael.webp';
import ryan from '@/assets/images/profiles/ryan.webp';
import srk from '@/assets/images/profiles/srk.webp';
import steve from '@/assets/images/profiles/steve.webp';

export const peopleSamples : Array<Person> = [
    {
        id: 1,
        title: "Shah Rukh Khan",
        type: "person",
        imagePath: "~~~"+ srk
    },
    {
        id: 2,
        title: "Steve Carell",
        type: "person",
        imagePath: "~~~"+ steve
    },
    {
        id: 3,
        title: "Deepika Padukone long long long long long long long long long long long long long long",
        type: "person",
        imagePath: "~~~"+ deepika
    },
    {
        id: 4,
        title: "Emilia Clarke",
        type: "person",
        imagePath: "~~~"+ emilia
    },
    {
        id: 5,
        title: "Michael B. Jordan",
        type: "person",
        imagePath: "~~~"+ michael
    },
    {
        id: 6,
        title: "Ryan Gosling",
        type: "person",
        imagePath: "~~~"+ ryan
    },
    
]