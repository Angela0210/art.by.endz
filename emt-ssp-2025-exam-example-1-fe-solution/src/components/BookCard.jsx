import {Button, Card, CardContent, CardMedia, Divider, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import bookImage from '../assets/shop.png';
import cartRepository from "../repository/cartRepository.js";

//TODO 1: Get the book as a prop
export default function BookCard({book}) {


    const handleAddToCart = async () => {
        //TODO 2: Add book to cart
        try {
            await cartRepository.addToCart({
                book_id: book.id
            });
            alert(`Added ${book.title} to cart`);
        } catch (err) {
            console.error('Failed to add to cart:', err);
            alert('Error adding to cart');
        }
    };

    return (
        <Card sx={{
            width: '100%',
            minWidth: 250,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>

            <CardMedia component="img" height="160" image={bookImage} alt={book.name}/>
            <CardContent>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {book.title}
                </Typography>


                <Stack direction="row" alignItems="center" spacing={1} sx={{mt: 2}}>
                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        sx={{ml: 'auto'}}
                    >
                        Add to cart
                    </Button>
                </Stack>

                <Divider sx={{my: 2}}/>

                <Button
                    variant="outlined"
                    fullWidth
                    //TODO 3: On click open book details page
                    component={Link}
                    to={`/book/${book.id}`}
                >
                    See Details
                </Button>
            </CardContent>
        </Card>
    );
}
