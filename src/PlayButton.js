// PlayButton.js
import React from 'react';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

function PlayButton({ playing, togglePlay }) {
  return (
    <IconButton
      onClick={togglePlay}
      aria-label={playing ? 'pause' : 'play'}
      sx={{
        mx: 2,
        '&:hover': {
          backgroundColor: 'rgba(63, 81, 181, 0.08)',
        },
      }}
    >
      {playing ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
    </IconButton>
  );
}

export default PlayButton;
