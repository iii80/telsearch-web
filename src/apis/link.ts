import axios from "../axios";

async function getLink(id: number) {
  const response = await axios.get(`/link/${id}`);
  return response.data;
}
export { getLink };
