import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

export const AddBook = () => {
    const [ book, setBook ] = React.useState({name: "", genre: "", authorId: ""});
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBookMut] = useMutation(addBookMutation);
    
    const displayAuthors = () => {
        if (loading) return <option disabled>Loading...</option>;
        if (error) return <option disabled>Error</option>;
    return data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
    };
    
    const submitForm = (e) => {
        e.preventDefault();
        addBookMut({
            variables: {
                name: book.name,
                genre: book.genre,
                authorId: book.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    };

    return (
      <form id="add-book" onSubmit={submitForm}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={(e) => setBook({...book, name: e.target.value})}/>
        </div>

        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={(e) => setBook({...book, genre: e.target.value})}/>
        </div>

        <div className="field">
            <label>Author:</label>
            <select onChange={(e) => setBook({...book, authorId: e.target.value})}>
                <option >Select author</option>
                {displayAuthors()}
            </select>
        </div>

        <button>+</button>
      </form>
    );
}