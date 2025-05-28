import { useEffect, useState } from 'react';
import API from '../services/api';
import { Playlist } from '../types';
import { Button, Typography, Box, Paper, Modal, List, ListItem, ListItemText, ListItemIcon, Avatar, Fade } from '@mui/material';
import PlaylistCard from '../components/PlaylistCard';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function Dashboard() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    const res = await API.get('/playlists');
    setPlaylists(res.data as Playlist[]);
  };

  const handleDelete = async (id: string) => {
    await API.delete(`/playlists/${id}`);
    fetchPlaylists();
  };

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleCloseModal = () => {
    setSelectedPlaylist(null);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
      background: 'linear-gradient(45deg, #1DB954 30%, #191414 90%)',
      py: 4,
      px: { xs: 1, sm: 2, md: 4 },
      boxSizing: 'border-box',
    }}>
      <Fade in={true} timeout={1000}>
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            mb: 4, 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            width: '90%',
            maxWidth: '1800px',
            mx: 'auto',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 6,
            gap: 2,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MusicNoteIcon sx={{ 
                fontSize: { xs: 32, sm: 40 },
                color: '#1DB954',
              }} />
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 800,
                    color: '#fff',
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    letterSpacing: '-0.5px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Your Playlists
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    mt: 0.5,
                  }}
                >
                  {playlists.length} {playlists.length === 1 ? 'playlist' : 'playlists'} in your collection
                </Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              onClick={() => navigate('/create')}
              startIcon={<AddIcon />}
              sx={{
                background: 'linear-gradient(45deg, #1DB954 30%, #191414 90%)',
                boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1ed760 30%, #282828 90%)',
                  boxShadow: '0 6px 16px rgba(29, 185, 84, 0.4)',
                },
                whiteSpace: 'nowrap',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              Create Playlist
            </Button>
          </Box>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)',
            }, 
            gap: 4,
          }}>
            {playlists.map((p, index) => (
              <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={p._id}>
                <Box 
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <PlaylistCard 
                    playlist={p} 
                    onDelete={handleDelete} 
                    onClick={handlePlaylistClick}
                  />
                </Box>
              </Fade>
            ))}
          </Box>
        </Paper>
      </Fade>

      <Modal
        open={!!selectedPlaylist}
        onClose={handleCloseModal}
        aria-labelledby="playlist-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Fade in={!!selectedPlaylist}>
          <Paper
            sx={{
              width: '100%',
              maxWidth: 600,
              maxHeight: '90vh',
              overflow: 'auto',
              p: 4,
              borderRadius: 4,
              background: 'rgba(40, 40, 40, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {selectedPlaylist && (
              <>
                <Typography variant="h4" sx={{ mb: 3, color: '#fff', fontWeight: 700 }}>
                  {selectedPlaylist.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.7)' }}>
                  {selectedPlaylist.description}
                </Typography>
                <List>
                  {selectedPlaylist.songs.map((song, index) => (
                    <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={song.trackId}>
                      <ListItem
                        sx={{
                          mb: 2,
                          borderRadius: 2,
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            transform: 'translateX(8px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: '#1DB954' }}>
                            <AlbumIcon />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                              {song.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <PersonIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
                              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {song.artist}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    </Fade>
                  ))}
                </List>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
}
