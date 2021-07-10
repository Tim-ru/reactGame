import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import { Link, Redirect } from "react-router-dom";

class AuthPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false,
            isAuth: false,
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
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
            this.setState({ isAuth: true })
        }
    }

    registration = async () => {
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
    }



    render() {
        return (
            <div className="row">
                {(this.state.isAuth) ? <Redirect to='/game' /> :
                    <div className="col s6 offset-s3">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                {(this.state.isAuthenticated) ?
                                    <div>
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
                                    <div>
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
                                        <span>Есть аккаунт? <a style={{ cursor: 'pointer' }} onClick={this.changeFormsHandler}>Войдите</a></span>
                                        <div className="card-action">
                                            <button className="btn teal lighten-2" onClick={this.registration}>Регистрация</button>
                                        </div>
                                    </div>

                                }


                            </div>


                        </div>
                    </div>
                }
            </div>
        )
    }


}

export default AuthPage