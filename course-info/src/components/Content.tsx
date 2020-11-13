import React from 'react';
import Part from './Part';
import {CoursePart} from '../types'

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
