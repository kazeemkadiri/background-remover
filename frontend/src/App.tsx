import React from "react";
import DragAndDrop from "./components/UploadBox";
import Navbar from "./components/Navbar";

function App() {
  return <main className="site-bg w-full h-screen">
    <section className="fixed top-0 left-0 w-full z-50">
      <Navbar />
    </section>

    {/* Section 1 */}
    <section className="pt-40 px-[2rem] w-full text-center flex flex-col gap-3 items-center">
      <h1 className="font-['Roboto'] text-5xl font-medium">Background Image Remover</h1>
      <p className="text-[1.2rem] font-light text-gray-700">Remove the background from your images for free</p>  
    </section>
    <section className="flex flex-row gap-3 justify-start items-center">
      <DragAndDrop />
    </section>

    {/* Section 2 */}
    <section className="py-10 px-[6rem] w-full text-center flex flex-col gap-3 items-center min-h-screen bg-black text-white">
      <h2 className="font-['Roboto'] text-3xl font-medium">How It Works</h2>
      <p className="text-[1.2rem] font-medium text-orange-700">Our AI-powered tool removes backgrounds in seconds</p>

      {/* Before and After Images Box */}
      <h3 className="text-xl font-semibold">Before</h3>
      <h3 className="text-xl font-semibold">After</h3>

      <div className="w-[60%] px-[40px] py-[40px] mt-10 relative bg-white opacity-10 h-[25rem] rounded-xl">
        <div className="relative z-10 w-full">
          <img src="/before.png" alt="Before" className="w-full h-full" />
        </div>
        {/* <div className="absolute top-[40px] left-[40px] w-full h-full z-20">    
          <img src="/after.png" alt="After" className="w-full h-full" />
        </div> */}
      </div>
    </section>

  </main>;
}

export default App;
