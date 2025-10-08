import React, {useEffect, useState} from 'react';
import {
    CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import authorsRepository from '../repository/authorsRepository.js';

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        authorsRepository
            .findAll()
            .then((response) => {
                setAuthors(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching authors:', err);
                setError('Failed to load authors.');
                setLoading(false);
            });
    }, []);

    if (loading) return <CircularProgress sx={{display: 'block', mx: 'auto', mt: 4}}/>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container sx={{mt: 0, pt: 1}}>
            <Typography variant="h4" gutterBottom>
                Authors
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Biography</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.map((author) => (
                            <TableRow key={author.id}>
                                <TableCell>{author.id}</TableCell>
                                <TableCell>{author.name}</TableCell>
                                <TableCell>{author.biography}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AuthorsList;
