import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ToDoItemCreate from "./Components/ToDoItemCreate/ToDoItemCreate";
import ToDoItemList from "./Components/ToDoItemList/ToDoItemList";
import UsersList from "./Components/UsersList/UsersList";
import Auth from "./Components/Auth/Auth";
import style from "./App.module.scss";
import itemsSync from "./server/sync";
import { useDispatch } from "react-redux";
import { ItemSetListAction } from "./store/ToDoItemsReducer";
import Nav from "./Components/Nav/Nav";
import { checkIsAuth } from "./server/auth";

function Main({ isUserAdmin, setIsUserAdmin, isAuth, setIsAuth }) {

  const dispatch = useDispatch();
  const sync = new itemsSync();
  const Authorize = async (isAuthMode) => { //запрос постов с сервера
    sync.getItems()
      .then(response => {//получаем список постов и вносим в редакс
        dispatch(ItemSetListAction(response.items))
      })
      .then(() => setIsAuth(isAuthMode));// меняем стейт авторизации на true
  };


  useEffect(() => {
    checkIsAuth()//проверяем на сервере авторизован ли пользователь
      .then(response => {
        setIsUserAdmin(response.isAdmin)
        Authorize(response.isAuth)// если true пускаем сразу к приложению
      })
  })
  return (
    <div
      className={style.app__wrapper}
    >
      {!isAuth ? (
        <Auth
          setIsAuth={Authorize}//после подтверждения авторизации вызываем Authorize
          setIsUserAdmin={setIsUserAdmin} />
      ) : isUserAdmin ? (
        <>
          <ToDoItemCreate
          />
          <ToDoItemList
            isContentEditable={isUserAdmin} />
        </>
      ) : (
        <ToDoItemList
          isContentEditable={isUserAdmin} />
      )}
    </div>
  );
}

function App() {
  const [isUserAdmin, setIsUserAdmin] = useState(false);//если пользователь админ, отображаем навигацию с возможностью перейти к списку пользователей
  const [isAuth, setIsAuth] = useState(false);//авторизован или нет
  //Routes - роуты для отображения списка постов и пользователей по страницам
  return (
    <>
      {isUserAdmin ? <Nav /> : <></>}
      <Routes>
        <Route path="/" element={<Main
          isUserAdmin={isUserAdmin}
          isAuth={isAuth}
          setIsUserAdmin={setIsUserAdmin}
          setIsAuth={setIsAuth} />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </>
  )
}

export default App;
