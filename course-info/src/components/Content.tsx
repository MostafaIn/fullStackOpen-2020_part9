import React from 'react';
import Part from './Part';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{
  courseParts: CoursePart[];
}> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <div key={index}>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
