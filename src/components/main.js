import react, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../fontawesome'
import Card from './card'
import axios from "axios";


const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [orderBy, setOrderBy] = useState("relevance");
    const [count, setCount] = useState('');
    const [startIndex, setStartIndex] = useState(0);
    const [categories, setCategories] = useState('')

    const toggleLoader = () => {
        const loader = document.querySelector('.loader')
        const isLoader = loader.hasAttribute('hidden')

        if (isLoader) {
            loader.removeAttribute('hidden')
        } else {
            loader.setAttribute('hidden', '')
        }
    }
    const searchBook = (event) => {

        if (event.key === "Enter" || event.type === "click") {
            toggleLoader()
            axios
                .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${search}:${categories}&key=AIzaSyCG6-WaXqNZ_sYNNguAm6HvB6q4-I5gMQw&orderBy=${orderBy}&startIndex=${startIndex}&maxResults=30`
                )
                .then((books) => {
                    if (categories === '' || categories === 'all') {
                        setData(books.data.items)
                        console.log(startIndex)

                    }
                    else {
                        let filterBook = books.data.items.filter((item) => {
                            let a = item.volumeInfo?.categories

                            if (a !== undefined) {
                                a = a.map(i => i.toLowerCase())

                                return a = a.includes(categories)
                            }
                        })
                        setData(filterBook);
                        setStartIndex(startIndex + bookData.length)

                    }
                    totalSearch();
                    toggleLoader()
                })
                .catch((error) => {
                    console.log(error)
                    toggleLoader()
                });
        }
    };

    const totalSearch = () => {
        let url = `https://www.googleapis.com/books/v1/volumes?q=${search}:${categories}&key=AIzaSyCG6-WaXqNZ_sYNNguAm6HvB6q4-I5gMQw&maxResults=30`;
        if (categories !== '' && categories !== 'all') {
            url += `&filter=subject:${categories}`;
        }

        axios
            .get(url)
            .then((books) => {
                console.log(books, 'books')
                if (categories === '' || categories === 'all') {
                    setCount(books.data.totalItems);
                    console.log(count, 'count')
                } else {
                    setCount(books.data.totalItems);
                    console.log(count, 'count')
                }
            })
            .catch((error) => console.log(error));
    };


    const loadMoreBooks = () => {
        toggleLoader()
        let url = `https://www.googleapis.com/books/v1/volumes?q=${search}:${categories}&key=AIzaSyCG6-WaXqNZ_sYNNguAm6HvB6q4-I5gMQw&orderBy=${orderBy}&startIndex=${startIndex + 30}&maxResults=30`;
        // if (categories !== '' && categories !== 'all') {
        //     url += `&filter=subject:${categories}`;
        // }
        axios.get(url)
            .then((books) => {
                if (categories === '' || categories === 'all') {
                    setData([...bookData, ...books.data.items]);
                } else {
                    let filterBook = books.data.items.filter((item) => {
                        let a = item.volumeInfo?.categories;
                        if (a !== undefined) {
                            a = a.map(i => i.toLowerCase());
                            return a.includes(categories);
                        }
                        return false;
                    });
                    setData([...bookData, ...filterBook]);
                }
                setStartIndex(startIndex + 30);
                toggleLoader()
            })
            .catch((error) => {
                console.log(error)
                toggleLoader()
            })


    };

    useEffect(() => {
        totalSearch();
    }, [bookData]);

    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="row1">
                        <h1>Найди свою книгу</h1>
                    </div>
                    <div className="row2">
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Введите название книги"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                onKeyPress={searchBook}
                            />
                            <button onClick={searchBook}>
                                <FontAwesomeIcon icon={"fa-magnifying-glass"} size="sm" />
                            </button>
                        </div>
                    </div>
                    <div className="row-categories">
                        <form>
                            Categories: <label for="categories" />
                            <select id="categories"
                                onChange={(event) => setCategories(event.target.value)}>
                                <option value="all">all</option>
                                <option value="art">art</option>
                                <option value="biography">biography</option>
                                <option value="computers">computers</option>
                                <option value="history">history</option>
                                <option value="medical">medical</option>
                                <option value="poetry">poetry</option>
                            </select>
                        </form>
                        <form>
                            Sorting by: <label for="orderBy" />
                            <select id="orderBy"
                                onChange={(event) => setOrderBy(event.target.value)}>
                                <option value="relevance">relevance</option>
                                <option value="newest">newest</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className={"totalSearch" + (bookData?.length === 0 ? ' hidden' : "")} >Найдено {count}</div>
                <div className="box-loader" ><div className="loader" hidden></div></div>
                <div className="content">{<Card book={bookData} />}</div>
                <div className="load-more">
                    <div className="box-loader" ><div className="loader loader-more" hidden></div></div>
                    <button className={(bookData?.length === 0 ? ' hidden' : "")} onClick={() => {
                        document.querySelector('.loader-more').removeAttribute('hidden')
                        loadMoreBooks()
                    }} >Load more</button>
                    {
                        document.querySelector('.loader-more')?.setAttribute('hidden', '')

                    }
                </div>
            </div>
        </>
    );
};

export default Main;