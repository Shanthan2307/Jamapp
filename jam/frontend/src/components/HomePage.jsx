import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        if (data.code) {
          setRoomCode(data.code);
          navigate(`/room/${data.code}`);
        }
      });
  }, [navigate]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3">House Party</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained">
          <Button color="primary" component={Link} to="/join">
            Join a Room
          </Button>
          <Button color="secondary" component={Link} to="/create">
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default HomePage;
