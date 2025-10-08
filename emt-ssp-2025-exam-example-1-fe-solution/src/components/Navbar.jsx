import * as React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const pages = [
    {name: 'Books', path: '/'},
    {name: 'Authors', path: '/authors'}
];


function Navbar() {

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Library
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                //TODO 4: On click to go to the specific page
                                component={Link}
                                to={page.path}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Cart">
                            <IconButton
                                //TODO 5: On click to go to cart page "/cart/1"
                                component={Link}
                                to="/cart/1"
                                color="inherit">
                                <ShoppingCartIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
