interface Page {
  onClick: (offset: number, limit: number) => void;
  total?: number;
  limit?: string;
  offset?: string;
}

export type { Page };
