import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Clipboard from "clipboard";
import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const CodeBlock = (props) => {
  const id = uuidv4();
  const [copied, setCopied] = useState(false);
  const { code, children, className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");
  const handleCopyClick = () => {
    new Clipboard(`.copy-button-${id}`, {
      text: () => children,
    }).on("success", () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return match ? (
    <div className="code-block-wrapper">
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        style={coldarkCold}
      />
      {copied ? (
        <Tooltip
          title={<div style={{ color: "#000" }}>copied!!</div>}
          placement="left"
          className="copy-button"
          open={copied}
        >
          <Button type="default">
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </Tooltip>
      ) : (
        <Button
          type="default"
          className={`copy-button copy-button-${id}`}
          onClick={handleCopyClick}
        >
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      )}
    </div>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};

export default CodeBlock;
