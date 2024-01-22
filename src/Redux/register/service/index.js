import axios from "axios";

// const API_URL = `https://api.mission4us.com/api/providers?updateLanguages=true&updateJobs=true&updateDriverLicences=true&updateExperiences=true&updat
// eSkills=true`;

// const API_URL='http://api.mission4us.com/api/register';

const API_URL='https://api.mission4us.com/api/register'
 
const api = async (obj,token) => {

 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL,obj);
  return res;
};
const registerService = {
  api,
};
export default registerService;
