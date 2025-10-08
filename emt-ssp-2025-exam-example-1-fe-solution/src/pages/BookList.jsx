import BookCard from "../components/BookCard.jsx";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import bookRepository from "../repository/bookRepository.js";
import {useNavigate} from "react-router-dom";


export default function BookList() {
    //TODO 14: Create a state for the books
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        //TODO 15: Fetch the books and set the state
        bookRepository
            .findAll()
            .then((response) => {
                setBooks(response.data);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load books.');
            });
    }, []);

    return (
        <Container sx={{mt: 4}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography variant="h4">Books</Typography>
                <Button variant="contained" onClick={() => navigate('/add-book')}>
                    Add Book
                </Button>
            </Box>

            {error && <Typography color="error">{error}</Typography>}

            <Grid container spacing={3}>
                {/*TODO 16: Map through the books and display them*/}
                {books.map((book) => (
                    <Grid item key={book.id} md={4}>
                        <BookCard book={book}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
