import React, { useEffect, useState } from "react";
import DragAndDrop from "./components/UploadBox";
import Navbar from "./components/Navbar";

function App() {
  const [resizerPosition, setResizerPosition] = useState<number | string>(303);

  const isMobileView = () => window.innerWidth < 433;

  useEffect(() => {
    if (isMobileView()) {
      setResizerPosition(130);
    }

    const canvas = document.getElementById('before-image')! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    // 1. Load the image
    img.src = '/before.jpg'; // Placeholder image
    img.style.maxWidth = '606px';
    img.style.maxHeight = '320px';

    img.onload = () => {
      if (!isMobileView()) {
        // Set initial canvas size
        canvas.width = 606;
        canvas.height = 320;
        // Clear the canvas to prevent ghosting/trails
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        draw();

        canvas.width = 303;
      }
    };

    function draw() {
      if (!isMobileView()) {
        // Draw the image at its natural size starting at top-left
        // By not providing width/height arguments, it won't stretch
        ctx.drawImage(img, 0, 0, 606, 320);

        requestAnimationFrame(draw);
      } else {
        canvas.width = 316;
        // Draw the image at its natural size starting at top-left
        // By not providing width/height arguments, it won't stretch
        ctx.drawImage(img, 0, 0, 316, 192);

        requestAnimationFrame(draw);
      }
    }

    // 2. Handle Resizing
    // We use ResizeObserver to detect when the canvas element changes size
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        canvas.style.left = '0px !important';

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
      window.addEventListener('touchmove', Resize, false);

      window.addEventListener('mouseup', stopResize, false);
      window.addEventListener('touchend', stopResize, false);
    }

    function Resize(e: any) {
      // Calculate new width based on mouse position relative to the box's left edge
      const newWidth = e.clientX - resizable.getBoundingClientRect().left;

      // Apply a minimum width so the box doesn't disappear
      if (newWidth > 5 && newWidth < 606) {
        resizable.style.width = newWidth + 'px';
        setResizerPosition(newWidth);
        canvas.width = newWidth;
      }

    }

    function stopResize() {
      // Remove listeners so the box stops following the mouse
      window.removeEventListener('mousemove', Resize, false);
      window.removeEventListener('touchmove', Resize, false);

      window.removeEventListener('mouseup', stopResize, false);
      window.removeEventListener('touchend', stopResize, false);
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
    <section className="px-[6rem] max-md:px-[1.5rem] w-full text-center flex flex-col gap-3 items-center min-h-screen bg-black text-white pb-10">
      <h2 className="mt-10 font-['Roboto'] text-3xl font-medium">How It Works</h2>
      <p className="text-[1.2rem] font-medium text-orange-500">Our AI-powered tool removes backgrounds in seconds</p>

      {/* Before and After Images Box */}

      <div className="w-[60%] max-md:w-[92%] px-[40px] max-md:px-[4%] py-[40px] max-md:py-[20px] max-md:h-[15rem] mt-10 relative bg-white/10 h-[25rem] rounded-xl flex flex-col items-start justify-center">
        <div className="absolute z-5 h-[20rem] max-md:h-[12rem] top-0 mt-[40px] max-md:mt-[1.5rem] bg-[url('/tiled-bg.jpg')] bg-cover w-[87%] opacity-20 rounded-md"></div>

        <div className="absolute z-10 h-[20rem] max-md:w-[90%] max-md:h-[12rem] max-md:mt-[1.5rem] rounded-md overflow-hidden">
          <img src="/after.png" alt="After" className="w-full h-full rounded-md" />
        </div>

        <div className="absolute top-[0px] mt-[40px] h-[20rem] max-md:h-[12rem] max-md:w-[90%] w-[87%] max-md:mt-[1.5rem] z-20 flex flex-row justify-start text-start">
          {/* <img src="/before.jpg" alt="Before" className="w-full h-full" /> */}
          <canvas style={{ position: "relative" }} id="before-image" className="rounded-md rounded-tr-none rounded-br-none"></canvas>
        </div>

        {/* Horizontal scroller */}
        <div id="resizable" className="box absolute z-30">
          <div id="resizer" className="handle h-full border-1 absolute z-30 flex flex-row items-center justify-center" style={{ left: resizerPosition + "px" }}>
            <div className="py-[5px] px-[10px] scale-[0.6] rounded-full border-orange-500 border-4 bg-black outline outline-white outline-[20px] flex flex-row justify-center items-center">
              <span className="text-2xl">&lt;</span>
              <span className="text-2xl">&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>;
}

export default App;
