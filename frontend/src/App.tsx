import React from "react";
import DragAndDrop from "./components/UploadBox";

function App() {
  return <main>
    <section><h1>Upload Image</h1></section>
    <section className="flex flex-row gap-3 justify-start items-center">
      <DragAndDrop />
    </section>
  </main>;
}

export default App;
