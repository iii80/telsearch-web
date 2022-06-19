import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../components/search-icon";
import { getKeywords, getSearchTips } from "../apis/search";

function Index() {
  const [input, setInput] = React.useState("");
  const [tips, setTips] = React.useState([]);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    let data = await getSearchTips(e.target.value);
    setTips(data);
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTips([]);
    // @ts-ignore
    e.relatedTarget?.click();
  };
  const navigate = useNavigate();
  const [keywords, setKeywords] = React.useState([]);
  useEffect(() => {
    (async () => {
      setKeywords(await getKeywords());
    })();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center pt-[10%]">
      <a href="/">
        <h1 className="text-5xl font-bold mb-10">TelSearch</h1>
      </a>
      <div className="form-control w-1/3">
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
          <ul className="menu bg-base-100 mt-3 rounded-md">
            {tips.map((tip, index) => (
              <li key={tip}>
                <Link to={"/search?keyword=" + tip}>{tip}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {keywords && tips.length === 0 && (
        <div className="flex flex-wrap w-1/3 gap-2">
          {keywords.map((keyword) => (
            <div className="badge badge-lg" key={keyword}>
              <Link to={"/search?keyword=" + keyword}>{keyword}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
