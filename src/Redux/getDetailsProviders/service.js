import axios from "axios";

const api = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(
    `https://api.mission4us.com/api/providers/me`,
    config
  );
  return res;
};

const DetailsProvidersService = {
  api,
};
export default DetailsProvidersService;
