interface PagePros {
  onClick: (offset: number, limit: number) => void;
  total?: number;
  limit?: string;
  offset?: string;
}

interface SearchProps {
  className?: string;
}

interface HeadingProps {
  className?: string;
}

interface FooterProps {
  className?: string;
}

interface SwapProps {
  className?: string;
}

export type { PagePros, SearchProps, HeadingProps, FooterProps, SwapProps };
