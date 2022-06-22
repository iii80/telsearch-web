import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "../components/searchIcon";
import { getSearchTips } from "../apis/search";
import Heading from "../components/heading";
import constants from "../constants";
import localforage from "localforage";
import { FiClock, FiSearch } from "react-icons/fi";
import { SearchProps } from "../types/props";
import { AiOutlineDelete } from "react-icons/ai";

function Search(props: SearchProps) {
  const [input, setInput] = useState("");
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const [isBlur, setIsBlur] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  useEffect(() => {
    (async () => {
      let data: Set<string> =
        (await localforage.getItem(constants.KEYWORDS)) ?? new Set();
      // @ts-ignore
      setKeywords([...data]);
      // @ts-ignore
      setTips(await getSearchTips(keyword));
      setInput(keyword);
    })();
  }, [keyword]);
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    let data = await getSearchTips(e.target.value);
    setTips(data);
  };
  const removeKeyword = async (keyword: string) => {
    let keywords: Set<string> =
      (await localforage.getItem(constants.KEYWORDS)) ?? new Set();
    keywords.delete(keyword);
    // @ts-ignore
    setKeywords([...keywords]);
    await localforage.setItem(constants.KEYWORDS, keywords);
  };
  const search = async (keyword: string) => {
    let keywords: Set<string> =
      (await localforage.getItem(constants.KEYWORDS)) || new Set();
    keywords.add(keyword);
    if (keywords.size > 10) {
      keywords.delete(keywords.values().next().value);
    }
    await localforage.setItem(constants.KEYWORDS, keywords);
    navigate("/search?keyword=" + keyword);
  };
  return (
    <div className={"relative " + props.className ?? ""}>
      <div>
        <a href="/">
          <Heading />
        </a>
      </div>
      <div className="form-control w-full pb-2">
        <div className="flex">
          <input
            type="text"
            placeholder="SEARCH FOR TELEGRAM HERE..."
            value={input}
            onChange={async (e) => {
              setIsBlur(false);
              await onChange(e);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                setIsBlur(true);
                await search(input);
              }
            }}
            className="input input-bordered w-full focus:outline-none rounded-r-none placeholder:font-asap"
            onFocus={() => setIsBlur(false)}
            onBlur={() => setIsBlur(true)}
          />
          <button
            className="btn btn-square rounded-l-none"
            onClick={() => search(input)}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
      {!isBlur && (
        <div className="absolute z-10 lg:w-[50%] w-[92%]">
          <ul tabIndex={0} className="menu shadow bg-base-100 rounded">
            {(input ? tips : keywords).map((keyword) => (
              <li key={keyword}>
                <div
                  onMouseDown={async () => {
                    setInput(keyword);
                    await search(keyword);
                  }}
                  className="w-full"
                >
                  <div>{input ? <FiSearch /> : <FiClock />}</div>
                  <div className="truncate">{keyword}</div>
                  {!input && (
                    <div
                      className="ml-auto"
                      onMouseDown={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await removeKeyword(keyword);
                      }}
                    >
                      <AiOutlineDelete />{" "}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
