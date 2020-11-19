import React from 'react';
import DiagnosisList from './DiagnosisList';

import { Card, Icon, List } from 'semantic-ui-react';

import { HospitalEntry as Hospitalentry } from '../types';

const HospitalEntry: React.FC<{ entry: Hospitalentry }> = ({ entry }) => {
  return (
    <Card style={{ minWidth: '100%', margin: '1rem 0' }}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital symbol" size='large' />
        </Card.Header>
        <Card.Meta>by {entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
      <Card.Content>
        <List>
          <List.Item>
            <List.Header>Discharged on {entry.discharge.date}</List.Header>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;
