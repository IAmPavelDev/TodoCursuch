import env from "react-dotenv";

export const registration = (username, password, confirm) => {//получаем данные формы и вызываем confirm если сервер вернул токен
  const request = JSON.stringify({
    username,
    password
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");


  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: request,
    redirect: "follow",
  };
  fetch(
    env.SERVER_URL + "/api/user/registration",
    requestOptions
  )
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem("token", data.token);//вносим токен доступа в sessionStorage, jwt-токен
      if (data.token) confirm();
    })
    .catch(e => console.error(e))
};

export const login = (username,
  password,
  confirm,
  setIsUserAdmin,
  setStatus,
  setIsRegister) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");

  const request = JSON.stringify({
    username,
    password
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: request,
    redirect: "follow",
  };
  fetch(
    env.SERVER_URL + "/api/user/login",
    requestOptions
  )
    .then((result) => result.json())
    .then(data => {
      if (data.error) {
        setStatus(data.error);
        setIsRegister(true);
      }
      sessionStorage.setItem("token", data.token);
      setIsUserAdmin(data.isUserAdmin);
      if (data.token) { confirm() };
    })
    .catch(e => console.error(e))
};

export const checkIsAuth = async () => {//проверяем на сервере авторизован пользователь или нет

  const token = sessionStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");


  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    env.SERVER_URL + "/api/user/checkIsAuth",
    requestOptions
  )
    .then(res => res.json())
    .catch(e => console.error(e))
}