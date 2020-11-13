import React from 'react';

const Part: React.FC<{ part: { name: string; exerciseCount: number } }> = ({
  part,
}) => {
  return (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  );
};
export default Part;
