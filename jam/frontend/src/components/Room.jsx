import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

const Room = () => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { roomCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRoomDetails();
  }, []);

  const getRoomDetails = async () => {
    try {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
      if (!response.ok) {
        navigate("/");
      }
      const data = await response.json();
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const leaveButtonPressed = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      await fetch("/api/leave-room", requestOptions);
      navigate("/");
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  const renderSettings = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage
          update={true}
          votesToSkip={votesToSkip}
          guestCanPause={guestCanPause}
          roomCode={roomCode}
          updateCallback={getRoomDetails}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );

  const renderSettingsButton = () => (
    <Grid item xs={12} align="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowSettings(true)}
      >
        Settings
      </Button>
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      {showSettings ? (
        renderSettings()
      ) : (
        <>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {roomCode}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Votes: {votesToSkip}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Guest Can Pause: {guestCanPause.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Host: {isHost.toString()}
            </Typography>
          </Grid>
          {isHost ? renderSettingsButton() : <div>Not a host</div>}

          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Room;
