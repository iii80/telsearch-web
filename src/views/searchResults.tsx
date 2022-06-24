import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getSearchResults } from "../apis/search";
import Pagination from "../components/pagination";
import SearchComponent from "../components/search";

import { LinkResult, SearchResult, SearchResultItem } from "../types/response";
import Highlighter from "react-highlight-words";
import { getLink } from "../apis/other";

function SearchResults() {
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
  const onClickItem = async (item: SearchResultItem) => {
    let link = item.link;
    if (!link) {
      let ret: LinkResult = await getLink(item.id);
      link = ret.link;
    }
    window.open(link, "_blank");
  };
  return (
    <div>
      <SearchComponent className="lg:pb-8 py-5 lg:pt-0 lg:px-[25%] px-[4%]" />
      <div className="grid lg:grid-cols-4 gap-4">
        {results?.data?.map((item) => (
          <label
            htmlFor={"modal-" + item.id}
            className="hover:cursor-pointer flex place-content-center modal-button"
            key={item.id}
          >
            <input
              type="checkbox"
              id={"modal-" + item.id}
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box">
                <div className="flex flex-row space-x-2">
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-md">
                      <img src={item.full_photo} alt={item.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      <Highlighter
                        searchWords={[searchParams.get("keyword") ?? ""]}
                        textToHighlight={item.title}
                        highlightClassName={"bg-fuchsia-300 text-fuchsia-900"}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.count} members | {item.update_time.split("T")[0]}
                    </div>
                    <div className="text-sm text-gray-500">
                      <Highlighter
                        searchWords={[searchParams.get("keyword") ?? ""]}
                        textToHighlight={item.description}
                        highlightClassName={"bg-fuchsia-300 text-fuchsia-900"}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full mt-2 ">
                  <label
                    htmlFor={"modal-" + item.id}
                    className="btn ml-auto"
                    onClick={async () => await onClickItem(item)}
                  >
                    Open
                  </label>
                </div>
              </div>
            </div>
            <div className="rounded bg-base-100 shadow-xl flex flex-col justify-center p-3 lg:w-full w-11/12">
              <div className="flex flex-row space-x-2">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-md">
                    <img src={item.full_photo} alt={item.title} />
                  </div>
                </div>
                <div>
                  <div className="font-bold truncate lg:w-72 w-64">
                    <Highlighter
                      searchWords={[searchParams.get("keyword") ?? ""]}
                      textToHighlight={item.title}
                      highlightClassName={"bg-fuchsia-300 text-fuchsia-900"}
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.count} members | {item.update_time.split("T")[0]}
                  </div>
                  <div className="text-sm text-gray-500 truncate lg:w-72 w-64">
                    <Highlighter
                      searchWords={[searchParams.get("keyword") ?? ""]}
                      textToHighlight={item.description}
                      highlightClassName={"bg-fuchsia-300 text-fuchsia-900"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="flex w-full justify-center lg:py-12 py-5">
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

export default SearchResults;
