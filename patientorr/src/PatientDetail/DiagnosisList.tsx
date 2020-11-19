import React from 'react';

import { useStateValue } from '../state';
import { Diagnosis } from '../types';
import { List } from 'semantic-ui-react';

const DiagnosisList: React.FC<{ diagnosisCodes: Array<Diagnosis['code']> }> = ({
  diagnosisCodes,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List>
      <List.Item>
        <List.Header>
          {diagnosisCodes.length > 1 ? 'Diagnoses' : 'Diagnosis'}
        </List.Header>
        <List.Item>
          {diagnosisCodes.map((code) => (
            <List.Content key={code}>
              <List.Description>
                {code} {diagnoses[code] && diagnoses[code].name}
              </List.Description>
            </List.Content>
          ))}
        </List.Item>
      </List.Item>
    </List>
  );
};

export default DiagnosisList;
