import React, { useState, useRef} from "react";
import style from "./Auth.module.scss";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { registration, login } from "../../server/auth";

export default function Auth({ setIsAuth, setIsUserAdmin }) {
    const [isRegister, setIsRegister] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState("");//статус для ошибок с сервера
    const inputLoginRegisterRef = useRef();
    const inputRegisterRef = useRef();
    const inputLoginRef = useRef();


    function submit() {
        const loginRef = inputLoginRef.current;
        const firstInput = inputLoginRegisterRef.current;
        if (checkValid()) {
            if (isRegister) {
                registration(loginRef.value, firstInput.value, () => {
                    setIsAuth(true)
                });//данные регистрации на сервер, и колбек для состояния авторизован/неавторизован
                setIsRegister(!isRegister);//перенаправляем на форму логина
            } else {
                login(loginRef.value, firstInput.value, () => {
                    setIsAuth(true)
                }, setIsUserAdmin, setStatus, setIsRegister);//отправка формы логина
            }
        }
    }
    function checkValid() {//проверка форм на валидность данных, длинна пароля минимум 8 символов, длинна логина - минимум 3
        const loginRef = inputLoginRef.current;
        const firstInput = inputLoginRegisterRef.current;
        const secondInput = inputRegisterRef.current;

        const validBoolPassword = isRegister
            ? firstInput.value === secondInput.value &&
            firstInput.value.length >= 8 &&
            secondInput.value.length >= 8
            : firstInput.value.length >= 8;
        const validBoolLogin = loginRef.value.length > 3;

        loginRef.style.borderColor = validBoolLogin ? "green" : "red";//подсветка поля по валидности
        firstInput.style.borderColor = firstInput.value.length
            ? validBoolPassword
                ? "green"
                : "red"
            : null;
        secondInput.style.borderColor = isRegister
            ? secondInput.value.length
                ? validBoolPassword
                    ? "green"
                    : "red"
                : null
            : null;

        return validBoolPassword && validBoolLogin;
    }
    function inputPasswd(placeholder, inputReference) {
        return (
            <div
                className={style.wrapper__container__input__password}
            >
                <input
                    ref={inputReference}
                    onChange={() => checkValid()}
                    type={isVisible ? "text" : "password"}
                    placeholder={placeholder}
                />
                <div
                    className={
                        style.wrapper__container__input__password__toggle
                    }
                    onClick={() => setIsVisible(!isVisible)}
                >
                    {isVisible ? (
                        <AiFillEyeInvisible а />
                    ) : (
                        <AiFillEye />
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper__container}>
                <div className={style.wrapper__container__head}>
                    <span className={style.status}>{status}</span>
                    <div className={style.wrapper__container__head__main}>
                        {isRegister ? (
                            <h2>Registration</h2>
                        ) : (
                            <h2>Login</h2>
                        )}
                    </div>

                </div>

                <div
                    className={style.wrapper__container__input__login}
                >
                    <input
                        ref={inputLoginRef}
                        onChange={() => checkValid()}
                        type={"text"}
                        placeholder={"login(min 3 characters)"}
                    />
                </div>
                {inputPasswd("password (8 characters)", inputLoginRegisterRef)}
                {isRegister ? (
                    inputPasswd("password (8 characters)", inputRegisterRef)
                ) : (
                    <div style={{ display: "none" }}>
                        {inputPasswd(
                            "password (8 characters)",
                            inputRegisterRef
                        )}
                    </div>
                )}
                <button
                    onClick={submit}
                    className={style.wrapper__container__sbmt__btn}
                >
                    {isRegister ? <>Registration</> : <>Login</>}
                </button>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    className={style.wrapper__container__have_acc_btn}
                >
                    {isRegister
                        ? "Already have an account"
                        : "Don't have an account"}
                </button>
            </div>
        </div>
    );
}
