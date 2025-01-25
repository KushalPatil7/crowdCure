import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LeftSideBar from "./LeftSideBar";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="flex h-[calc(100vh-60px)]">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 h-full overflow-hidden bg-gradient-to-b from-blue-50 to-white"
        >
          {/* Left Sidebar */}
          <ResizablePanel
            defaultSize={13}
            minSize={isMobile ? 0 : 0}
            maxSize={13}
            className="bg-gray-50 overflow-auto"
          >
            <LeftSideBar />
          </ResizablePanel>

          <ResizableHandle className="w-[2px] rounded-lg cursor-col-resize  bg-gray-300" />

          {/* Main Content */}
          <ResizablePanel
            defaultSize={isMobile ? 80 : 60}
            className="overflow-auto"
          >
            <ScrollArea className="h-full w-full rounded-md border p-4">
              <Outlet />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default MainLayout;
