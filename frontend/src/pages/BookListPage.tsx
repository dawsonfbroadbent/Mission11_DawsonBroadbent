import BookList from "../components/BookList";
import Heading from "../components/Heading";
import BookFilter from "../components/BookCategoryFilter";
import { useState } from "react";
import CartSummary from "../components/CartSummary";
import '../styles/BookListPage.css';

function BookListPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="book-list-page">
            <CartSummary />
            <Heading />
            <div className="container py-4">
                <div className="row g-4">
                    <div className="col-lg-2">
                        <div className="filter-sidebar">
                            <BookFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <BookList selectedCategories={selectedCategories} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookListPage;