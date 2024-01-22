import axios from "axios";

const api = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(
    `https://api.mission4us.com/api/providers/${id}`,
    config,
  );
  return res;
};
const DetailsClientService = {
  api,
};
export default DetailsClientService;
