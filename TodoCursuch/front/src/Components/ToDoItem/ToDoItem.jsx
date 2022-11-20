import React, { useRef, useState, useEffect } from "react";
import style from "./ToDoItem.module.scss";

import { ItemDeleteAction, ItemEditAction } from "../../store/ToDoItemsReducer";
import { useDispatch } from "react-redux";

import {
    MdOutlineEditOff,
    MdOutlineModeEditOutline,
    MdDeleteForever,
    MdSave
} from "react-icons/md";//иконки

import itemsSync from "../../server/sync";


function Field(data, placeholder, styleClass, isEditable, changeHandler) {
    const fieldRef = useRef(null);
    function setDefaultField() {
        if (fieldRef.current.innerText === "") {
            fieldRef.current.innerText = placeholder;
        }
    }
    useEffect(() => {
        setDefaultField();
    });//если после отрисовки оказалось что данных нет, отображаем placeholder
    return (
        <div
            ref={fieldRef}
            className={styleClass}
            contentEditable={isEditable ? "true" : "inherit"}
            suppressContentEditableWarning={true}
            onClick={() => {
                if (
                    fieldRef.current.innerText === placeholder &&
                    isEditable
                ) {
                    fieldRef.current.innerText = " ";
                }
            }}
            onBlur={setDefaultField}
            onInput={(e) =>
                changeHandler(e.target.innerText !== data, e.target.innerText, placeholder.toLowerCase())
            } //создаём ivent для внесения каждого изменения в объект updateData на 64-й строке
        >
            {data}
        </div>
    );
}


export default function ToDoItem({
    inputName,
    inputMain,
    numberInList,
    itemId,
    isContentEditable
}) {
    const dispatch = useDispatch();

    const [isEditable, setIsEditable] = useState(false);
    const [isNew, setIsNew] = useState(false); //для отображения кнопки сохранения изменений
    const sync = new itemsSync();//создаём инстанс класса, который хранит методы запросов к серверу
    const updateData = useRef({}); //объект для отправки изменений на сервер

    /* хук useRef сохраняет переданное значение и хранит в поле current даже после перерендера компоненты,
     используем для сохранения изменений после изменения стейтов*/

    const onChangeHandler = (isNew, data, type) => {//вносит все изменения в updateData
        if (isNew) {
            updateData.current[type] = data;
        }
        setIsNew(isNew);//включаем кнопку сохранить
    }

    const updateItem = () => {
        sync.updateItem(itemId, updateData.current)//отправка изменений на сервер
            .then(response => { //ответ с сервера
                setIsNew(false); //выключаем кнопку сохранить
                dispatch(ItemEditAction(response.item)) //вносим изменения в редакс
            })
    }

    const deleteItem = () => {
        sync.deleteItem(itemId).then(() => {//удаляем вначале с сервера, потом из редакса
            dispatch(ItemDeleteAction(itemId))
        })
    }

    return (
        <>
            <div
                className={style.ToDoItem__wrapper}
            >
                <div className={style.ToDoItem__wrapper__data_number}>
                    #{numberInList + 1}
                </div>
                <div
                    className={style.ToDoItem__wrapper__data}
                >
                    {Field(
                        inputName,
                        "title",
                        style.ToDoItem__wrapper__data__name,
                        isEditable,
                        onChangeHandler
                    )}
                    {Field(
                        inputMain,
                        "Content",
                        style.ToDoItem__wrapper__data__main,
                        isEditable,
                        onChangeHandler
                    )}
                </div>
                {isContentEditable ? (//отображаем интерфейс изменения поста, в зависимости от роли пользователя
                    <div
                        className={style.ToDoItem__wrapper__buttons}
                    >
                        <div
                            onClick={() => setIsEditable(!isEditable)}
                        >
                            {isEditable ? (
                                <MdOutlineEditOff />
                            ) : (
                                <MdOutlineModeEditOutline />
                            )}
                        </div>
                        <div
                            onClick={deleteItem}
                        >
                            <MdDeleteForever />
                        </div>
                        {isNew ?
                            <div onClick={updateItem}><MdSave /></div> : <></>}
                    </div>
                ) : <></>}
            </div>
        </>
    );
}
