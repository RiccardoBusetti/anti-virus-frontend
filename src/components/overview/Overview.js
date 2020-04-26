import { useQuery } from '@apollo/react-hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Map } from '../common/Map';
import StatusCard from '../common/StatusCard';
import TopBar from '../common/TopBar';
import useStyles from '../Styles';

const boxes = [
  {
    title: 'New Patients',
    value: 2,
  },
  {
    title: 'Monitoring',
    value: 4,
  },
  {
    title: 'Solved',
    value: 1,
  },
  {
    title: 'Incoming',
    value: 2,
  },
];

const GET_PATIENTS = gql`
  query patientsOfDoctor($doctorId: Int!) {
    patientsOfDoctor(doctorId: $doctorId) {
      id
      homeLat
      homeLon
      name
      surname
    }
  }
`;

export default function Overview({ basePath, activeRole }) {
  const styles = useStyles();

  const history = useHistory();

  const id = useSelector((state) => state.activeRole.id);

  const { loading, error, data } = useQuery(GET_PATIENTS, {
    variables: {
      doctorId: id,
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <TopBar title={'Overview ' + activeRole.type} />
      <main className={styles.content}>
        <div className={styles.toolbar} />
        <div className={styles.rowContainer}>
          <Grid container className={styles.root} direction="row" spacing={3} justify="space-between">
            {boxes.map((box, index) => (
              <StatusCard key={index} title={box.title} value={box.value} xs={12 / boxes.length} />
            ))}
          </Grid>
        </div>
        <div style={{ marginBottom: 20 }} className={styles.mapContainer}>
          <Map
            defaultLat={data !== undefined && data.patientsOfDoctor.length > 0 ? data.patientsOfDoctor[0].homeLat : 0}
            defaultLon={data !== undefined && data.patientsOfDoctor.length > 0 ? data.patientsOfDoctor[0].homeLon : 0}
            markers={data.patientsOfDoctor.map((patient) => ({
              id: patient.id,
              lat: patient.homeLat,
              lon: patient.homeLon,
            }))}
            onMarkerClick={(id, lat, lon) => history.push(`${basePath}/patient/${id}`)}
          />
        </div>

        <Card className={(styles.root, styles.rowContainer)} variant="outlined">
          <CardContent>
            <Typography>Insert Graphs Here</Typography>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
