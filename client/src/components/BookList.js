import React from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import { BookDetails } from './BookDetails';

export const BookList = () => {
    const [ selected, setSelected ] = React.useState(null);
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;
    return (
      <div>
        <ul id="book-list">
            {data.books.map(book => (
                <li key={book.id} onClick={(e) => {setSelected(book.id)}}>{book.name}</li>
            ))}
        </ul>
        <BookDetails bookId={selected} />
      </div>
    );
}