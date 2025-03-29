import './App.css'
import BookList from './BookList'
import CategoryFilter from './CategoryFilter'
import WelcomeBand from './WelcomeBand'
import { useState } from 'react'

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <div className="container-nt-4">
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
    </>
  )
}

export default App
