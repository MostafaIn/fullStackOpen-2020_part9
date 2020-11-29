import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EntryDetails from './EntryDetails';
import { Card, Icon, SemanticICONS, Button } from 'semantic-ui-react';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient, addEntry } from '../state';

import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import {
  isHealthCheckEntry,
  isOccupationalHealthcareEntry,
  isHospitalEntry,
} from '../utils';

const PatientDetail: React.FC = () => {
  const [patient, setPatientData] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        setPatientData(patientData);
        dispatch(updatePatient(patientData));
      } catch (err) {
        console.log(err.message);
      }
    };

    if (patients[id] && patients[id].ssn) {
      setPatientData(patients[id]);
    } else {
      fetchPatient();
    }
  }, [id, dispatch, patients]);

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

  const getEntryType = (values: EntryFormValues) => {
    let type;
    if (isHealthCheckEntry(values)) {
      type = 'HealthCheck';
    } else if (isOccupationalHealthcareEntry(values)) {
      type = 'OccupationalHealthcare';
    } else if (isHospitalEntry(values)) {
      type = 'Hospital';
    }

    return type;
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    let entry;
    const type = getEntryType(values);

    if (isOccupationalHealthcareEntry(values)) {
      if (
        values.sickLeave &&
        values.sickLeave.startDate !== '' &&
        values.sickLeave.endDate !== ''
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, sickLeave: undefined };
      }
    } else if (isHospitalEntry(values)) {
      if (
        values.discharge &&
        values.discharge.date !== '' &&
        values.discharge.criteria !== ''
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, discharge: undefined };
      }
    }

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry,
      );

      console.log({ newEntry });
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (err) {
      console.log(err.message);
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </React.Fragment>
  );
};

export default PatientDetail;
