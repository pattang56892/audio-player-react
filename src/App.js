// App.js
import React, { useState } from 'react';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PlayButton from './PlayButton';
import AudioPlayer from './AudioPlayer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        {/* <PlayButton playing={playing} togglePlay={togglePlay} /> */}
        <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" playing={playing} togglePlay={togglePlay} />
      </Container>
    </ThemeProvider>
  );  
}

export default App;
