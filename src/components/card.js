import React, { useState } from "react";
import Modal from "./modal";

const Card = ({ book }) => {

    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();
    const lengthTitle = (title) => {
        if (title.length > 50) {
            return title.slice(0, 50) + '...'
        } else { return title }
    }

    const authorsLength = (author) => {
        if (author === undefined) {
            return ' '
        }

        if (author.length > 4) {
            return author.slice(0, 4).join(', ') + '...'
        }
        else { return author.join(', ') }
    }

    return (
        <>
            {
                book.map((item, index) => {
                    // item.id = index
                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail
                    // if (thumbnail !== undefined) {
                    let title = item.volumeInfo.title
                    let categories = item.volumeInfo.categories
                    let authors = item.volumeInfo.authors
                    return (
                        <>
                            <div className="card" onClick={() => { setShow(true); setItem(item) }}>
                                <img src={thumbnail === undefined ? "false" : thumbnail} alt='тут должна быть обложка книги'></img>
                                <div className="info">
                                    <div className="categories">{categories === undefined ? '' : categories}</div>
                                    <h3 className="title">{lengthTitle(title)}</h3>
                                    <div className="authors">{authorsLength(authors)}</div>
                                </div>

                            </div>
                            <Modal show={show} item={bookItem} onClose={() => setShow(false)} />
                        </>
                    )
                    // }

                })
            }

        </>
    )
}

export default Card;