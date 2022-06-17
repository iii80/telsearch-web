import axios from "./axios"

async function getSearchTips(keyword: string) {
    const response = await axios.get("/search/tips", {
        params: {
            keyword
        }
    })
    return response.data
}

async function getSearchResults(keyword: string) {
    const response = await axios.get("/search", {
        params: {
            keyword
        }
    })
    return response.data
}

export {
    getSearchTips,
    getSearchResults
};
