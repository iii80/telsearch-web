import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSearchResults} from "../api";

interface SearchResultItem {
    id: number;
    title: string;
    count: number;
    description: string;
    language: string;
    link: string;
    photo: string;
    create_time: Date;
    update_time: Date;
    full_photo: string;
}

interface SearchResult {
    total: number;
    data: Array<SearchResultItem>
}

function Search() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState<SearchResult>();
    useEffect(() => {
        (async () => {
            const keyword = searchParams.get("keyword") ?? "";
            const results = await getSearchResults(keyword);
            console.log(results)
            setResults(results);
        })();
    }, [searchParams])
    return (
        <div>
            {results && results.total}
        </div>
    )
}

export default Search;