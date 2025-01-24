import React, { useState } from 'react';
import { Box, TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const user = {
    email: 'OlimFlush@gmail.com',
    password: 'flush-A',
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;

    if (/mobile/i.test(userAgent)) {
      return 'Telefon';
    } else if (/tablet/i.test(userAgent)) {
      return 'Planshet';
    } else {
      return 'Kompyuter';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const deviceType = getDeviceType();
    if (localStorage.getItem('userToken') && deviceType === !'Kompyuter') {
      alert('Siz allaqachon tizimga kirdingiz.');
      return;
    }
    if (email === user.email && password === user.password) {
      console.log(`Foydalanuvchi qurilmasi: ${deviceType}`);
      localStorage.setItem('userToken', 'uniqueUserToken');
      navigate('/controller');
    } else {
      setAlertMessage('Noto\'g\'ri email yoki parol.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div>
      <Card sx={{ width: 400, padding: 3, background: 'rgba(215,215,215,0.9)' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Flush-A Kirish
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Gmail"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: '10px' }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>

      {showAlert && <Alert sx={{ position: 'absolute', top: '30px', right: '30px' }} severity="warning">{alertMessage}</Alert>}
    </div>
  );
};
