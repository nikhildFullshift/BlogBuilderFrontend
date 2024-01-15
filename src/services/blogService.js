import Axios from "../middleware/axiosConfig";
import {
  annotationUrl,
  blogUrl,
  generateUrl,
  searchUrl,
  versionUrl,
} from "../constants/constant";

const BlogService = {
  searchBlogs: (searchText) => {
    return Axios.get(`${searchUrl}?title=${searchText}`);
  },
  getAllBlogs: () => {
    return Axios.get(blogUrl);
  },
  getBlog: (blogId) => {
    return Axios.get(blogUrl + blogId);
  },
  updateBlog: (blogId, payload) => {
    return Axios.put(blogUrl + "update/" + blogId, payload);
  },
  generateBlog: (postData) => {
    return Axios.post(generateUrl, postData);
  },
  createBlog: (postData) => {
    return Axios.post(blogUrl + "create", postData);
  },
  getLatestVersion: (blogId) => {
    return Axios.get(versionUrl + "latest/" + blogId);
  },
  getAllAnnotations: (versionId) => {
    return Axios.get(annotationUrl + versionId);
  },
  updateVersion: (versionId, postData) => {
    return Axios.put(versionUrl + "update/" + versionId, postData);
  },
  getPopularTags: () => {
    return Axios.put(blogUrl + "popular-tags");
  },
  getStats: () => {
    return Axios.put(blogUrl + "stats/");
  },
};

export default BlogService;
