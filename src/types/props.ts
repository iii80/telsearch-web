import { MouseEventHandler } from "react";

interface PagePros {
  onClick: (offset: number, limit: number) => void;
  total?: number;
  limit?: string;
  offset?: string;
}

interface SearchProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
}

interface HeadingProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
}

interface FooterProps {
  className?: string;
}

interface SwapProps {
  className?: string;
}

export type { PagePros, SearchProps, HeadingProps, FooterProps, SwapProps };
