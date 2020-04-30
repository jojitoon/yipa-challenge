import React from "react";
import "./App.css";
import {
  Box,
  CircularProgress,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams, useHistory } from "react-router-dom";

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
    margin: "20px 0",
  },
  left: {
    textAlign: "right",
  },
}));

export const query = gql`
  query OneData($tnx_id: ID!) {
    oneData(tnx_id: $tnx_id) {
      tnx_id
      user
      description
      date
    }
  }
`;
function View() {
  const classes = useStyles();
  const { tnx_id } = useParams();
  const history = useHistory();
  const { loading, data: result } = useQuery(query, {
    variables: { tnx_id },
  });
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.push("/")}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Yipah Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" className={classes.top}>
        Transaction #{tnx_id}
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
          display: "flex",
          justifyContent: "center",
        }}
      >
        {result && result.oneData && (
          <Card key={result.tnx_id} className="oneCard">
            <CardContent>
              <Typography className={classes.pos} color="textSecondary">
                <b>Transaction id</b>: # {result.oneData.tnx_id}
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  textTransform: "capitalize",
                }}
              >
                <b> Description: </b>
                {result.oneData.description}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <b>User: </b>
                {result.oneData.user}
              </Typography>
              <Typography className={classes.left} color="textSecondary">
                {new Date(result.oneData.date).toDateString()}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default View;
