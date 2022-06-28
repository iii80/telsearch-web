import { FooterProps } from "../types/props";
import { BiLinkExternal } from "react-icons/bi";

function Footer(props: FooterProps) {
  return (
    <footer
      className={"footer footer-center text-base-content " + props.className}
    >
      <div>
        <p>
          Copyright © 2022 - All right reserved by{" "}
          <a
            className="link font-bold"
            href="https://github.com/telsearch"
            target="_blank"
            rel="noreferrer"
          >
            TelSearch
            <BiLinkExternal className="inline-block ml-1" />
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
