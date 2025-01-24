import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Card, CardContent, CssBaseline, Drawer, Grid, List, ListItem, ListItemText, Toolbar, Typography, TextField, IconButton, Switch, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const drawerWidth = 240;

export const Dashboard = () => {
    const [openDrawer, setOpenDrawer] = useState(true);
    const [selectedOption, setSelectedOption] = useState('qarzlar');
    const [debts, setDebts] = useState([]);
    const [newDebt, setNewDebt] = useState({ amount: '', description: '', to: '', device: '', createdAt: '' });
    const [darkMode, setDarkMode] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [debtToDelete, setDebtToDelete] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/');
    };

    useEffect(() => {
        const storedDebts = JSON.parse(localStorage.getItem('debts')) || [];
        setDebts(storedDebts);
    }, []);

    const handleAddDebt = () => {
        if (newDebt.amount && newDebt.description && newDebt.to && newDebt.device) {
            const createdAt = new Date().toLocaleString();
            const updatedDebt = { ...newDebt, createdAt };
            const updatedDebts = [...debts, updatedDebt];
            setDebts(updatedDebts);
            localStorage.setItem('debts', JSON.stringify(updatedDebts));
            setNewDebt({ amount: '', description: '', to: '', device: '', createdAt: '' });
            setSelectedOption('qarzlar');
        } else {
            alert('Iltimos, barcha maydonlarni to\'ldiring (kimga, miqdori, tasviri, qurilma).');
        }
    };

    const handleDeleteDebt = (index) => {
        setDebtToDelete(index);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = () => {
        const updatedDebts = debts.filter((_, idx) => idx !== debtToDelete);
        setDebts(updatedDebts);
        localStorage.setItem('debts', JSON.stringify(updatedDebts));
        setOpenDeleteDialog(false);
    };

    const cancelDelete = () => {
        setOpenDeleteDialog(false);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={openDrawer}
                >
                    <List>
                        <ListItem button onClick={() => setSelectedOption('qarzlar')}>
                            <ListItemText primary="Qarzlar" />
                        </ListItem>
                        <ListItem button onClick={() => setSelectedOption('yangiQarz')}>
                            <ListItemText primary="Yangi Qarz Qo'shish" />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        p: 3,
                    }}
                >
                    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
                        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" noWrap component="div">
                                Flush-A Dashboard
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WbSunnyIcon />
                                <Switch
                                    checked={darkMode}
                                    onChange={toggleDarkMode}
                                    inputProps={{ 'aria-label': 'dark mode toggle' }}
                                    sx={{ ml: 'auto' }}
                                />
                                <BedtimeIcon />
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Box sx={{ mt: 4 }}>
                        {selectedOption === 'qarzlar' ? (
                            <Grid container spacing={3}>
                                {debts.length === 0 ? (
                                    <Typography variant="h3" sx={{ margin: '400px auto' }}>Hozircha qarzlar mavjud emas.</Typography>
                                ) : (
                                    debts.map((debt, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Card>
                                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Box>
                                                        <Typography variant="h5">Qarz #{index + 1}</Typography>
                                                        <Typography variant="body2" sx={{ fontSize: '20px' }}>Kimga: {debt.to}</Typography>
                                                        <Typography variant="body2" sx={{ fontSize: '20px' }}>Miqdor: {debt.amount}</Typography>
                                                        <Typography variant="body2" sx={{ fontSize: '20px' }}>Tasvir: {debt.description}</Typography>
                                                        <Typography variant="body2" sx={{ fontSize: '20px' }}>Kompyuter: {debt.device}</Typography>
                                                        <Typography variant="body2" sx={{ fontSize: '20px' }}>Vaqt: {debt.createdAt}</Typography>
                                                    </Box>
                                                    <IconButton
                                                        edge="end"
                                                        color="error"
                                                        aria-label="delete"
                                                        onClick={() => handleDeleteDebt(index)}
                                                    >
                                                        <Delete sx={{ fontSize: '40px' }} />
                                                    </IconButton>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        ) : selectedOption === 'yangiQarz' ? (
                            <Box sx={{ width: '100%', maxWidth: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', margin: '0 auto' }} >
                                <Typography variant="h5" gutterBottom>Yangi Qarz Qo'shish</Typography>
                                <TextField
                                    label="Kimga"
                                    variant="outlined"
                                    fullWidth
                                    value={newDebt.to}
                                    onChange={(e) => setNewDebt({ ...newDebt, to: e.target.value })}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    label="Qarz miqdori"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    value={newDebt.amount}
                                    onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    label="Qarz tasviri"
                                    variant="outlined"
                                    fullWidth
                                    value={newDebt.description}
                                    onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    label="Kompyuter (faqat raqam kiriting)"
                                    variant="outlined"
                                    fullWidth
                                    value={newDebt.device}
                                    onChange={(e) => setNewDebt({ ...newDebt, device: e.target.value })}
                                    sx={{ marginBottom: 2 }}
                                    inputProps={{
                                        pattern: '[0-9]*',
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleAddDebt}
                                >
                                    Qarz qo'shish
                                </Button>
                            </Box>
                        ) : null}
                    </Box>

                    <Dialog
                        open={openDeleteDialog}
                        onClose={cancelDelete}
                    >
                        <DialogTitle>Uchratuvchi</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">Siz ushbu qarzni o'chirishni tasdiqlaysizmi?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={cancelDelete} color="primary">
                                Yo'q
                            </Button>
                            <Button onClick={confirmDelete} color="error">
                                Ha
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            </Box>
        </ThemeProvider>
    );
};
