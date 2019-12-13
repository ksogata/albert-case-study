import React from 'react';

const Books = ({ books, start, end }) => {
    return (
        <div className='results-container'>
            {books.slice(start, end).map((book) => 
                <div className='result-items' key={book.key}>
                    <div className='image-info'>
                        <p>{book.title}</p>
                        {book.author_name && <p>By: {book.author_name}</p>}
                    
                    </div>
                    <div className='image-wrapper'>
                        <img className='image' alt={`${book.title}`} src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Books;