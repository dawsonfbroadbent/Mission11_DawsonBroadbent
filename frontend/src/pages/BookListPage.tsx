import BookList from "../components/BookList";
import Heading from "../components/Heading";

function BookListPage() {
    return (
        <div className="bg-body-tertiary min-vh-100">
        <Heading />
        <main className="pb-5">
            <BookList />
        </main>
        </div>
    );
    }