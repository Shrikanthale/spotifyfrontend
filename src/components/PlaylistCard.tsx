import { Card, CardContent, Typography, IconButton, Box, CardMedia, Fade } from '@mui/material';
import { Playlist } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

export default function PlaylistCard({
  playlist,
  onDelete,
  onClick,
}: {
  playlist: Playlist;
  onDelete: (id: string) => void;
  onClick: (playlist: Playlist) => void;
}) {
  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            bottom: 12,
            zIndex: 0,
            borderRadius: 4,
            boxShadow: '0 8px 32px 8px rgba(25,20,20,0.25)',
            background: 'rgba(25, 20, 20, 0.10)',
            filter: 'blur(8px)',
            pointerEvents: 'none',
          }}
        />
        <Card 
          onClick={() => onClick(playlist)}
          sx={{ 
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
            borderRadius: 4,
            background: 'rgba(24, 24, 24, 0.92)',
            border: '2px solid rgba(29,185,84,0.25)',
            boxShadow: '0 8px 32px 0 rgba(25,20,20,0.25), 0 1.5px 8px 0 rgba(29,185,84,0.10)',
            '&:hover': {
              boxShadow: '0 12px 40px 0 rgba(25,20,20,0.35), 0 2px 12px 0 rgba(29,185,84,0.18)',
              cursor: 'pointer',
              transform: 'translateY(-6px) scale(1.03)',
              border: '2.5px solid #1DB954',
              background: 'rgba(24, 24, 24, 0.98)',
            },
          }}
        >
          <CardMedia
            sx={{
              height: 160,
              background: 'linear-gradient(45deg, #1DB954 30%, #191414 90%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(29, 185, 84, 0.18) 0%, rgba(25, 20, 20, 0.18) 100%)',
              },
            }}
          >
            <Box sx={{ 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <MusicNoteIcon sx={{ 
                fontSize: 80, 
                color: 'rgba(255, 255, 255, 0.92)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' },
                  '100%': { transform: 'translateY(0px)' },
                },
              }} />
              <QueueMusicIcon sx={{ 
                fontSize: 40, 
                color: 'rgba(255, 255, 255, 0.7)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                animation: 'float 3s ease-in-out infinite',
                animationDelay: '0.5s',
              }} />
            </Box>
          </CardMedia>
          <CardContent sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.5,
            p: 3,
            background: 'rgba(0, 0, 0, 0.18)',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#fff',
                fontSize: '1.4rem',
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {playlist.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                mb: 1,
                flexGrow: 1,
                lineHeight: 1.6,
              }}
            >
              {playlist.description}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              mt: 'auto',
              pt: 2,
              borderTop: '1.5px solid rgba(29,185,84,0.18)',
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#1DB954',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <MusicNoteIcon sx={{ fontSize: 18 }} />
                {playlist.songs.length} Songs
              </Typography>
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(playlist._id);
                }}
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.13)',
                    color: '#ff4444',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
}
