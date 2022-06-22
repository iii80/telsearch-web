interface PagePros {
  onClick: (offset: number, limit: number) => void;
  total?: number;
  limit?: string;
  offset?: string;
}

interface SearchProps {
  className?: string;
}

export type { PagePros, SearchProps };
