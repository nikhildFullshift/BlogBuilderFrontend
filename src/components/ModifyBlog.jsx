import {
  faArrowRightFromFile,
  faClose,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Modal, Space, Tag, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import BlogService from "../services/blogService";

function ModifyBlog({
  editOpen,
  setEditOpen,
  target,
  setTarget,
  setRefresh,
  refresh,
  currentTheme,
  draft,
  setDraft,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const ref = useRef(null);
  const [data, setData] = useState({});
  const onClose = () => {
    setEditOpen(false);
    setLoading(true);
    setTarget(null);
    setData({});
    setDraft(false);
  };
  const updateVersion = (values) => {
    setButtonLoading(true);
    values.tags = tags;
    values.saveAsDraft = false;
    values.status = 1;
    BlogService.updateVersion(data.id, values)
      .then((res) => {
        notification.success({
          message: "Sent to review successfully",
        });
        onClose();
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
  const updateDraft = () => {
    let values = form.getFieldsValue();
    values.tags = tags;
    values.saveAsDraft = true;
    values.status = 0;
    values.blogId = target;
    updateBlog(values);
  };
  const draftToReview = () => {
    let values = form.getFieldsValue();
    values.tags = tags;
    values.saveAsDraft = false;
    values.status = 1;
    values.blogId = target;
    updateBlog(values);
  };
  const updateBlog = (values) => {
    setButtonLoading(true);
    BlogService.updateBlog(target, values)
      .then((res) => {
        notification.success({
          message:
            "Blog " +
            (values.saveAsDraft ? "saved to draft " : "send to review ") +
            "successfully!!",
        });
        onClose();
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
    if (target) {
      if (draft) {
        BlogService.getBlog(target)
          .then((res) => {
            form.setFieldsValue(res.data.result);
            setTags(res.data.result.tags);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            notification.error({
              message:
                "Something went wrong while fetching the data. Please try again later...",
            });
            onClose();
          });
      } else {
        BlogService.getLatestVersion(target)
          .then((res) => {
            form.setFieldsValue(res.data);
            setData(res.data);
            setTags(res.data.tags);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            notification.error({
              message:
                "Something went wrong while fetching the data. Please try again later...",
            });
            onClose();
          });
      }
    }
  }, [editOpen]);
  return (
    <Modal
      open={editOpen}
      onCancel={onClose}
      title="Modify Blog"
      destroyOnClose
      maskClosable={false}
      closeIcon={buttonLoading ? null : <FontAwesomeIcon icon={faClose} />}
      width={1200}
      footer={
        loading
          ? false
          : [
              <Form
                form={form}
                onFinish={draft ? draftToReview : updateVersion}
                layout="vertical"
                requiredMark={false}
                scrollToFirstError
                disabled={buttonLoading}
              >
                <Space style={{ marginTop: "30px" }}>
                  <Form.Item>
                    <Button
                      icon={<FontAwesomeIcon icon={faClose} />}
                      loading={buttonLoading}
                      onClick={onClose}
                      danger
                    >
                      Return
                    </Button>
                  </Form.Item>
                  {draft && (
                    <Form.Item>
                      <Button
                        icon={<FontAwesomeIcon icon={faSave} />}
                        loading={buttonLoading}
                        onClick={updateDraft}
                      >
                        Update Draft
                      </Button>
                    </Form.Item>
                  )}
                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon={faArrowRightFromFile} />}
                      htmlType="submit"
                      loading={buttonLoading}
                    >
                      Send to review
                    </Button>
                  </Form.Item>
                </Space>
              </Form>,
            ]
      }
    >
      <Form
        form={form}
        onFinish={draft ? draftToReview : updateVersion}
        layout="vertical"
        requiredMark={false}
        scrollToFirstError
        disabled={buttonLoading}
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
              closable={!buttonLoading}
              onClose={() => setTags(tags.filter((t) => t !== tag))}
            >
              {tag}
            </Tag>
          );
        })}
        <Input
          disabled={buttonLoading}
          ref={ref}
          placeholder="Enter tags"
          onChange={(e) => {
            setValue(e.target.value);
            if (tags.includes(e.target.value)) {
              ref.current.input.className += " ant-input-status-error";
            } else if (
              ref.current.input.className.includes(" ant-input-status-error")
            ) {
              ref.current.input.className = ref.current.input.className.replace(
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
    </Modal>
  );
}

export default ModifyBlog;
