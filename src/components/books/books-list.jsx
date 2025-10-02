import axios from "axios";
import { useState, useEffect } from "react";
import BookCard from "./book-card";

const BooksList = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
    (async () => {
        const res = await axios.get("http://localhost:3001/books");
        setData(res.data);
    })();  
    }, []);

    return data ? (
        <>
            {data.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </>
    ) : (
        <h3>Loading...</h3>
    )
}

export default BooksList;