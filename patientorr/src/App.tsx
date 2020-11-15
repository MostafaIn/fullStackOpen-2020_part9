import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue, setPatientList, setDiagnosisList } from './state';
import { Diagnosis, Patient } from './types';

import PatientListPage from './PatientListPage';
import PatientDetail from './PatientDetail';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`,
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();

    const fetchDiagosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`,
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (err) {
        console.log(err);
      }
    };
    fetchDiagosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/" exact render={() => <PatientListPage />} />
            <Route
              path="/patients/:id"
              exact
              render={() => <PatientDetail />}
            />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
