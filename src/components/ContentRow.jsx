import React from "react";
import Card from "./Card";
import Button from "./Button";

const ContentRow = ({ data, title}) => {
  return (
    <div className="text-white px-4 my-6 w-full lg:w-9/12 mx-auto">
      <div className="flex justify-between items-center">
        <div className="relative mb-4">
          <h2 className="text-lg sm:text-2xl montserrat">{title}</h2>
          <div className="bg-red-500 h-0.75 rounded-full w-10/12 absolute top-7 sm:top-8 left-1"></div>
        </div>

      </div>

      <div className="flex gap-2 sm:gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {data.map((item) => (
          <Card item={item} key={item.id} inRow={true} />
        ))}
      </div>
    </div>
  );
};

export default ContentRow;