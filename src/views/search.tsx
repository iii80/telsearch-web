import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getSearchResults } from "../api";
import SearchIcon from "../components/search-icon";

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
  data: Array<SearchResultItem>;
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult>();
  const [input, setInput] = React.useState("");

  useEffect(() => {
    (async () => {
      const keyword = searchParams.get("keyword") ?? "";
      setInput(keyword);
      const results = await getSearchResults(keyword);
      setResults(results);
    })();
  }, [searchParams]);
  return (
    <div className="container mx-auto h-full">
      <div className="flex w-full justify-center">
        <h1 className="text-5xl font-bold pt-10">TelSearch</h1>
      </div>
      <div className="flex justify-center w-full py-10">
        <div className="input-group w-[50%]">
          <input
            type="text"
            placeholder="Search telegram channels here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchParams({ keyword: input });
              }
            }}
            className="input input-bordered w-full"
          />
          <button
            className="btn btn-square"
            onClick={() => setSearchParams({ keyword: input })}
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {results?.data?.map((item, index) => (
          <div className="bg-gray-400 h-28 rounded p-2">
            <div>{item.title}</div>
            <div className="truncate">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
