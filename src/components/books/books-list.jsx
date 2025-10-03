import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./book-card";
import { useLocation, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

const List = styled.div`
  margin-top: 10px;
`;

const Radio = styled.div`
  display: flex;
  align-items: center;
  span {
    width: 35px;
    color: #fff;
    font-size: 0.9rem;
    margin-right: 12px;
  }
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const SpanStyled = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: crimson;
  margin-right: 14px;
`;

const BooksList = () => {
  const { state } = useLocation();
  const [books, setBooks] = useState(null) || {};
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (e) => {
    const { name, value } = e.target;
    const currentParams = Object.fromEntries([...searchParams]);
    const newParams = { ...currentParams, [name]: value };
    setSearchParams(newParams);
    sortBooks(books, newParams);
  };

  useEffect(() => {
    if (state) console.warn(`No result found for ${state.id}`);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/books");
      const params = Object.fromEntries([...searchParams]);
      sortBooks(response.data, params);
    })();
  }, []);

  const sortBooks = (data, params) => {
    if (!Object.keys(params).length > 0) {
      setBooks(data);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      const { sort, order } = params;
      switch (order) {
        case "ascending": {
          return a[sort] > b[sort] ? 1 : -1;
        }
        case "descending": {
          return a[sort] < b[sort] ? 1 : -1;
        }
      }
    });

    setBooks(sorted);
  };

  return books ? (
    <div>
      <Radio>
        <SpanStyled>Sort with:</SpanStyled>
        <label>
          Title
          <input
            type="radio"
            name="sort"
            value="title"
            onChange={updateParams}
            defaultChecked={searchParams.get("sort") === "title"}
          />
        </label>
        <label>
          Price
          <input
            type="radio"
            name="sort"
            value="price"
            onChange={updateParams}
            defaultChecked={searchParams.get("sort") === "price"}
          />
        </label>
      </Radio>
      <Radio>
        <SpanStyled>Order :</SpanStyled>
        <label>
          Ascending
          <input
            type="radio"
            name="order"
            value="ascending"
            onChange={updateParams}
            defaultChecked={searchParams.get("order") === "ascending"}
          />
        </label>
        <label>
          Descending
          <input
            type="radio"
            name="order"
            value="descending"
            onChange={updateParams}
            defaultChecked={searchParams.get("order") === "descending"}
          />
        </label>
      </Radio>
      <List>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </List>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default BooksList;
