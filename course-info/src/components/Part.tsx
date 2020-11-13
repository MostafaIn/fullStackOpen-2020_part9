import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <table>
          <tbody>
            <tr>
              <th>name:</th>
              <td>{part.name}</td>
            </tr>
            <tr>
              <th>exerciseCount: </th>
              <td>{part.exerciseCount}</td>
            </tr>
            <tr>
              <th>description</th>
              <td>{part.description}</td>
            </tr>
          </tbody>
        </table>
      );
    case 'Using props to pass data':
      return (
        <table>
          <tbody>
            <tr>
              <th>name:</th>
              <td>{part.name}</td>
            </tr>
            <tr>
              <th>exerciseCount: </th>
              <td>{part.exerciseCount}</td>
            </tr>
            <tr>
              <th>groupProjectCount</th>
              <td>{part.groupProjectCount}</td>
            </tr>
          </tbody>
        </table>
      );
    case 'Deeper type usage':
      return (
        <table>
          <tbody>
            <tr>
              <th>name:</th>
              <td>{part.name}</td>
            </tr>
            <tr>
              <th>exerciseCount: </th>
              <td>{part.exerciseCount}</td>
            </tr>
            <tr>
              <th>description</th>
              <td>{part.description}</td>
            </tr>
            <tr>
              <th>exerciseSubmissionLink</th>
              <td>{part.exerciseSubmissionLink}</td>
            </tr>
          </tbody>
        </table>
      );
    case 'Full stack open 2020':
      return (
        <table>
          <tbody>
            <tr>
              <th>name:</th>
              <td>{part.name}</td>
            </tr>
            <tr>
              <th>exerciseCount: </th>
              <td>{part.exerciseCount}</td>
            </tr>
            <tr>
              <th>description</th>
              <td>{part.description}</td>
            </tr>
          </tbody>
        </table>
      );

    default:
      return assertNever(part);
  }
  return (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  );
};
export default Part;
