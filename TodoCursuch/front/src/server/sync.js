import env from "react-dotenv";

export default class itemsSync {

    async getItems() {
        const token = sessionStorage.getItem("token");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);//вносим токен авторизации из sessionStorage в Headers
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        return await fetch(env.SERVER_URL + "/api/item", requestOptions)
            .then((response) => response.json())
            .catch((error) => console.log("error", error));
    }

    async postItem(itemData) {

        const myHeaders = new Headers();

        const token = sessionStorage.getItem("token");

        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");

        const request = JSON.stringify({
            ...itemData
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: request,
            redirect: "follow",
        };

        return await fetch(
            env.SERVER_URL + "/api/item/create",
            requestOptions
        )
            .then((result) => result.json())
            .catch(e => console.error(e))
    }

    async updateItem(itemId, updateData) {
        const myHeaders = new Headers();

        const token = sessionStorage.getItem("token");

        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");

        const request = JSON.stringify({
            itemId, ...updateData
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: request,
            redirect: "follow",
        };

        return await fetch(
            env.SERVER_URL + "/api/item/edit",
            requestOptions
        )
            .then((result) => result.json())
            .then(res => {
                return res;
            })
            .catch(e => console.error(e))
    }

    async deleteItem(itemId) {
        const myHeaders = new Headers();

        const token = sessionStorage.getItem("token");

        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");

        const request = JSON.stringify({
            itemId
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: request,
            redirect: "follow",
        };

        return await fetch(
            env.SERVER_URL + "/api/item/delete",
            requestOptions
        )
            .then((result) => result.json())
            .catch(e => console.error(e))
    }
};

