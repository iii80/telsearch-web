import React from "react";
import { getSearchTips } from "../api";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../components/search-icon";

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
    </div>
  );
}

export default Index;
