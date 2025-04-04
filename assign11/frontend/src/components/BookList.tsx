import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { fetchBooks } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (book: Book) => {
    const newItem: CartItem = {
      bookId: book.bookId,
      bookName: book.title,
      price: book.price,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortOrder,
          selectedCategories
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <label>
        Sort by name:
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      {books.map((p) => (
        <div id="bookCard" className="card" key={p.bookId}>
          <h3 className="card-title">{p.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {p.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {p.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {p.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {p.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {p.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {p.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${p.price}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() => handleAddToCart(p)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
