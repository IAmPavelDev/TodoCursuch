import React, { useEffect, useRef} from "react";
import style from "./ToDoItemCreate.module.scss";
import { ItemPostAction } from "../../store/ToDoItemsReducer";
import { useDispatch } from "react-redux";
import itemsSync from "../../server/sync";
import { MdAddBox} from "react-icons/md";

export default function ToDoItemCreate() {
    const dispatch = useDispatch();
    const sync = new itemsSync();

    let buffer = {
        title: "",
        content: "",
    };//объект для хранения внесенных данных и отправки на сервер и в редакс
    function inputAction(event) {
        buffer[event.currentTarget.id] = event.currentTarget.innerText;
    }
    function addToStore() {
        sync.postItem({ ...buffer })//отправка нового поста на сервер, spread чтобы создать новый объект, а не передавать ссылку
            .then(response => {//ответ с сервера содержит уже сохран1нный в БД новый пост
                dispatch(ItemPostAction({ ...response.newItem }))//который мы добавляем в редакс
            })
            .then(() => {//после обнуляем объект buffer и поля
                buffer.title = "";
                buffer.content = "";
                document.getElementById("title").innerText = "";
                document.getElementById("content").innerText = "";
            })

    }
    function Field(placeholder, styleClass, id) {
        const fieldRef = useRef(null);
        function setDefaultField() {
            if (fieldRef.current.innerText === "") {
                fieldRef.current.innerText = placeholder;
            }
        }
        useEffect(() => {
            setDefaultField();
        });//если данных нет, вставляем placeholder
        return (
            <div
                id={id}
                ref={fieldRef}
                className={styleClass}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onSelect={() => {
                    if (fieldRef.current.innerText === placeholder) {
                        fieldRef.current.innerText = " ";
                    }
                }}//по клику удаляем placeholder
                onBlur={setDefaultField}//по уходу из поля, если оно пустое, вставляем placeholder
                onInput={(e) => inputAction(e)}//вносим данные в buffer
            />
        );
    }
    return (
        <>
            <div
                className={style.create__wrapper}
            >
                <div
                    className={style.create__wrapper__inputs}
                >
                    {Field("Title", style.create__wrapper__name, "title")}
                    {Field(
                        "Content",
                        style.create__wrapper__name,
                        "content"
                    )}
                </div>
                <div className={style.create__wrapper__buttons}>
                    <MdAddBox
                        id="add__btn"
                        onClick={addToStore}
                        className={style.create__wrapper__buttons__btn}
                    />
                </div>
            </div>
        </>
    );
}
