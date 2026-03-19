import Heading from './Heading';
import BookList from './BookList';


function App() {
  return (
    <div className="bg-body-tertiary min-vh-100">
      <Heading />
      <main className="pb-5">
        <BookList />
      </main>
    </div>
  )
}

export default App
