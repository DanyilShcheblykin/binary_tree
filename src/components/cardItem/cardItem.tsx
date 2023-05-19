import React from 'react';
import { TreeItem } from '../renderTree/renderTree';
import './cardItem.scss'

interface CardItemProps {
    inputRef: React.RefObject<HTMLInputElement>,
    handleAddCard: (parentNode: TreeItem, cardRef: React.RefObject<HTMLInputElement>) => void,
    handleDeleteCard: (cardToDelete: TreeItem) => void,
    item: TreeItem
}

const CardItem = ({ inputRef, handleAddCard, handleDeleteCard, item }: CardItemProps) => {
    return (
        <div className="cardBlock">
            <input
                ref={inputRef}
            />
            <div className="manipulate add" onClick={() => handleAddCard(item, inputRef)}></div>
            <div
                className="manipulate changeText"
                onClick={() => inputRef.current?.focus()}
            ></div>
            <div className="manipulate delete" onClick={() => handleDeleteCard(item)}></div>
        </div>
    );
};

export default CardItem;