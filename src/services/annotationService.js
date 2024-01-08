import { annotationUrl } from "../constants/constant";
import Axios from "../middleware/axiosConfig";

const AnnotationService = {
  getAnnotations: (versionId) => {
    return Axios.get(annotationUrl + versionId);
  },
  createAnnotation: (versionId, payload) => {
    return Axios.post(annotationUrl + "create/" + versionId, payload);
  },
  updateAnnotation: (annotationId, payload) => {
    return Axios.put(annotationUrl + "update/" + annotationId, payload);
  },
  deleteAnnotation: (annotationId) => {
    return Axios.delete(annotationUrl + "delete/" + annotationId);
  },
};

export default AnnotationService;
