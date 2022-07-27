import axios from "../axios";

async function getOnline() {
  const response = await axios.get(`/online`);
  return response.data;
}
export { getOnline };
