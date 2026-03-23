import React, { useEffect } from "react";
import DragAndDrop from "./components/UploadBox";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    const canvas = document.getElementById('before-image')! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    // 1. Load the image
    img.src = '/before.jpg'; // Placeholder image
    img.style.maxWidth = '606px';
    img.style.maxHeight = '320px';

    img.onload = () => {
      // Set initial canvas size
      canvas.width = 606;
      canvas.height = 320;
      draw();
    };

    function draw() {
      // Clear the canvas to prevent ghosting/trails
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image at its natural size starting at top-left
      // By not providing width/height arguments, it won't stretch
      ctx.drawImage(img, 0, 0, 606, 320);
    }

    // 2. Handle Resizing
    // We use ResizeObserver to detect when the canvas element changes size
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Update the internal drawing resolution to match the CSS size
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;

        // canvas.style.position = 'relative';
        canvas.style.left = '0px !important';
        // canvas.style.top = '0px';

        // Redraw the image
        draw();
      }
    });

    resizeObserver.observe(canvas);

    // Resizer logic

    const resizable = document.getElementById('resizable')!;
    const resizer = document.getElementById('resizer')!;

    resizer.addEventListener('mousedown', initResize, false);

    function initResize(e: any) {
      // Prevent default behavior to avoid side effects
      e.preventDefault();

      // Listen for mouse movement and mouse release on the whole window
      window.addEventListener('mousemove', Resize, false);
      window.addEventListener('mouseup', stopResize, false);
    }

    function Resize(e: any) {
      // Calculate new width based on mouse position relative to the box's left edge
      const newWidth = e.clientX - resizable.getBoundingClientRect().left;

      canvas.width = newWidth;

      // Apply a minimum width so the box doesn't disappear
      if (newWidth > 50) {
        resizable.style.width = newWidth + 'px';
      }
    }

    function stopResize() {
      // Remove listeners so the box stops following the mouse
      window.removeEventListener('mousemove', Resize, false);
      window.removeEventListener('mouseup', stopResize, false);
    }
  }, [])

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
    <section className="px-[6rem] w-full text-center flex flex-col gap-3 items-center min-h-screen bg-black text-white pb-10">
      <h2 className="mt-10 font-['Roboto'] text-3xl font-medium">How It Works</h2>
      <p className="text-[1.2rem] font-medium text-orange-500">Our AI-powered tool removes backgrounds in seconds</p>

      {/* Before and After Images Box */}
      <h3 className="text-xl font-semibold">Before</h3>
      <h3 className="text-xl font-semibold">After</h3>

      <div className="w-[60%] px-[40px] py-[40px] mt-10 relative bg-white/10 h-[25rem] rounded-xl flex flex-col items-start justify-center">
        <div className="relative z-10 h-full">
          <img src="/after.png" alt="Before" className="w-full h-full" />
        </div>
        <div className="absolute top-[0px] mt-[40px] h-full z-20 flex flex-row justify-start text-start">
          {/* <img src="/before.jpg" alt="Before" className="w-full h-full" /> */}
          <canvas style={{ position: "relative" }} id="before-image"></canvas>
        </div>

        {/* Horizontal scroller */}
        <div id="resizable" className="box">

          <div id="resizer" className="handle absolute top-[0px] right-0 mt-[40px] h-full z-30 border-2 border-gray-600"></div>
        </div>
      </div>
    </section>

  </main>;
}

export default App;
