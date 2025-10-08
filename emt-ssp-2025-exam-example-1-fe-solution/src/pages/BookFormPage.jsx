import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Container, MenuItem, TextField, Typography} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import authorsRepository from "../repository/authorsRepository.js";
import bookRepository from "../repository/bookRepository.js";

const BookFormPage = () => {
    //TODO 10: Get the book id from the URL and check if it's an edit or add operation
    const {id} = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [book, setBook] = useState({
        title: '',
        price: '',
        quantity: '',
        category: '',
        author_id: '',
    });

    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        authorsRepository.findAll()
            .then(res => setAuthors(res.data))
            .catch(err => console.error('Failed to load authors', err));

        //TODO 11: If it's an edit operation, fetch the book details and set the state
        if (isEdit) {
            bookRepository.findById(id)
                .then(response => {
                    const book = response.data;
                    setBook({
                        title: book.title,
                        price: book.price,
                        quantity: book.quantity,
                        category: book.category,
                        author_id: book.author.id
                    });})
                .catch(err => {
                    console.error('Failed to load book', err);
                    setError('Failed to load book.');
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setBook({...book, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const bookData = {
            title: book.title,
            price: parseFloat(book.price),
            quantity: parseInt(book.quantity),
            category: book.category,
            author_id: parseInt(book.author_id),
        };

        //TODO 12: Send the book data to the correct API endpoint
        try {
            if (isEdit) {
                await bookRepository.update(id, bookData);
            } else {
                await bookRepository.create(bookData);
            }
            navigate('/');
        } catch (err) {
            setError(isEdit ? 'Failed to update book.' : 'Failed to add book.');
            console.error(err);
        }
    };

    return (
        <Container sx={{pt: 4}}>
            <Typography variant="h4" gutterBottom>
                {isEdit ? 'Edit Book' : 'Add New Book'}
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}
                 sx={{mt: 2, display: 'flex', flexDirection: 'column', gap: 2}}>

                {/*TODO 13: Correctly fill in the name, value and onChange props for each input*/}

                <TextField
                    name="title"
                    label="Book Title"
                    value={book.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="price"
                    label="Price"
                    type="number"
                    value={book.price}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={book.quantity}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="category"
                    label="Category"
                    type="text"
                    value={book.category}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="author_id"
                    label="Author"
                    select
                    value={book.author_id}
                    onChange={handleChange}
                    required
                >
                    {authors.map((aut) => (
                        <MenuItem key={aut.id} value={aut.id}>
                            {aut.name}
                        </MenuItem>
                    ))}
                </TextField>

                <Button type="submit" variant="contained" color="primary">
                    {isEdit ? 'Update Book' : 'Add Book'}
                </Button>
            </Box>
        </Container>
    );
};

export default BookFormPage;
