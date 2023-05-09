import React, { useState } from 'react'
import s from './index.module.scss'
import { IBoard, IBoardItem } from '../../types/IBoard'
import Item from './components/Item'

type Props = {}

const DragAndDrop = (props: Props) => {
    const [boards, setBoards] = useState<Array<IBoard>>([
        {
            id: 1, title: "Блок 1", items: [
                { id: 1, title: "Элемент 1" },
                { id: 2, title: "Элемент 2" },
                { id: 3, title: "Элемент 3" },
            ],
        },
        {
            id: 2, title: "Блок 2", items: [
                { id: 4, title: "Элемент 4" },
                { id: 5, title: "Элемент 5" },
                { id: 6, title: "Элемент 6" },
            ],
        },
        {
            id: 3, title: "Блок 3", items: [
                { id: 7, title: "Элемент 7" },
                { id: 8, title: "Элемент 8" },
                { id: 9, title: "Элемент 9" },
            ],
        }
    ])
    const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null)
    const [currentItem, setCurrentItem] = useState<IBoardItem | null>(null)

    const dragItemOverHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        // e.preventDefault()
    }

    const dragItemEnterHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IBoardItem) => {
        e.preventDefault();
        if (!currentBoard || !currentItem) return
        //элемент под курсором становится placeholder
        // если это другая доска, удаляем из предыдущей элемент и вставляем его в эту доску
        (e.target as HTMLElement).classList.add(s.placeholder)
        // если это другая доска, удаляем из предыдущей элемент и вставляем его в эту доску
        if (board.id !== currentBoard.id) {
            // индекс элемента на который мы навелись
            const indexEnter = board.items.indexOf(item)
            setBoards(boards.slice().map(b => {
                //удаляем текущей элемент на прошлой доске
                if (b.id == currentBoard?.id) {
                    const index = b.items.indexOf(currentItem)
                    b.items.splice(index, 1)
                }
                // добавляем на текущую доску элемент
                else if (b.id === board.id)
                    currentItem && b.items.splice(indexEnter, 0, currentItem)
                return b
            }))
            //меняем текущую доску
            setCurrentBoard(board)
        }
        //если это та же доска, ставим элемент на место прошлого
        if (board.id === currentBoard.id) {
            setBoards(boards.slice().map(b => {
                if (b.id == currentBoard?.id) {
                    const currIndex = b.items.indexOf(currentItem);
                    const itemIndex = b.items.indexOf(item);
                    b.items.splice(currIndex, 1)
                    b.items.splice(itemIndex, 0, currentItem)
                }
                return b
            }))
        }
    }

    const dragItemLeaveHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IBoardItem) => {
        //убираем placeholder
        (e.target as HTMLElement).classList.remove(s.placeholder)
    }
    const dragItemStartHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IBoardItem) => {
        //инициализируем взятый элемент и доску над которой мы двигаемся
        setCurrentBoard(board)
        setCurrentItem(item);
        // setDraggedType('IBoardItem')
        // e.dataTransfer
    }
    const dragItemEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        //очищаем state
        setCurrentBoard(null)
        setCurrentItem(null)
    }
    const dropItemHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IBoardItem) => {
        // e.preventDefault();
        //убираем placeholder и очищаем state
        (e.target as HTMLElement).classList.remove(s.placeholder)
        setCurrentBoard(null)
        setCurrentItem(null)
    }

    const dragBoardOverHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        e.preventDefault()
    }
    const dragBoardEnterHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        e.preventDefault()
        if (!currentBoard) return
        //элемент под мышкой становится placeholder 
        (e.target as HTMLElement).parentElement?.classList.add(s.board__placeholder)
        //Меняем местами взятый элемент и тот, под которым находимся
        const currentIndex = boards.indexOf(currentBoard)
        const boardIndex = boards.indexOf(board)
        const newBoards = [...boards]
        newBoards.splice(currentIndex, 1)
        newBoards.splice(boardIndex, 0, currentBoard)
        setBoards(newBoards)
    }
    const dragBoardLeaveHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        e.preventDefault();
        //убираем placeholder
        (e.target as HTMLElement).parentElement?.classList.remove(s.board__placeholder)
    }
    const dragBoardStartHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        // e.preventDefault()
        setCurrentBoard(board)
    }
    const dragBoardEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        //очищаем state
        setCurrentBoard(null)
    }
    const dropBoardHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        e.preventDefault();
        //убираем placeholder и очищаем state
        (e.target as HTMLElement).parentElement?.classList.remove(s.board__placeholder)
        setCurrentBoard(null)
    }

    return (
        <div className={s.dragAndDrop}>
            {boards.map(board =>
                <div className={s.board}>
                    <div className={s.board__header}
                        onDragOver={(e) => dragBoardOverHandler(e, board)}
                        onDragEnter={(e) => dragBoardEnterHandler(e, board)}
                        onDragLeave={(e) => dragBoardLeaveHandler(e, board)}
                        onDragStart={(e) => dragBoardStartHandler(e, board)}
                        onDragEnd={(e) => dragBoardEndHandler(e)}
                        onDrop={(e) => dropBoardHandler(e, board)}
                        draggable={true}
                    >
                        {board.title}
                    </div>
                    <div className={s.board__content}>
                        {board.items.map(item =>
                            <Item
                                onDragOver={(e) => dragItemOverHandler(e, board)}
                                onDragEnter={(e) => dragItemEnterHandler(e, board, item)}
                                onDragLeave={(e) => dragItemLeaveHandler(e, board, item)}
                                onDragStart={(e) => dragItemStartHandler(e, board, item)}
                                onDragEnd={(e) => dragItemEndHandler(e)}
                                onDrop={(e) => dropItemHandler(e, board, item)}
                                text={item.title}
                                draggable={true}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DragAndDrop