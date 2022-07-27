import { FooterProps } from "../types/props";
import { BiLinkExternal } from "react-icons/bi";
import { useEffect, useState } from "react";
import { getOnline } from "../apis/online";
import { HiStatusOnline } from "react-icons/hi";

function Footer(props: FooterProps) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    (async () => {
      let res = await getOnline();
      setCount(res.count);
    })();
  });
  return (
    <footer
      className={"footer footer-center text-base-content " + props.className}
    >
      <div>
        <div>
          Copyright © 2022 - All right reserved by{" "}
          <a
            className="link font-bold"
            href="tg://resolve?domain=telsearch1"
            target="_blank"
            rel="noreferrer"
          >
            TelSearch
            <BiLinkExternal className="inline-block ml-1" />
          </a>
        </div>
        <div className="flex text-gray-500 text-xs italic items-center">
          <div className="mr-1">{count} Users Online</div>
          <HiStatusOnline />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
