import axios from "../axios";
import { isMobile } from "react-device-detect";
import * as localforage from "localforage";
import constants from "../constants";

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
  if (keyword.trim() !== "") {
    let keywords: Set<string> =
      (await localforage.getItem(constants.KEYWORDS)) || new Set();
    keywords.add(keyword);
    await localforage.setItem(constants.KEYWORDS, keywords);
  }
  let params: Record<string, string> = {
    keyword,
  };
  if (limit) {
    params.limit = limit;
  } else if (isMobile) {
    params.limit = "10";
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
