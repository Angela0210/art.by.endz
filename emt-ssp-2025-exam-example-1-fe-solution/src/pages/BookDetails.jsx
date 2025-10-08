import {Link, useNavigate, useParams} from "react-router-dom";
import {Box, Button, CardMedia, CircularProgress, Container, Stack, Typography} from "@mui/material";
import bookImage from '../assets/shop.png';
import {useEffect, useState} from "react";
import bookRepository from "../repository/bookRepository.js";


export default function BookDetails() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    //TODO 6: Get the book and store it in the state
    const {id} = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        bookRepository
            .findById(id)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Book not found or failed to fetch.');
                setLoading(false);
            });
    }, [id]);

    const navigate = useNavigate();


    //TODO 7: Delete the book and return to '/'
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await bookRepository.deleteById(id);
                navigate('/');
            } catch (err) {
                console.error("Delete failed", err);
                setError('Failed to delete the book.');
            }
        }
    };

    if (loading) {
        return (
            <Container sx={{mt: 4, textAlign: 'center'}}>
                <CircularProgress/>
            </Container>
        );
    }

    if (error || !book) {
        return (
            <Container sx={{mt: 4}}>
                <Typography variant="h5" color="error">{error}</Typography>
                <Button variant="outlined" component={Link} to="/" sx={{mt: 2}}>Back to Home</Button>
            </Container>
        );
    }

    return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4">{book.name}</Typography>
            <CardMedia
                component="img"
                height="300"
                image={bookImage}
                alt={book.name}
                sx={{my: 2}}
            />
            <Typography variant="h6">${book.price}</Typography>
            <Typography variant="h6">{book.author.name}</Typography>
            <Typography variant="h6">Quantity: {book.quantity}</Typography>

            <Box sx={{mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/"
                >
                    Back to Home
                </Button>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        //TODO 8: On click open book edit page
                        component={Link}
                        to={`/edit-book/${book.id}`}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        //TODO 9: On click delete book
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>

        </Container>
    );
}
