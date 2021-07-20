import './App.css';
import {useState} from "react";
import axios from "axios";

const App = () => {
    const [categories, setCategories] = useState("all");
    const [sorting, setSorting] = useState("relevance");
    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);

    const handleChange = (event) =>{
        const book = event.target.value;
        setBook(book);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "+" + categories + "&orderBy=" + sorting + "&maxResults=40")
            .then(data => {
                setResult(data.data.items);
            })

    }

    return (
        <div className="container App">
            <h1 className="app__title">Поиск книг</h1>
            <form className="d-flex" onSubmit={handleSubmit}>
                <div>
                    <label className="w-100">
                        <input onChange={handleChange} className="form-control mb-3" type="text"
                               placeholder={"Поиск книг"}/>
                    </label>
                    <div>
                        <button type="submit" className="btn btn-dark mb-3">Найти</button>
                    </div>
                </div>
                <div className="filter">
                    <select value={categories}
                            onChange={e => setCategories(e.target.value)}>
                        <option value="all">all</option>
                        <option value="art">art</option>
                        <option value="biography">biography</option>
                        <option value="computers">computers</option>
                        <option value="history">history</option>
                        <option value="medical">medical</option>
                        <option value="poetry">poetry</option>
                    </select>
                    <select value={sorting}
                            onChange={e => setSorting(e.target.value)}>
                        <option value="relevance">relevance</option>
                        <option value="newest">newest</option>
                    </select>
                </div>
            </form>
            <div className="books">
                {result.map(book => (
                    <div className="book">
                        <img src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''}
                             alt={book.volumeInfo.title}/>
                        <div className="book-title">
                            <h5 className="card-title">{book.volumeInfo.title}</h5>
                            <a href={book.volumeInfo.previewLink} className="btn btn-primary">Узнать больше</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;
