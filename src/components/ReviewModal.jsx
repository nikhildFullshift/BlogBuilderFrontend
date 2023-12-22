import { Button, Card, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import BlogService from "../services/blogService";
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function ReviewModal({
  target,
  setTarget,
  setRefresh,
  refresh,
  open,
  setOpen,
  currentTheme,
}) {
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [description, setDescription] = useState("");
  const closeModal = () => {
    setOpen(false);
    setLoading(true);
    setTarget(null);
    setData({});
  };
  const updateVersion = (statusId) => {
    setButtonLoading(true);
    let payload = Object.assign({}, data);
    payload.htmlFormat = description;
    payload.updated_at = new Date();
    payload.status = statusId;
    BlogService.updateVersion(data.id, payload)
      .then((res) => {
        notification.success({
          message:
            statusId === 2
              ? "Review added successfully"
              : "Blog Published successfully",
        });
        closeModal();
        setButtonLoading(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message:
            "Something went wrong while updating the data. Please try again later...",
        });
        setButtonLoading(false);
      });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("role"));
    if (user) {
      setUser(user);
    }
    if (target) {
      BlogService.getLatestVersion(target)
        .then((res) => {
          setData(res.data);
          setDescription(res.data.htmlFormat);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message:
              "Something went wrong while fetching the data. Please try again later...",
          });
          setOpen(false);
        });
    }
  }, [open]);
  return (
    <Modal
      title={user.role === "LEAD" ? "Review Blog" : "Suggestions"}
      destroyOnClose
      maskClosable={false}
      open={open}
      footer={
        loading
          ? false
          : [
              <Button
                key="back"
                type="link"
                disabled={buttonLoading}
                onClick={() => {
                  closeModal();
                }}
              >
                Return
              </Button>,
              user.role === "LEAD" ? (
                <>
                  <Button
                    key="submit"
                    loading={buttonLoading}
                    onClick={() => {
                      updateVersion(2);
                    }}
                  >
                    Submit Review
                  </Button>

                  <Button
                    key="publish"
                    type="primary"
                    loading={buttonLoading}
                    onClick={() => {
                      updateVersion(3);
                    }}
                  >
                    Publish
                  </Button>
                </>
              ) : null,
            ]
      }
      onCancel={closeModal}
      closeIcon={buttonLoading ? null : <FontAwesomeIcon icon={faClose} />}
      width={1200}
    >
      {loading ? (
        <Card loading />
      ) : (
        <>
          <h1>{data.title}</h1>
          <div className="review-card">
            <Editor
              apiKey="o0g1vx6mxtdx1uaftg65g7we4jfddhl33ecxotnfvvq9nstr"
              init={{
                plugins: "tinycomments",
                readonly: true,
                height: 400,
                menubar: false,
                statusbar: false,
                toolbar: false,
                content_style:
                  currentTheme === "dark"
                    ? "body { background-color:#222f3e ; color: #fff;  }"
                    : "body { background-color:#f5f5f5 ; color: #000;  }",
                tinycomments_mode: "embedded",
                tinycomments_default_mode: "embedded",
                tinycomments_author: user.name,
                skin: currentTheme === "dark" ? "oxide-dark" : "oxide",
                sidebar_show: "showcomments",
              }}
              value={description}
              disabled={buttonLoading}
              onEditorChange={(e) => {
                console.log(e);
                setDescription(e);
              }}
            />
          </div>
        </>
      )}
    </Modal>
  );
}

export default ReviewModal;
