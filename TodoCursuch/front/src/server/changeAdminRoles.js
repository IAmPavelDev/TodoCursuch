import env from "react-dotenv";

export default async function changeAdminRoles(userId, isAdminSet) {//меняем роль пользователя по userId
    const token = sessionStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");
    const request = JSON.stringify({
        userId,
        isAdminSet
      });
    
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: request,
        redirect: "follow",
      };
    return await fetch(env.SERVER_URL + "/api/user/changeAdminRoles", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
}