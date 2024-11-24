// AudioPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import {
  IconButton,
  Slider,
  Typography,
  Box,
  Stack,
  styled,
  Paper,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  SkipNext,
  SkipPrevious,
} from '@mui/icons-material';

// Custom styled components with 3D box effect
const PlayerContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    background: `linear-gradient(145deg, #e0e0e0, #ffffff)`,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: `
      15px 15px 30px rgba(0, 0, 0, 0.3), 
      -15px -15px 30px rgba(255, 255, 255, 0.8),
      inset 5px 5px 10px rgba(0, 0, 0, 0.15),
      inset -5px -5px 10px rgba(255, 255, 255, 0.9)
    `,
    border: `1px solid rgba(0, 0, 0, 0.1)`,
    transition: 'box-shadow 0.3s, transform 0.2s',
    '&:hover': {
      transform: 'scale(1.03)', // Increase scale for a more dynamic lift
      boxShadow: `
        20px 20px 40px rgba(0, 0, 0, 0.35), 
        -20px -20px 40px rgba(255, 255, 255, 0.85),
        inset 6px 6px 12px rgba(0, 0, 0, 0.2),
        inset -6px -6px 12px rgba(255, 255, 255, 0.95)
      `,
    },
  }));  

const Controls = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const TimeSlider = styled(Slider)({
  color: '#3f51b5',
  height: 6,
  '& .MuiSlider-thumb': {
    width: 14,
    height: 14,
    backgroundColor: '#3f51b5',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(63, 81, 181, 0.16)',
    },
  },
});

const VolumeSlider = styled(Slider)({
  width: 100,
  marginLeft: 8,
  color: '#3f51b5',
  '& .MuiSlider-thumb': {
    width: 14,
    height: 14,
    backgroundColor: '#3f51b5',
  },
});

const PlayPauseButton = styled(IconButton)({
  '&:hover': {
    backgroundColor: 'rgba(63, 81, 181, 0.1)',
  },
});

function formatTime(seconds) {
  if (isNaN(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    secs < 10 ? '0' + secs : secs
  }`;
}

function AudioPlayer({ src }) {
  const audioRef = useRef(new Audio(src));
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);

  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    setPosition(current);
  };

  const handleSliderChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setPosition(newValue);
  };

  const handleVolumeChange = (event, newValue) => {
    audioRef.current.volume = newValue / 100;
    setVolume(newValue);
    setMuted(newValue === 0);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
      setPosition(audio.currentTime);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    playing ? audio.play() : audio.pause();

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [playing]);

  useEffect(() => {
    audioRef.current.muted = muted;
  }, [muted]);

  return (
    <PlayerContainer elevation={3}>
      {/* Display Song Title */}
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#3f51b5', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
      >
        Now Playing
      </Typography>

      {/* Time Slider */}
      <Stack spacing={2} direction="row" alignItems="center">
        <Typography variant="caption">{formatTime(position)}</Typography>
        <TimeSlider
          min={0}
          max={duration}
          value={position}
          onChange={handleSliderChange}
          aria-label="time-indicator"
        />
        <Typography variant="caption">
          {formatTime(duration)}
        </Typography>
      </Stack>

      {/* Controls */}
      <Controls>
        <IconButton aria-label="previous">
          <SkipPrevious fontSize="large" />
        </IconButton>
        <PlayPauseButton
          onClick={togglePlay}
          aria-label={playing ? 'pause' : 'play'}
          sx={{
            mx: 2,
            transition: 'transform 0.2s',
            transform: playing ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {playing ? (
            <Pause fontSize="large" />
          ) : (
            <PlayArrow fontSize="large" />
          )}
        </PlayPauseButton>
        <IconButton aria-label="next">
          <SkipNext fontSize="large" />
        </IconButton>
      </Controls>

      {/* Volume Control */}
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <IconButton onClick={toggleMute} aria-label="mute">
          {muted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
        <VolumeSlider
          min={0}
          max={100}
          value={volume}
          onChange={handleVolumeChange}
          aria-label="volume-control"
        />
      </Stack>
    </PlayerContainer>
  );
}

export default AudioPlayer;
