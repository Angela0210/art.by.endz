import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import cartRepository from "../repository/cartRepository.js";


export default function CartPage() {
    //TODO 17: Store the cart in the state
    const [cart, setCart] = useState(null);
    const [error, setError] = useState('');

    //TODO 18: Get the cart and store it in the state
    const fetchCart = () => {
        cartRepository.getCart()
            .then(res => setCart(res.data))
            .catch(err => {
                console.error(err);
                setError('Failed to load cart.');
            });
    };

    useEffect(() => {
        fetchCart();
    }, []);

    //TODO 19: Remove item from cart
    const handleRemoveItem = async (itemId) => {
        try {
            await cartRepository.removeItem(itemId);
            fetchCart();
        } catch (err) {
            console.error(err);
            alert('Failed to remove item.');
        }
    };

    //TODO 20: Clear the cart
    const handleClearCart = async () => {
        try {
            await cartRepository.clearCart();
            fetchCart();
        } catch (err) {
            console.error(err);
            alert('Failed to clear cart.');
        }
    };

    //TODO 21: Borrow item in the cart
    const handleBuyItems = async () => {
        try {
            await cartRepository.buyItems();
            alert('Borrowing successful!');
            fetchCart();
        } catch (err) {
            console.error(err);
            alert('Failed to complete purchase.');
        }
    };

    if (error) {
        return <Typography color="error" sx={{mt: 4}}>{error}</Typography>;
    }

    if (!cart) {
        return <Typography sx={{mt: 4}}>Loading cart...</Typography>;
    }

    const total = cart.items.reduce((sum, item) => sum + item.book.price, 0);

    return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            <Typography variant="subtitle1" sx={{mb: 2}}>
                User: {cart.user.username} ({cart.user.email})
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Book</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell><strong>Author</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.book.title}</TableCell>
                                <TableCell>${item.book.price}</TableCell>
                                <TableCell>{item.book.author.name} t</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{mt: 3}}>
                <Divider sx={{mb: 2}}/>
                <Typography variant="h6">Total: ${total}</Typography>

                <Stack direction="row" spacing={2} sx={{mt: 2}}>
                    <Button
                        variant="outlined"
                        color="error"
                        //TODO 22: On click clear the cart
                        onClick={handleClearCart}>
                        Clear Cart
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        //TODO 23: On click borrow the books in the cart
                        onClick={handleBuyItems}
                        disabled={cart.items.length === 0}
                    >
                        Borrow books
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
