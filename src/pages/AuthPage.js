import React from 'react'
import { Redirect } from "react-router-dom";

class AuthPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false,
            isLogin: false,
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: '',
        }
    }

    changeFormsHandler = () => {
        this.setState({ isAuthenticated: !this.state.isAuthenticated })
    }

    handleChangeName = (e) => {
        this.setState({ name: e.target.value })
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleChangePasswordConfirm = (e) => {
        this.setState({ password_confirmation: e.target.value })
    }

    login = async () => {
        document.querySelector('.validateError').style.display = 'none'
        let response = await fetch('https://internsapi.public.osora.ru/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        });

        let result = await response.json();
        if (result.status) {
            localStorage.setItem('data', JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                access_token: result.data.access_token
            }))
            this.setState({ isLogin: true })
        }
        if (result.errors) {
            console.log(result.errors);
            this.setState({ errors: result.errors })
            document.querySelector('.validateError').style.display = 'block'
            if (result.errors.password) {
                document.querySelector('.validateError').textContent = 'Поле password не заполнено!'
            }
            if (result.errors.email) {
                document.querySelector('.validateError').textContent = result.errors.email
            }
            if (result.errors) {
                document.querySelector('.validateError').textContent = result.errors
            }
        }
    }

    registration = async () => {
        document.querySelector('.validateError').style.display = 'none'
        let response = await fetch('https://internsapi.public.osora.ru/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            })
        });

        let result = await response.json();
        if (result.status) {
            this.setState({ isAuthenticated: true })
        }
        if (result.errors) {
            console.log(result.errors);
            this.setState({ errors: result.errors })
            document.querySelector('.validateError').style.display = 'block'
            if (result.errors.name) {
                document.querySelector('.validateError').textContent = 'Поле name не заполнено!'
            }
            if (result.errors.email) {
                document.querySelector('.validateError').textContent = result.errors.email
            }
            if (result.errors.password) {
                document.querySelector('.validateError').textContent = 'Поле password не заполнено!'
            }
            if (this.state.password != this.state.password_confirmation) {
                document.querySelector('.validateError').textContent = 'Пароли не совпадают!'
            }
        }

    }



    render() {
        return (
            <div className="container">
                {(this.state.isLogin) ? <Redirect to='/start' /> :
                    <div className="authentication">
                        {(this.state.isAuthenticated) ?
                            <div className="card">
                                <div className="validateError"></div>
                                <span className="card-title">Авторизация</span>
                                <div>
                                    <div className="input-field">
                                        <input
                                            placeholder="Введите email"
                                            id="email"
                                            type="email"
                                            className="validate"
                                            name="email"
                                            onChange={this.handleChangeEmail}
                                        />
                                    </div>

                                    <div className="input-field">
                                        <input
                                            placeholder="Введите пароль"
                                            id="password"
                                            type="password"
                                            className="validate"
                                            name="password"
                                            onChange={this.handleChangePassword}
                                        />
                                    </div>
                                    <span>Нет аккаунта? <a style={{ cursor: 'pointer' }} onClick={this.changeFormsHandler}>
                                        Регистрация
                                    </a></span>
                                </div>
                                <div className="card-action">
                                    <button className="btn blue-grey lighten-1" onClick={this.login}>Вход</button>
                                </div>
                            </div>
                            :
                            <div className="card">
                                <div className="validateError"></div>
                                <span className="card-title">Регистрация</span>
                                <div>
                                    <div className="input-field">
                                        <input
                                            placeholder="Введите name"
                                            className="validate"
                                            name="name"
                                            onChange={this.handleChangeName}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            placeholder="Введите email"
                                            id="email"
                                            type="email"
                                            className="validate"
                                            name="email"
                                            onChange={this.handleChangeEmail}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            placeholder="Введите пароль"
                                            type="password"
                                            className="validate"
                                            name="password"
                                            onChange={this.handleChangePassword}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            placeholder="Подтвердите пароль"
                                            type="password"
                                            className="validate"
                                            name="passwordConfirm"
                                            onChange={this.handleChangePasswordConfirm}
                                        />
                                    </div>
                                </div>
                                <button className="btn" onClick={this.registration}>Регистрация</button>
                                <div className="changeFormField">
                                    <span>Есть аккаунт?
                                        <a
                                            style={{ cursor: 'pointer' }}
                                            onClick={this.changeFormsHandler}>
                                            Войдите
                                        </a>
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }


}

export default AuthPage