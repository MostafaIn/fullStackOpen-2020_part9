import React from 'react';
import DiagnosisList from './DiagnosisList';

import { Card, Icon, List } from 'semantic-ui-react';

import { OccupationalHealthcareEntry } from '../types';
const OccupationalHealthCareEntry: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Card style={{ minWidth: '100%', margin: '1rem 0' }}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" size="large" />
        </Card.Header>
        <Card.Meta>By {entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
      <Card.Content>
        <List>
          <List.Item>Employer: {entry.employerName}</List.Item>
          {entry.sickLeave && (
            <List.Item>
              Sick Leave: {entry.sickLeave.startDate} -{' '}
              {entry.sickLeave.endDate}
            </List.Item>
          )}
        </List>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthCareEntry;
