import axios from "axios";

const API_URL = `https://api.mission4us.com/api/providers?updateLanguages=true&updateJobs=true&updateDriverLicences=true&updateExperiences=true&updat
eSkills=true`;

 
const api = async (obj,token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(API_URL,obj, config);
  return res;
};
const CreateCvService = {
  api,
};
export default CreateCvService;
