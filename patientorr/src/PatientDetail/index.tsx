import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EntryDetails from './EntryDetails';
import { Card, Icon, SemanticICONS } from 'semantic-ui-react';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';

const PatientDetail: React.FC = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        setPatient(patientData);
        dispatch(updatePatient(patientData));
      } catch (err) {
        console.log(err.message);
      }
    };

    if (patients[id] && patients[id].ssn) {
      setPatient(patients[id]);
    } else {
      fetchPatient();
    }
  }, [id, dispatch]);

  const genderICON = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'other gender';
    }
  };

  // const getcodeName = (code: string): string => {
  //   return diagnoses[code]?.name;
  // };

  console.log(diagnoses);
  return (
    <React.Fragment>
      {patient && (
        <Card style={{ minWidth: '80%' }}>
          <Card.Content>
            <Card.Header>
              {patient.name} <Icon name={genderICON(patient.gender)} />
            </Card.Header>
            <Card.Meta>ssn: {patient.ssn}</Card.Meta>
            <Card.Description>
              occupation: {patient.occupation}
            </Card.Description>
          </Card.Content>
          {patient?.entries.length > 0 && (
            <Card.Content>
              <Card.Header>Entries</Card.Header>
              {patient.entries.map((entry) => (
                <Fragment key={entry.id}>
                  <EntryDetails entry={entry} />
                </Fragment>
              ))}
            </Card.Content>
          )}
        </Card>
      )}
    </React.Fragment>
  );
};

export default PatientDetail;
