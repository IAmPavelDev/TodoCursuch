
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
    "http://localhost:5000/api/user/registration",
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
    "http://localhost:5000/api/user/login",
    requestOptions
  )
    .then((result) => result.json())
    .then(data => {
      if (data.error) {
        setStatus(data.error);
        setIsRegister(true);
      }
      sessionStorage.setItem("token", data.token);
      if (data.token) { confirm() };
      setIsUserAdmin(data.isUserAdmin);
    })
    .catch(e => console.error(e))
};

export const checkIsAuth = async () => {//проверяем на сервере авторизован пользователь или нет

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");


  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    "http://localhost:5000/api/user/checkIsAuth",
    requestOptions
  )
    .then(res => res.json())
    .catch(e => console.error(e))
}