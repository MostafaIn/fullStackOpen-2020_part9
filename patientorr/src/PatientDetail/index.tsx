import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Icon, SemanticICONS } from 'semantic-ui-react';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';

const PatientDetail: React.FC = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

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
  console.log(patient);
  return (
    <React.Fragment>
      {patient && (
        <Card>
          <Card.Content>
            <Card.Header>
              {patient.name} <Icon name={genderICON(patient.gender)} />
            </Card.Header>
            <Card.Meta>ssn: {patient.ssn}</Card.Meta>
            <Card.Description>
              occupation: {patient.occupation}
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </React.Fragment>
  );
};

export default PatientDetail;
