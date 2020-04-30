import React from "react";
import "./App.css";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  sub: {
    fontSize: 14,
  },
  top: {
    textAlign: "center",
    margin: "20px 0",
  },
  pos: {
    marginBottom: 12,
  },
  left: {
    textAlign: "right",
  },
}));

export const query = gql`
  {
    data {
      tnx_id
      user
      description
      date
    }
  }
`;
function Home() {
  const classes = useStyles();
  const history = useHistory();

  const { loading, data: result } = useQuery(query);
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Yipah Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" className={classes.top}>
        All Transaction
      </Typography>
      {loading && (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Box
        color="text.primary"
        style={{
          margin: "20px 0",
        }}
      >
        {result &&
          result.data.length &&
          result.data.map((datum) => (
            <Card
              key={datum.tnx_id}
              className="card"
              onClick={() => history.push(`view/${datum.tnx_id}`)}
            >
              <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                  # {datum.tnx_id}
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {datum.description}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {datum.user}
                </Typography>
                <Typography className={classes.left} color="textSecondary">
                  {new Date(datum.date).toDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Container>
  );
}

export default Home;
