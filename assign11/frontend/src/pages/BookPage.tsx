import BookList from '../components/BookList'
import CategoryFilter from '../components/CategoryFilter'
import WelcomeBand from '../components/WelcomeBand'
import { useState } from 'react'
import CartSummary from '../components/CartSummary'

function BookPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container-nt-4">
            <CartSummary />
            <div className="row bg-primary text-white">
                <WelcomeBand />
            </div>
            <div className="row">
            <div className="col-md-3">
                <CategoryFilter
                selectedCategories={selectedCategories} 
                setSelectedCategories={setSelectedCategories}
                />
            </div>
            <div className="col-md-9">
                <BookList selectedCategories={selectedCategories}/>
            </div>
            </div>
            </div>
    )
}

export default BookPage;
