import BookList from "./pages/BookList.jsx";
import {Route, Routes} from "react-router-dom";
import BookDetails from "./pages/BookDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthorsList from "./pages/AuthorsList.jsx";
import {Container} from "@mui/material";
import BookFormPage from "./pages/BookFormPage.jsx";
import CartPage from "./pages/CartPage.jsx";

function App() {
    return (
        <>
            <Navbar/>
            <Container sx={{pt: 10}}>
                <Routes>
                    {/*TODO 24: Create routes for the pages*/}
                    <Route path="/" element={<BookList/>}/>
                    <Route path="/authors" element={<AuthorsList/>}/>
                    <Route path="/book/:id" element={<BookDetails/>}/>
                    <Route path="/add-book" element={<BookFormPage/>}/>
                    <Route path="/edit-book/:id" element={<BookFormPage/>}/>
                    <Route path="/cart/1" element={<CartPage/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App
