import { useState, useEffect } from 'react'
import './CategoryFilter.css'

function CategoryFilter({
    selectedCategories, 
    setSelectedCategories,
}: { 
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}) {

    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
            const response = await fetch('https://localhost:5000/Book/GetProjectTypes');
            const data = await response.json()
            console.log('shoulda worked:', data)
            setCategories(data)
            } catch (error) {
              console.error("yeah idk man it broke", error)
            }
        };

        fetchCategories();
    }, [])

    function handleCheckboxChange ({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(c => c !== target.value) : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }

    return (
        <div className='category-filter'>
            <h5>Book Categories</h5>
            <div className='category-list'>
                {categories.map((c) => (
                    <div key={c} className='category-items'>
                        <input type="checkbox" 
                        id={c} 
                        value={c} 
                        className='category-checkbox'
                        onChange={handleCheckboxChange}
                        />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;