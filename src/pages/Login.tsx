import { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, InputAdornment, IconButton, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', (res.data as { token: string }).token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width:"100vw",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #1DB954 30%, #191414 90%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: '#191414',
              textAlign: 'center',
            }}
          >
            Welcome Back
          </Typography>
          
          <TextField
            name="email"
            label="Email"
            fullWidth
            onChange={handleChange}
            sx={{ mb: 3 }}
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
          
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            onChange={handleChange}
            sx={{ mb: 4 }}
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              backgroundColor: '#1DB954',
              '&:hover': {
                backgroundColor: '#1ed760',
              },
              textTransform: 'none',
              fontSize: '1.1rem',
            }}
          >
            Sign In
          </Button>
          
          <Typography sx={{ mt: 2, color: '#666' }}>
            Don't have an account?{' '}
            <Link
              href="/register"
              sx={{
                color: '#1DB954',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Register here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
