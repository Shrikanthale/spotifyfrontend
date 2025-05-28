import { useState } from 'react';
import API from '../services/api';
import { TextField, Button, Box, Paper, Typography, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

export default function CreatePlaylist() {
  const [form, setForm] = useState({ name: '', description: '', songs: [] });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await API.post('/playlists', form);
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #1DB954 30%, #191414 90%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        py: 6,
      }}
    >
      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            minWidth: { xs: '90vw', sm: 400 },
            maxWidth: 480,
            width: '100%',
            boxShadow: '0 8px 32px 0 rgba(25,20,20,0.25), 0 1.5px 8px 0 rgba(29,185,84,0.10)',
            background: 'rgba(24, 24, 24, 0.95)',
            border: '2px solid rgba(29,185,84,0.18)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              pb: 2,
              borderBottom: '1.5px solid rgba(29,185,84,0.18)',
            }}
          >
            <QueueMusicIcon sx={{ fontSize: 36, color: '#1DB954' }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              Create Playlist
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              name="name"
              label="Playlist Name"
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{
                background: 'rgba(0,0,0,0.18)',
                borderRadius: 2,
                input: { color: '#fff' },
                label: { color: 'rgba(255,255,255,0.7)' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(29,185,84,0.25)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1DB954',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1DB954',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              name="description"
              label="Description"
              onChange={handleChange}
              variant="outlined"
              multiline
              minRows={2}
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{
                background: 'rgba(0,0,0,0.18)',
                borderRadius: 2,
                input: { color: '#fff' },
                label: { color: 'rgba(255,255,255,0.7)' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(29,185,84,0.25)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1DB954',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1DB954',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: 'linear-gradient(45deg, #1DB954 30%, #191414 90%)',
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 2,
                py: 1.2,
                color: '#fff',
                boxShadow: '0 4px 16px 0 rgba(29,185,84,0.15)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1ed760 30%, #282828 90%)',
                  color: '#fff',
                },
                transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
              }}
              size="large"
              fullWidth
            >
              Create
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}
