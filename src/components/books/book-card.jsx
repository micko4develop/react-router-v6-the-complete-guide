

const BookCard = ({book}) => {
    return(
        <div>
            <img width={220} src={`/assets/images/books/${book.id}.png`} />
            <div>
                <h2>{book.title}</h2>
                <p>{`$${book.price}`}</p>
            </div>
        </div>
    )
}

export default BookCard;