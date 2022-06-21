import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../components/searchIcon";
import { getSearchTips } from "../apis/search";
import Heading from "../components/heading";
import constants from "../constants";
import localforage from "localforage";

function Index() {
  const [input, setInput] = useState("");
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    (async () => {
      let data: Set<string> =
        (await localforage.getItem(constants.KEYWORDS)) ?? new Set();
      // @ts-ignore
      setKeywords([...data]);
    })();
  }, []);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    let data = await getSearchTips(e.target.value);
    setTips(data);
  };
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTips([]);
    // @ts-ignore
    e.relatedTarget?.click();
  };

  const removeKeyword = async (keyword: string) => {
    let keywords: Set<string> =
      (await localforage.getItem(constants.KEYWORDS)) ?? new Set();
    keywords.delete(keyword);
    // @ts-ignore
    setKeywords([...keywords]);
    await localforage.setItem(constants.KEYWORDS, keywords);
  };
  return (
    <div className="flex flex-col h-screen items-center pt-[50%] lg:pt-[10%]">
      <div>
        <a href="/">
          <Heading />
        </a>
      </div>
      <div className="form-control w-11/12 lg:w-1/3">
        <div className="input-group w-full">
          <input
            type="text"
            placeholder="SEARCH TELEGRAM CHANNELS HERE..."
            value={input}
            onChange={async (e) => await onChange(e)}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/search?keyword=" + input);
              }
            }}
            className="input input-bordered w-full"
          />
          <button className="btn btn-square">
            <Link to={"/search?keyword=" + input}>
              <SearchIcon />
            </Link>
          </button>
        </div>
        {tips && (
          <div>
            <ul
              tabIndex={0}
              className="menu shadow bg-base-100 mt-3 rounded-md"
            >
              {tips.map((tip) => (
                <li key={tip}>
                  <Link to={"/search?keyword=" + tip}>{tip}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {keywords && tips.length === 0 && (
        <div className="flex flex-wrap w-11/12 lg:w-1/3 gap-2">
          {keywords.map((keyword) => (
            <div className="badge badge-lg truncate" key={keyword}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
                onClick={async () => await removeKeyword(keyword)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              <Link to={"/search?keyword=" + keyword} className="truncate">
                {keyword}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
