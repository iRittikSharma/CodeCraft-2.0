import Dompurify from "dompurify";
import { useState } from "react";
import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";

import "ace-builds/src-noconflict/theme-monokai";
function Description({ descriptionText }) {
  const [activeTab, setActiveTab] = useState("statement");

  const [leftWidth, setLeftWidth] = useState(50);
  const [dragging, setDragging] = useState(false);

  const isDragging = (e: MouseEvent) => {
    setDragging(true);
    e.preventDefault();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stopDragging = (e: MouseEvent) => {
    if (!dragging) return;
    setDragging(false);
  };
  const onDrag = (e: MouseEvent) => {
    if (!dragging) return;
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth < 10 || newLeftWidth > 90) return;
    setLeftWidth(newLeftWidth);
  };
  const sanatizedMarkdown = Dompurify.sanitize(descriptionText);
  return (
    <div
      className=" flex h-screen w-screen"
      onMouseMove={onDrag}
      onMouseUp={stopDragging}
    >
      <div
        className="leftPanel h-full overflow-auto"
        style={{ width: `${leftWidth}%` }}
      >
        <div className="tabs">
          <button onClick={() => setActiveTab("statement")}>
            Problem Statement
          </button>
          <button onClick={() => setActiveTab("editorial")}>Editorial</button>
          <button onClick={() => setActiveTab("submissions")}>
            Submissions
          </button>
        </div>
        <div className="markdownViewer p-[20px] basis-1/2">
          <ReactMarkdown>{sanatizedMarkdown}</ReactMarkdown>
        </div>
      </div>
      <div
        className="divider bg-white cursor-col-resize w-[10px] h-full"
        onMouseDown={isDragging}
      ></div>
      {/*divider between left and right panel */}
      <div
        className="rightPanel h-full overflow-auto"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="editor"
          className="editor"
          fontSize={30}
          style={{ width: "100%" }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}

export default Description;
