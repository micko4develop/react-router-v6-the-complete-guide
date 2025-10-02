import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "./book-detail";

const Book = () => {
    const { id } = useParams();   
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:3001/books/${id}`);
                setData(res.data);
            } catch (err) {
                console.error("Error fetching book:", err);
            }
        })();  
    }, [id]);  

    return data ? (
        <BookDetail book={data} /> 
    ) : (
        <h3>Loading...</h3>
    )
}

export default Book;