import BookList from "../components/BookList";
import Heading from "../components/Heading";
import BookFilter from "../components/BookCategoryFilter";
import { useState } from "react";
import CartSummary from "../components/CartSummary";

function BookListPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div>
            <CartSummary />
            <Heading />
            <div><BookFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
            <div><BookList selectedCategories={selectedCategories} /></div>
        </div>
    )
}

export default BookListPage;