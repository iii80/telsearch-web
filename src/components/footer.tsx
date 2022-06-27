import { FooterProps } from "../types/props";

function Footer(props: FooterProps) {
  return (
    <footer
      className={"footer footer-center text-base-content " + props.className}
    >
      <div>
        <p>
          Copyright © 2022 - All right reserved by{" "}
          <a
            className="link"
            href="https://github.com/telsearch"
            target="_blank"
            rel="noreferrer"
          >
            TelSearch
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
