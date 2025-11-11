import { useViewContext } from "@/providers/ViewProvider";

export default function SearchBar({searchTerm, setSearchTerm} : {searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>}) {
    const viewCtx = useViewContext();
    const mode = viewCtx.view;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="flex flex-col w-50/100 m-auto max-md:w-75/100">
            <input 
                className="border-1 border-(--text-color) bg-(--text-color) rounded-2xl w-full text-base px-3 py-1 text-black" 
                type="text" 
                onChange={onChange} 
                value={searchTerm}
                placeholder={
                    `Search for ${mode === "people" ? "movies and TV shows" : "people"}...`
                }
                autoFocus
            />
        </div>
    )
}