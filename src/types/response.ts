interface SearchResultItem {
  id: number;
  title: string;
  count: number;
  description: string;
  language: string;
  link: string;
  photo: string;
  create_time: string;
  update_time: string;
  full_photo: string;
}

interface SearchResult {
  total: number;
  data: Array<SearchResultItem>;
}

interface LinkResult {
  link: string;
}

export type { SearchResult, LinkResult };
