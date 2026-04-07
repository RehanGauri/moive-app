import React from "react";

const Loading = () => {
  return (
    <div className=" h-[calc(100vh-64px)] flex items-center justify-center flex-col">
        <span className="loading loading-spinner loading-xl"></span>
        <span className="montserrat text-lg mt-2">Loading</span>
      </div>
  );
};

export default Loading;
