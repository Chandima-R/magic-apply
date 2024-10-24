import React from "react";

interface Props {
  frontTitle: string;
  frontDescription: string;
  backTitle: string;
  backDescription: string;
}

export const FlipCard = ({
  backDescription,
  backTitle,
  frontDescription,
  frontTitle,
}: Props) => {
  return (
    <div className="flip-card cursor-pointer shadow-lg">
      <div className="flip-card-inner flex flex-wrap">
        <div className="flip-card-front p-8 text-center bg-honoluluBlue text-white border-2 border-honoluluBlue">
          <h2 className="text-2xl font-semibold mb-4">{frontTitle}</h2>
          <p className="text-md">{frontDescription}</p>
        </div>

        <div className="flip-card-back text-center border-2 text-white border-white bg-federalBlue p-4">
          <h2 className="text-2xl font-semibold mb-4">{backTitle}</h2>
          <p>{backDescription}</p>
        </div>
      </div>
    </div>
  );
};
