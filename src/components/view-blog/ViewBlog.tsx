import { Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./ViewBlog.module.css";

function ViewBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchBlog = async () => {
      const config = {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      };
      const data = await fetch(`${API_URL}/blog/${id}`, config);
      const response = await data.json();
      if (data.status === 400) {
        return navigate(-1);
      }
      setTitle(response.result.title);
      setDescription(response.result.description);
    };
    fetchBlog();
  }, [id]);

  return (
    <div className={style.parent}>
      {title ? (
        <>
          <div>
            <Typography sx={{ marginBottom: "15px" }} variant="h4">
              View Blog
            </Typography>
          </div>
          <div className={style.content}>
            <Typography
              sx={{ marginBottom: "15px" }}
              variant="h5"
              fontWeight={"bold"}
            >
              {title}
            </Typography>
            <MDEditor.Markdown source={description} />
          </div>
        </>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}

export default ViewBlog;
