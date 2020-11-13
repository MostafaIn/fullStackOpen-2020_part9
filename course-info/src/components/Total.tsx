import React from 'react';

const Total: React.FC<{ exercises: number }> = ({ exercises }) => {
  return <h4>Total of exercises: {exercises} </h4>;
};

export default Total;
