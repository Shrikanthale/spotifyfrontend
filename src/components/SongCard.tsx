import { Card, CardContent, Typography, Button, Menu, MenuItem, Box, IconButton, Fade } from '@mui/material';
import { Song, Playlist } from '../types';
import { useState } from 'react';
import API from '../services/api';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';

interface SongCardProps {
  song: Song;
  playlists: Playlist[];
  onAddToPlaylist: () => void;
}

export default function SongCard({ song, playlists, onAddToPlaylist }: SongCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToPlaylist = async (playlistId: string) => {
    try {
      await API.post(`/spotify/playlists/${playlistId}/songs`, {
        trackId: song.trackId,
        name: song.name,
        artist: song.artist,
        album: song.album,
      });
      onAddToPlaylist();
      handleClose();
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      alert('Failed to add song to playlist');
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Card
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            background: 'rgba(255, 255, 255, 0.1)',
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MusicNoteIcon sx={{ fontSize: 40, color: '#1DB954', mr: 2 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  mb: 0.5,
                }}
              >
                {song.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <PersonIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {song.artist}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AlbumIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {song.album}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={handleClick}
            startIcon={<PlaylistAddIcon />}
            sx={{
              background: '#1DB954',
              color: '#fff',
              borderRadius: 2,
              textTransform: 'none',
              width: '100%',
              py: 1,
              '&:hover': {
                background: '#1ed760',
              },
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            Add to Playlist
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                background: 'rgba(30, 30, 30, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                mt: 1,
              },
            }}
          >
            {playlists.map((playlist) => (
              <MenuItem
                key={playlist._id}
                onClick={() => handleAddToPlaylist(playlist._id)}
                sx={{
                  color: '#fff',
                  '&:hover': {
                    background: 'rgba(29, 185, 84, 0.1)',
                  },
                }}
              >
                {playlist.name}
              </MenuItem>
            ))}
          </Menu>
        </CardContent>
      </Card>
    </Fade>
  );
}
