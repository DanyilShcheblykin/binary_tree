import React, { createRef, useEffect, useRef, useState } from 'react';
import CardItem from '../cardItem/cardItem';
import {handleMouseDown, handleMouseMove,handleMouseUp} from '../../utils/dragAndDrop';
import ScrenManipulate from '../screenManipulate/screnManipulate';
import './renderTree.scss'

export interface TreeItem {
    name: string;
    children: TreeItem[];
}

const RenderTree = () => {

    const [treeData, setTreeData] = useState<TreeItem[]>([
        {
            name: '',
            children: [
            ],
        },
    ]);
    const [zoom, setZoom] = useState(1);
    const [percZoom, setPercZoom] = useState<number>(10)
    const inputRefs = useRef<{ [key: string]: React.RefObject<HTMLInputElement> }>({});

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        inputRefs.current = {};
    }, [treeData]);

    const handleAddCard = (parentNode: TreeItem, cardRef: React.RefObject<HTMLInputElement>) => {
        const newNode: TreeItem = {
            name: 'New Card',
            children: [],
        };
        const updatedTreeData = updateTreeData(treeData, parentNode, newNode);
        setTreeData(updatedTreeData);
    };

    const handleDeleteCard = (cardToDelete: TreeItem) => {
        const updatedTreeData = deleteCardFromTree(treeData, cardToDelete);
        setTreeData(updatedTreeData);
    };

    const deleteCardFromTree = (data: TreeItem[], cardToDelete: TreeItem): TreeItem[] => {
        return data.filter((item) => {
            if (item === cardToDelete) {
                return false;
            } else if (item.children && item.children.length > 0) {
                item.children = deleteCardFromTree(item.children, cardToDelete);
            }
            return true;
        });
    };

    const updateTreeData = (data: TreeItem[], parentNode: TreeItem, newNode: TreeItem): TreeItem[] => {
        return data.map((item) => {
            if (item === parentNode) {
                return {
                    ...item,
                    children: [...item.children, newNode],
                };
            } else if (item.children && item.children.length > 0) {
                return {
                    ...item,
                    children: updateTreeData(item.children, parentNode, newNode),
                };
            }
            return item;
        });
    };

    const handleZoomIn = () => {
        if (percZoom === 10) {
            return
        }
        setPercZoom(prev => prev + 1)
        setZoom((prevZoom) => prevZoom + 0.1);
    };

    const handleZoomOut = () => {
        if (percZoom === 0) {
            return
        }
        setPercZoom(prev => prev - 1)
        setZoom((prevZoom) => (prevZoom > 0.1 ? prevZoom - 0.1 : prevZoom));
    };

    const handleCenter = () => {
        const treeContainer = document.getElementById('tree-container');
        if (treeContainer) {
            const treeRect = treeContainer.getBoundingClientRect();
            const offsetX = window.innerWidth / 2 - (treeRect.left + treeRect.right) / 2;
            const offsetY = window.innerHeight / 2 - (treeRect.top + treeRect.bottom) / 2;

            setPosition((prevPosition) => ({
                x: prevPosition.x + offsetX,
                y: prevPosition.y + offsetY,
            }));
        }
    };

    const renderTree = (data: TreeItem[]): JSX.Element => {
        return (
            <ul>
                {data.map((item) => {
                    const inputRef = inputRefs.current[item.name] || createRef<HTMLInputElement>();
                    inputRefs.current[item.name] = inputRef;
                    return (
                        <li key={item.name}>
                            <CardItem handleAddCard={handleAddCard}
                                handleDeleteCard={handleDeleteCard}
                                item={item} inputRef={inputRef} ></CardItem>
                            {item.children && item.children.length > 0 ? renderTree(item.children) : null}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div>
            <div style={{ top: position.y, left: position.x, transform: `scale(${zoom})` }}
                onMouseDown={(event) => handleMouseDown(event, position, setIsDragging, setDragOffset)}
                onMouseMove={(event) => handleMouseMove(event, isDragging, dragOffset, setPosition)}
                onMouseUp={() => handleMouseUp(setIsDragging)}
                id='tree-container'
                className="tree-container">
                <div className="tree">
                    {renderTree(treeData)}
                </div>
            </div>
            <ScrenManipulate handleCenter={handleCenter} handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} percZoom={percZoom}></ScrenManipulate>
        </div>);
};

export default RenderTree;