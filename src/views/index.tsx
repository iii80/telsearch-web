import React from "react";
import {getSearchTips} from "../api";
import {Link} from "react-router-dom";

function Index() {
    const [input, setInput] = React.useState("");
    const [tips, setTips] = React.useState([]);
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        let data = await getSearchTips(e.target.value);
        setTips(data);
    }
    const onBlur = (e:React.FocusEvent<HTMLInputElement>) => {
        setTips([]);
        // @ts-ignore
        e.relatedTarget?.click()
    }
    return (
        <div className="flex flex-col justify-center items-center pt-[10%]">
            <h1 className="text-5xl font-bold mb-10">TelSearch</h1>
            <div className="form-control w-1/3">
                <div className="input-group w-full">
                    <input type="text" placeholder="Search telegram channels here..."
                           value={input}
                           onChange={async (e) => await onChange(e)}
                           onBlur={onBlur}
                           className="input input-bordered w-full"/>
                    <button className="btn btn-square">
                        <Link to={'/search?keyword=' + input}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </Link>
                    </button>
                </div>
                {
                    tips &&
                    <ul className="menu bg-base-100 mt-3 rounded-md">
                        {tips.map((tip, index) => <li key={tip}><Link to={'/search?keyword=' + tip}>{tip}</Link></li>)}
                    </ul>
                }

            </div>

        </div>
    );
}

export default Index;