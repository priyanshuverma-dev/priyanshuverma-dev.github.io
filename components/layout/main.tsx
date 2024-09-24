"use client";
import dynamic from "next/dynamic";
import NavBar from "../navbar";
import Footer from "../footer";
import VoxelDogLoader from "../voxel-dog-loader";
import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

const LazyVoxelDog = dynamic(() => import("../voxel-dog"), {
  ssr: false,
  loading: () => <VoxelDogLoader />,
});

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pb-8">
      <NavBar />
      <div className="container mx-auto pt-14">
        <LazyVoxelDog />
        <AnimatePresence
          mode="popLayout"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0 });
            }
          }}
        >
          {children}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
