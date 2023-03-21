import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../fontawesome'

const Modal = ({ show, item, onClose}) => {
    if (!show) { return null }
    const title = item.volumeInfo.title
    const categories = item.volumeInfo.categories
    const authors = item.volumeInfo.authors
    const description = item.volumeInfo.description
    const thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail

    const isUndefined = (item) => {
        if (item === undefined) { return '' }
        else { return item.join(', ') }
    }
    return (
        <>
            <div className="overly">
                <div className="overly-inner">
                    <button className="close" onClick={onClose}><FontAwesomeIcon icon={'fa-times'} /></button>
                    <div className="inner-box">
                        <img src={thumbnail === undefined ? "false" : thumbnail} alt="тут должна быть обложка"></img>
                        <div className="overly-info">
                            <h4>{isUndefined(categories)}</h4>
                            <h1>{title}</h1>
                            <h3>{isUndefined(authors)}</h3>
                        </div>
                    </div>
                    <div className="description">{description}</div>

                </div>
            </div>
        </>
    )
}

export default Modal;