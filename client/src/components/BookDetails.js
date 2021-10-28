import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';


export const BookDetails = ({ bookId }) => {
    return (
      <div id="book-details">
        {DisplayBookDetails(bookId)}
      </div>
    );
}

const DisplayBookDetails = (bookId) => {
    const { loading, error, data } = useQuery(getBookQuery, {variables: { id: bookId }});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;
    if(bookId) {
        return (
            <div>
                <h2>{data.book.name}</h2>
                <p>{data.book.genre}</p>
                <p>{data.book.author.name}</p>
                <p>All books by the author</p>
                <ul className="other-books">
                    {data.book.author.books.map(item => {
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>
            </div>
        )
    } else {
        return (
            <div>No selection</div>
        )
    }
} 