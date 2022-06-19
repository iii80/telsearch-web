import axios from "../axios";

async function getSearchTips(keyword: string) {
  if (keyword.trim() === "") {
    return [];
  }
  const response = await axios.get("/search/tips", {
    params: {
      keyword,
    },
  });
  return response.data;
}

async function getSearchResults(
  keyword: string,
  limit: string | null,
  offset: string | null
) {
  let params: Record<string, string> = {
    keyword,
  };
  if (limit) {
    params.limit = limit;
  }
  if (offset) {
    params.offset = offset;
  }
  const response = await axios.get("/search", {
    params: params,
  });
  return response.data;
}

async function getKeywords() {
  const response = await axios.get("/search/keywords");
  return response.data;
}

export { getSearchTips, getSearchResults, getKeywords };
