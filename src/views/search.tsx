import { Link, useSearchParams } from "react-router-dom";
import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { getSearchResults, getSearchTips } from "../apis/search";
import SearchIcon from "../components/searchIcon";
import Pagination from "../components/pagination";
import { LinkResult, SearchResult, SearchResultItem } from "../types/response";
import Highlighter from "react-highlight-words";
import { getLink } from "../apis/other";
import Heading from "../components/heading";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult>();
  const [input, setInput] = React.useState("");
  const [tips, setTips] = useState([]);

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
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTips([]);
    // @ts-ignore
    e.relatedTarget?.click();
  };
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    let data = await getSearchTips(e.target.value);
    setTips(data);
  };
  return (
    <div className="container mx-auto lg:h-screen min-h-screen">
      <div
        className="hover:cursor-pointer lg:pt-10 pt-5"
        onClick={async () => await refreshPage()}
      >
        <Heading />
      </div>
      <div className="lg:w-full pb-5 lg:px-[25%] px-[4%] relative">
        <div className="input-group w-full">
          <input
            type="text"
            placeholder="SEARCH TELEGRAM CHANNELS HERE..."
            value={input}
            onChange={async (e) => await onChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchParams({ keyword: input });
                setTips([]);
              }
            }}
            onBlur={onBlur}
            className="input input-bordered w-full"
          />
          <button
            className="btn btn-square"
            onClick={() => setSearchParams({ keyword: input })}
          >
            <SearchIcon />
          </button>
        </div>
        {tips && (
          <div className="absolute z-10 lg:w-[50%] w-[92%]">
            <ul className="menu shadow bg-base-100 mt-3 rounded-md">
              {tips.map((tip) => (
                <li key={tip}>
                  <Link to={"/search?keyword=" + tip}>{tip}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="grid lg:grid-cols-4 gap-4">
        {results?.data?.map((item) => (
          <div
            className="hover:cursor-pointer flex place-content-center"
            onClick={async () => await onClickItem(item)}
            key={item.id}
          >
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
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center lg:py-20 py-5">
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
