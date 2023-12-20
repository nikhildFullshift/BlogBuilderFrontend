import { optionalUrl } from "../constants/constant";
import Axios from "../middleware/axiosConfig";

const OptionalService = {
  getAllOptional: () => {
    return Axios.get(optionalUrl);
  },
};

export default OptionalService;
