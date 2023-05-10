import React, { useState } from 'react'
import s from './index.module.scss'
import { IBoard, IBoardItem } from 'types/IBoard'
import Item from './components/Item'
import Board from './components/Board'
import AddBoard from './components/AddBoard'
import classNames from 'classnames'

type DragAndDropProps = {
    classname?: string,
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ classname }) => {
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

    const addItemHandler = (boardId: number, item: IBoardItem) => {
        setBoards(boards.map(b => {
            if (b.id == boardId) {
                b.items.splice(b.items.length, 0, item)
            }
            return b
        }))
    }

    const deleteItemHandler = (boardId: number, itemId: number) => {
        setBoards(boards.map(b => {
            if (b.id === boardId) {
                const itemIndex = b.items.findIndex(element => element.id === itemId)
                b.items.splice(itemIndex, 1)
            }
            return b
        }))
    }

    const addBoardHandler = (title: string) => {
        let boardId = Math.max(...boards.map(e => { return e.id })) + 1
        setBoards([...boards, { id: boardId, title: title, items: [] }])
    }

    const deleteBoardHandler = (boardId: number) => {
        setBoards([...boards].filter(b => b.id !== boardId))
    }

    const updateItemHandler = (boardId: number, itemId: number, title: string) => {
        setBoards(boards.map(b => {
            if (b.id === boardId){
                b.items.map(element =>{
                    if (element.id === itemId){
                        element.title = title
                        return element
                    }
                })
            }
            return b;
        }))
    }

    const updateBoardHandler = (boardId: number, title: string) => {
        setBoards(boards.map(b => {
            if (b.id === boardId){
                b.title = title
            }
            return b;
        }))
    }

    const [grabbedBoard, setGrabbedBoard] = useState<IBoard | null>(null)
    const [grabbedItem, setGrabbedItem] = useState<IBoardItem | null>(null)
    const [grabbedItemBoard, setGrabbedItemBoard] = useState<IBoard | null>(null)

    const dragItemEnterHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IBoardItem) => {
        e.preventDefault();
        if (!grabbedItemBoard || !grabbedItem || e.dataTransfer?.getData("text") !== 'Item') return
        //элемент под курсором становится placeholder
        (e.target as HTMLDivElement)?.classList.add(s.placeholder)
        // если это другая доска, удаляем из предыдущей элемент и вставляем его в эту доску
        if (board.id !== grabbedItemBoard.id) {
            // индекс элемента на который мы навелись
            const indexEnter = board.items.indexOf(item)
            setBoards(boards.slice().map(b => {
                //удаляем текущей элемент на прошлой доске
                if (b.id == grabbedItemBoard.id) {
                    const index = b.items.indexOf(grabbedItem)
                    b.items.splice(index, 1)
                }
                // добавляем на текущую доску элемент
                else if (b.id === board.id)
                    b.items.splice(indexEnter, 0, grabbedItem)
                return b
            }))
            //меняем текущую доску
            setGrabbedItemBoard(board)
        }
        //если это та же доска, ставим элемент на место прошлого
        if (board.id === grabbedItemBoard.id) {
            setBoards(boards.slice().map(b => {
                if (b.id == grabbedItemBoard.id) {
                    const currIndex = b.items.indexOf(grabbedItem);
                    const itemIndex = b.items.indexOf(item);
                    b.items.splice(currIndex, 1)
                    b.items.splice(itemIndex, 0, grabbedItem)
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
        setGrabbedItemBoard(board)
        setGrabbedItem(item);
        e.dataTransfer?.setData("text", 'Item')
    }
    const dragItemEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        //очищаем state
        setGrabbedItemBoard(null)
        setGrabbedItem(null)
    }
    const dropItemHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IBoardItem) => {
        // e.preventDefault();
        //убираем placeholder и очищаем state
        (e.target as HTMLElement).classList.remove(s.placeholder)
        setGrabbedItemBoard(null)
        setGrabbedItem(null)
    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    const dragBoardEnterHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        e.preventDefault()
        if (grabbedBoard == null || e.dataTransfer?.getData("text") !== 'Board') return
        // элемент под мышкой становится placeholder
        (e.target as HTMLElement).parentElement?.classList.add(s.board__placeholder);
        (e.target as HTMLElement).classList.add(s.board__header__placeholder);
        //Меняем местами взятый элемент и тот, под которым находимся
        const currentIndex = boards.indexOf(grabbedBoard)
        const boardIndex = boards.indexOf(board)
        const newBoards = [...boards]
        newBoards.splice(currentIndex, 1)
        newBoards.splice(boardIndex, 0, grabbedBoard)
        setBoards(newBoards)
    }
    const dragBoardLeaveHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        e.preventDefault();
        //убираем placeholder
        (e.target as HTMLElement).parentElement?.classList.remove(s.board__placeholder);
        (e.target as HTMLElement).classList.remove(s.board__header__placeholder);
    }
    const dragBoardStartHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        // e.preventDefault()
        setGrabbedBoard(board)
        e.dataTransfer?.setData("text", 'Board')
    }
    const dragBoardEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        //очищаем state
        setGrabbedBoard(null)
    }
    const dropBoardHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        e.preventDefault();
        //убираем placeholder и очищаем state
        (e.target as HTMLElement).parentElement?.classList.remove(s.board__placeholder);
        (e.target as HTMLElement).classList.remove(s.board__header__placeholder);
        setGrabbedBoard(null)
    }

    const dragBoardOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.isDefaultPrevented()
    }
    const dragItemOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.isDefaultPrevented()
    }


    return (
        <div className={classNames(classname, s.dragAndDrop)}>
            {boards.map(board =>
                <Board
                    onDragOver={(e) => dragBoardOverHandler(e)}
                    onDragEnter={(e) => dragBoardEnterHandler(e, board)}
                    onDragLeave={(e) => dragBoardLeaveHandler(e, board)}
                    onDragStart={(e) => dragBoardStartHandler(e, board)}
                    onDragEnd={(e) => dragBoardEndHandler(e)}
                    onDrop={(e) => dropBoardHandler(e, board)}
                    draggable={true}
                    board={board}
                    addItemHandler={addItemHandler}
                    deleteBoardHandler={deleteBoardHandler}
                    updateBoardHandler={updateBoardHandler}
                >
                    {board.items.map(item =>
                        <Item
                            onDragOver={(e) => dragItemOverHandler(e)}
                            onDragEnter={(e) => dragItemEnterHandler(e, board, item)}
                            onDragLeave={(e) => dragItemLeaveHandler(e, board, item)}
                            onDragStart={(e) => dragItemStartHandler(e, board, item)}
                            onDragEnd={(e) => dragItemEndHandler(e)}
                            onDrop={(e) => dropItemHandler(e, board, item)}
                            item={item}
                            boardId={board.id}
                            draggable={true}
                            deleteItemHandler={deleteItemHandler}
                            updateItemHandler={updateItemHandler}
                        />
                    )}
                </Board>
            )}
            <AddBoard addBoardHandler={addBoardHandler} />
        </div >
    )
}

export default DragAndDrop