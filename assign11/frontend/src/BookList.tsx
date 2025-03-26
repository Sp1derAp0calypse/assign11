import { useEffect, useState } from 'react';
import {Book} from './types/Book'

function BookList () {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("asc");

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        }

        fetchBooks();
    }, [pageSize, pageNum, totalItems, sortOrder])

    return (
        <>
            <h1>Books</h1>
            <br />

            <label>
                Sort by name:
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>

            {books.map((p) =>
            <div id="bookCard" className="card" key={p.bookId}>
                <h3 className="card-title">{p.title}</h3>
                <div className="card-body">
                    <ul className="list-unstyled">
                        <li><strong>Author: </strong>{p.author}</li>
                        <li><strong>Publisher: </strong>{p.publisher}</li>
                        <li><strong>ISBN: </strong>{p.isbn}</li>
                        <li><strong>Classification: </strong>{p.classification}</li>
                        <li><strong>Category: </strong>{p.category}</li>
                        <li><strong>Page Count: </strong>{p.pageCount}</li>
                        <li><strong>Price: </strong>${p.price}</li>
                    </ul>
                </div>
            </div>
        )}

        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

        {[...Array(totalPages)].map((_, index) => (
            <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === (index + 1)}>
                {index + 1}
            </button>
        ))}

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

        <br />
        <label>
            Results per page:
            <select value={pageSize}
                onChange={(p) => {
                    setPageSize(Number(p.target.value))
                    setPageNum(1);
                }}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </label>
        </>
    );
}

export default BookList;