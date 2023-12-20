import { Button, Form, Input, Select, Spin, notification } from "antd";
import React, { useState } from "react";
import { languages } from "../constants/constant";
import { Editor } from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import BlogService from "../services/blogService";

function GenerateBlog({ nextTab, optional, currentTheme }) {
  const [form] = Form.useForm();
  const [language, setLanguage] = useState("javascript");
  const [buttonLoading, setButtonLoading] = useState(false);
  const formSubmit = (e) => {
    setButtonLoading(true);
    BlogService.generateBlog(e)
      .then((res) => {
        nextTab(res.data);
        setButtonLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setButtonLoading(false);
        notification.error({
          message:
            "Something went wrong at the server!! Please try again or contact Admin..",
        });
      });
  };
  return (
    <div className="generate-form">
      <Form
        form={form}
        onFinish={formSubmit}
        layout="vertical"
        requiredMark={false}
        scrollToFirstError
        disabled={buttonLoading}
      >
        <Form.Item
          name="title"
          label={
            <label className="form-label">
              Blog Title <span>(required)</span>
            </label>
          }
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
          name="instruction"
          label={<label className="form-label">Instruction</label>}
        >
          <Input.TextArea
            rows={4}
            placeholder="e.g Write about react hooks in details."
          />
        </Form.Item>
        <div className="optional-wraper">
          {optional.map((opt) => {
            return (
              <Form.Item
                name={["optional", opt.name]}
                label={<label className="form-label">{opt.label}</label>}
                key={opt.name}
              >
                <Select
                  placeholder={"Select " + opt.label}
                  allowClear
                  options={opt.values}
                />
              </Form.Item>
            );
          })}
          <Form.Item
            name={"language"}
            label={
              <label className="form-label">
                Language <span>(required)</span>
              </label>
            }
            key={"language"}
            rules={[
              {
                required: true,
                message: "Please select a language..",
              },
            ]}
          >
            <Select
              placeholder={"Select language"}
              allowClear
              options={languages}
              onChange={(e) => {
                setLanguage(e);
              }}
            />
          </Form.Item>
        </div>
        <div style={{ position: "relative" }}>
          <Form.Item
            name={"codeSnippet"}
            label={
              <label className="form-label">
                Your code <span>(required)</span>
              </label>
            }
            key={"codeSnippet"}
            rules={[
              {
                required: true,
                message: "Please write code snippet",
              },
            ]}
          >
            <Editor
              height="50vh"
              language={language}
              className="blog-code-editor"
              theme={currentTheme === "dark" ? "vs-dark" : "vs-light"}
              width="100%"
              options={{
                readOnly: buttonLoading,
              }}
            />
          </Form.Item>
          {buttonLoading && (
            <div className="editor-spinner">
              <Spin />
            </div>
          )}
        </div>
        <Form.Item>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faPlayCircle} />}
            htmlType="submit"
            loading={buttonLoading}
          >
            Generate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default GenerateBlog;
