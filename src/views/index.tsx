import Search from "../components/search";
import { useEffect, useState } from "react";
import { getKeywords } from "../apis/search";
import { Link } from "react-router-dom";

function Index() {
  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    (async () => {
      setKeywords(await getKeywords());
    })();
  }, []);
  return (
    <div>
      <Search className="pt-[50%] lg:pt-[10%] lg:px-[25%] px-[4%]" />
      {keywords && (
        <div className="flex flex-wrap mx-auto gap-2 pt-2 lg:w-[50%] w-[92%]">
          {keywords.map((keyword) => (
            <div className="badge badge-lg truncate" key={keyword}>
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
