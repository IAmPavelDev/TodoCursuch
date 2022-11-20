import React, { useEffect, useState } from "react";
import style from "./ToDoItemList.module.scss";
import ToDoItem from "../ToDoItem/ToDoItem";
import { useSelector } from "react-redux";

export default function ToDoItemList({ isContentEditable }) {
    const [itemsList, setItemsList] = useState();
    const items = useSelector((state) => state.items); //получаем весь state и достаём только items
    useEffect(() => {
        setItemsList(items.map((item, index) => //делаем из массива данных о постах массив разметки и вносим его в локальный стейт компоненты
            <ToDoItem
                inputName={item.title}
                inputMain={item.content}
                numberInList={index}
                itemId={item.itemId}
                key={item.itemId}
                isContentEditable={isContentEditable}
            />
        ))
    }, [setItemsList, items, isContentEditable])/*вносим в массив зависимостей useEffect все переменные 
    которые мы в нём используем, если их не будет, он не вызовется, чтобы не было ошибок
    */

    return <div className={style.list__wrapper}>{itemsList}</div>;
}
