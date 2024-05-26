import "./App.css";

import ProblemDescription from "./pages/Decription/ProblemDescription";
function App() {
  const markDownText = `# Welcome to StackEdit!
  ![img](https://assets.leetcode.com/uploads/2018/10/12/knight.png)
  Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.`;
  return (
    <>
      <ProblemDescription descriptionText={markDownText} />
    </>
  );
}

export default App;
