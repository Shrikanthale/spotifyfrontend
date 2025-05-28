import { useState, useEffect } from 'react';
import API from '../services/api';
import { TextField, Button, Container, Box, Typography, Paper, Fade, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SongCard from '../components/SongCard';
import { Song, Playlist } from '../types';

export default function SearchSongs() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = async () => {
    const res = await API.get('/playlists');
    setPlaylists(res.data as Playlist[]);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const searchSpotify = async () => {
    const res = await API.get(`/spotify/search?q=${query}`);
    setResults((res.data as { tracks: { items: any[] } }).tracks.items.map((track: any) => ({
      trackId: track.id,
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      addedAt: new Date().toISOString()
    })));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <MusicNoteIcon sx={{ fontSize: 40 }} />
              Search Songs
            </Typography>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for your favorite songs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1DB954',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={searchSpotify}
                sx={{
                  background: '#1DB954',
                  color: '#fff',
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: '#1ed760',
                  },
                }}
              >
                Search
              </Button>
            </Paper>
          </Box>
        </Fade>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 3,
            mt: 4
          }}
        >
          {results.map((song, index) => (
            <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={song.trackId}>
              <Box>
                <SongCard
                  song={song}
                  playlists={playlists}
                  onAddToPlaylist={fetchPlaylists}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
