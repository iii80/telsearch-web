import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getLink, getSearchResults } from "../api";
import SearchIcon from "../components/search-icon";
import Pagination from "../components/pagination";
import { LinkResult, SearchResult, SearchResultItem } from "../types/response";
import Highlighter from "react-highlight-words";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult>();
  const [input, setInput] = React.useState("");

  useEffect(() => {
    (async () => {
      const keyword = searchParams.get("keyword") ?? "";
      setInput(keyword);
      const results = await getSearchResults(
        keyword,
        searchParams.get("limit"),
        searchParams.get("offset")
      );
      setResults(results);
    })();
  }, [searchParams]);
  const refreshPage = async () => {
    setInput("");
    const results = await getSearchResults("", "", "");
    setResults(results);
  };
  const onClickItem = async (item: SearchResultItem) => {
    let link = item.link;
    if (!link) {
      let ret: LinkResult = await getLink(item.id);
      link = ret.link;
    }
    window.open(link, "_blank");
  };
  return (
    <div className="container mx-auto">
      <div
        className="flex w-full justify-center hover:cursor-pointer"
        onClick={async () => await refreshPage()}
      >
        <h1 className="text-5xl font-bold pt-10">TelSearch</h1>
      </div>
      <div className="flex justify-center w-full py-10">
        <div className="input-group w-[50%]">
          <input
            type="text"
            placeholder="SEARCH TELEGRAM CHANNELS HERE..."
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
        {results?.data?.map((item) => (
          <div
            className="hover:cursor-pointer"
            onClick={async () => await onClickItem(item)}
            key={item.id}
          >
            <div className="rounded bg-base-100 shadow-xl flex flex-col justify-center p-3">
              <div className="flex flex-row space-x-2">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-md">
                    <img src={item.full_photo} alt={item.title} />
                  </div>
                </div>
                <div>
                  <div className="font-bold truncate w-72">
                    <Highlighter
                      searchWords={[searchParams.get("keyword") ?? ""]}
                      textToHighlight={item.title}
                      highlightClassName={"bg-fuchsia-300 text-fuchsia-900"}
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.count} members | {item.update_time.split("T")[0]}
                  </div>
                  <div className="text-sm text-gray-500 truncate w-72">
                    <Highlighter
                      searchWords={[searchParams.get("keyword") ?? ""]}
                      textToHighlight={item.description}
                      highlightClassName={"bg-fuchsia-300 text-fuchsia-900"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center py-20">
        <Pagination
          total={results?.total}
          limit={searchParams.get("limit") ?? undefined}
          offset={searchParams.get("offset") ?? undefined}
          onClick={(offset, limit) =>
            setSearchParams({
              offset: offset.toString(),
              limit: limit.toString(),
              keyword: input,
            })
          }
        />
      </div>
    </div>
  );
}

export default Search;
