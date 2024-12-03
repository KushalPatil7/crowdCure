import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <>
      <Navbar />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        {/* Left  */}
        <ResizablePanel
          defaultSize={10}
          minSize={isMobile ? 0 : 5}
          maxSize={10}
        >
          L
        </ResizablePanel>
        <ResizableHandle className="w-[2px] bg-gray-300 rounded-lg transition-colors" />

        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
      
            <Outlet />
         
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default MainLayout;
