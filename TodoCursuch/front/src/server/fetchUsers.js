export default async function fetchUsers() {//получения списка всех пользователей
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
    return await fetch("http://localhost:5000/api/user/getAll", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
}