import { useState, useEffect } from 'react';
import '../styles/BookCategoryFilter.css';

function BookCategoryFilter({
    selectedCategories,
    setSelectedCategories,
}: {selectedCategories: string[]; setSelectedCategories: (categories: string[]) => void}) {
    {
        const [categories, setCategories] = useState<string[]>([]);

        useEffect(() => {
            const fetchCategories = async () => {
                try {
                    const response = await fetch('https://localhost:5000/api/Bookstore/GetBookCategories');
                    const data = await response.json();
                    console.log('Fetched categories:', data);
                    setCategories(data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            fetchCategories();
        }, []);

        function handleCheckboxChange({target}: {target: HTMLInputElement}) {
            const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((x) => x !== target.value) :
                [...selectedCategories, target.value];
            setSelectedCategories(updatedCategories);
        }

        return (
            <div className="category-filter card border-0 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-3 fw-semibold">Categories</h5>
                    <hr className="mt-0" />
                    <div className="category-list">
                        {categories.map((c) => (
                            <div key={c} className="category-item">
                                <input type="checkbox" id={c} name={c} value={c} className="form-check-input category-checkbox"
                                    onChange={handleCheckboxChange}/>
                                <label htmlFor={c} className="form-check-label">{c}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default BookCategoryFilter;