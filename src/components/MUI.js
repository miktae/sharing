import { styled } from '@mui/material/styles';

const style = {
    position: 'relative',
    top: '10%',
    left: '3%',
    width: 220,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0.3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export { style, DrawerHeader }