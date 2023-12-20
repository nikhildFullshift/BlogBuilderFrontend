import { Button, Form, Input, Space, Tag, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromFile,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import BlogService from "../services/blogService";

function ReviewCreateBlog({ setActiveKey, blogData }) {
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const [tags, setTags] = useState([]);
  const saveData = (values) => {
    setLoading(true);
    BlogService.createBlog(values)
      .then((res) => {
        notification.success({
          message:
            "Blog " +
            (values.saveAsDraft ? "saved to draft " : "send to review ") +
            "successfully!!",
        });
        setLoading(false);
        setActiveKey(3);
      })
      .catch((err) => {
        console.log(err);
        notification.error({ message: "Error while creating blog!!" });
        setLoading(false);
      });
  };
  const formSubmit = (values) => {
    values.tags = tags;
    values.saveAsDraft = false;
    values.status = 1;
    saveData(values);
  };
  const saveToDraft = () => {
    let values = form.getFieldsValue();
    values.tags = tags;
    values.saveAsDraft = true;
    values.status = 0;
    saveData(values);
  };
  useEffect(() => {
    if (blogData) {
      form.setFieldsValue(blogData);
    }
  }, []);
  return (
    blogData && (
      <>
        <Form
          form={form}
          onFinish={formSubmit}
          layout="vertical"
          requiredMark={false}
          scrollToFirstError
          disabled={loading}
        >
          <Form.Item
            label={
              <label className="form-label">
                Blog Title <span>(required)</span>
              </label>
            }
            name="title"
            rules={[
              {
                required: true,
                message: "Blog title can not be empty !!",
              },
            ]}
          >
            <Input placeholder="Enter Blog Title" />
          </Form.Item>
          <Form.Item
            label={
              <label className="form-label">
                Blog Description <span>(required)</span>
              </label>
            }
            name="description"
            rules={[
              {
                required: true,
                message: "Blog description can not be empty !!",
              },
            ]}
          >
            <MDEditor height={"500px"} className={"md-editor-custom"} />
          </Form.Item>
        </Form>
        <div className="tags-input-wrapper">
          Tags :
          {tags.map((tag) => {
            return (
              <Tag
                key={tag}
                closable={!loading}
                onClose={() => setTags(tags.filter((t) => t !== tag))}
              >
                {tag}
              </Tag>
            );
          })}
          <Input
            disabled={loading}
            ref={ref}
            placeholder="Enter tags"
            onChange={(e) => {
              setValue(e.target.value);
              if (tags.includes(e.target.value)) {
                ref.current.input.className += " ant-input-status-error";
              } else if (
                ref.current.input.className.includes(" ant-input-status-error")
              ) {
                ref.current.input.className =
                  ref.current.input.className.replace(
                    " ant-input-status-error",
                    ""
                  );
              }
            }}
            value={value}
            onPressEnter={() => {
              if (tags.includes(value) || value === "") {
                return;
              }
              setTags([...tags, value]);
              setValue("");
            }}
          />
        </div>
        <Form
          form={form}
          onFinish={formSubmit}
          layout="vertical"
          requiredMark={false}
          scrollToFirstError
          disabled={loading}
        >
          <Space style={{ marginTop: "30px" }}>
            <Form.Item>
              <Button
                icon={<FontAwesomeIcon icon={faSave} />}
                loading={loading}
                onClick={saveToDraft}
              >
                Save to Draft
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faArrowRightFromFile} />}
                htmlType="submit"
                loading={loading}
              >
                Send to review
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </>
    )
  );
}

export default ReviewCreateBlog;
