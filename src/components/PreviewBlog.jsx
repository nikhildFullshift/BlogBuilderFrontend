import {
  faClose,
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Divider, Modal, notification } from "antd";
import ReactMarkdown from "react-markdown";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BlogService from "../services/blogService";
import CodeBlock from "./CodeBlock";

function PreviewBlog({ blogId }) {
  const [open, setOpen] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      setLoading(true);
      setFullScreen(false);
    }, 200);
  };
  useEffect(() => {
    if (open) {
      BlogService.getBlog(blogId)
        .then((res) => {
          setLoading(false);
          setBlogData(res.data.result);
        })
        .catch((err) => {
          notification.error({
            message:
              "Something went wrong while fetching the data. Please try again !!",
          });
          onClose();
        });
    }
  }, [open]);
  return (
    <>
      <Button
        type="link"
        onClick={() => {
          setOpen(true);
        }}
      >
        Preview
      </Button>
      <Modal
        open={open}
        title={
          <div className="preview-title-wrapper">
            <div className="preview-title">Preview Blog</div>
            <div>
              <Button
                type="text"
                onClick={() => {
                  setFullScreen(!fullScreen);
                }}
              >
                {fullScreen ? (
                  <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
                ) : (
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                )}
              </Button>
              <Button type="text" danger onClick={onClose}>
                <FontAwesomeIcon icon={faClose} />
              </Button>
            </div>
          </div>
        }
        onCancel={onClose}
        destroyOnClose
        maskClosable={false}
        closeIcon={null}
        width={fullScreen ? "100vw" : 1200}
        style={fullScreen ? { top: "15px" } : null}
        footer={false}
      >
        {loading ? (
          <Card loading />
        ) : (
          <div
            style={fullScreen ? null : { maxHeight: "60vh" }}
            className="preview-blog-body"
          >
            <div className="view-blog-title">{blogData.title}</div>
            <Divider className="view-blog-divider" />
            <div className="view-blog-author-tag">
              {blogData.tags.length !== 0 && (
                <div className="blog-card-tags">
                  {blogData.tags.map((tag, index) => (
                    <div className="blog-tag" key={index}>
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="view-blog-description">
              <ReactMarkdown
                components={{
                  code: CodeBlock,
                }}
              >
                {blogData.description}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default PreviewBlog;
