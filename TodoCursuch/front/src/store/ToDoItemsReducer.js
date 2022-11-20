const InitialToDoItemsState = { items: [], users: [] };
export default function ToDoItemsReducer( //вызывается каждый раз через dispatch, принимает поле action
	state = InitialToDoItemsState, //state задаётся только вначале, один раз 
	action
) {
	switch (action.type) {
		case "items/post":
			return { ...state, items: [...state.items, action.payload] }; //разворачиваем все существующие посты и добавляем новый
		case "items/setList":
			return { ...state, items: action.payload }; //заменяем/добавляем поле items
		case "items/edit":
			return {
				...state, items: [...state.items.map(item =>
					item.itemId === action.payload.itemId ? action.payload : item)]
			};/* если id поля в map совпадает с полем которое мы передали в payload, меняем его */
		case "items/delete":
			return {
				...state, items: state.items.filter(
					(item) => item.itemId !== action.payload
				)
			};//если функция внутри filter возвращает true, элемент перенесётся в новый массив, если false - удалится
		case "users/set":
			return { ...state, users: action.payload };
		case "users/edit":
			return {
				...state, users: [...state.users.map(user =>
					user.userId === action.payload.userId ? action.payload : user
				)]
			}
		default:
			return state;
	}
}

/*ToDoItemsReducer возвращает новый state 
который сразу перезаписывается и запускает ререндер везде где есть useSelector
*/
export function ItemEditAction(editData) { //редактирование поста
	return { type: "items/edit", payload: editData };
}

export function ItemSetListAction(items) { //добавление всех постов, полученых с сервера
	return { type: "items/setList", payload: items };
}

export function ItemPostAction(item) { //добавление постов по одному
	return { type: "items/post", payload: item };
}

export function ItemDeleteAction(itemId) { //удаление поста
	return { type: "items/delete", payload: itemId };
}
 
export function UsersSetAction(users) { //добавление всех пользователе, полученых с сервера, кроме текущего пользователя
	return { type: "users/set", payload: users };
}

export function UsersEditAction(user) {//редактирование состояния пользователя, поле админ/обычный пользователь
	return { type: "users/edit", payload: user };
}

/*
функции actions вызываются с нужными данными в нужном месте и возвращают объект с типом изменений и данными
этот объект попадает в функцию dispatch которую получаем из хука useDispatch() из библиотеки react-redux

вызов функции dispatch вызывает ререндер всех компонент, где используется хук useSelector,
таким образом при любом изминении состояния происходит перерисовка только тех компонент, где используется это состояние
*/