import React, { useEffect } from "react";
import style from "./UsersList.module.scss"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import fetchUsers from "../../server/fetchUsers";
import changeAdminRoles from "../../server/changeAdminRoles";
import Tooltip from 'react-simple-tooltip';
import { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { UsersEditAction, UsersSetAction } from "../../store/ToDoItemsReducer";

const User = ({ username, isAdmin, userId }) => {
    const dispatch = useDispatch();
    return (
        <div className={style.user}>
            <div>{username}</div>
            <div className={style.user__status}>{isAdmin ? <>Admin</> : <></>}</div>
            <div className={style.user__btns}>
                <div
                    className={style.user__makeAdmin}
                    onClick={() => {
                        (async () => {
                            const response = await changeAdminRoles(userId, !isAdmin);//меняем роль пользователя
                            dispatch(UsersEditAction(response))
                        })()
                    }}
                >
                    <Tooltip
                        content={isAdmin ? "make default user" : "make admin"}//тултип для кнопки изменения роли
                        customCss={css`
                            font-size: 12px;
                        `}
                    >
                        {isAdmin ?
                            <AiOutlineStar className={style.makeAdmin__btn} />
                            : <AiFillStar className={style.makeAdmin__btn} />}
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

const UsersList = () => {
    const listCreator = (users) => users.map(user => <div key={user.userId}>
        <User username={user.username} isAdmin={user.isAdmin} userId={user.userId} />
    </div>
    )//перегоняем массив данных о пользователе в массив разметки
    const list = listCreator(useSelector(state => state.users));//достаем список пользователей из редакса
    const dispatch = useDispatch();
    useEffect(() => {
        list.length ||
            (async () => {
                const { users, currentUserId } = (await fetchUsers());
                dispatch(UsersSetAction(users.filter(user => user.userId !== currentUserId)));
            })()//если в редаксе нет пользователей, запрашиваем их с сервера и вносим в редакс
    })
    return (<div className={style.wrapper}>{list}</div>)
}

export default UsersList;