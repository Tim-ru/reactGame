import '../styles/App.css'
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";


class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1,
            type_hard: '0',
            error: '',
            diffChoosen: false,
        }
    }

    changeHandler = (e) => {
        this.setState({ type_hard: e.target.value })
    }

    load = async () => {
        let access_token = JSON.parse(localStorage.getItem('data')).access_token
        let response = await fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify({
                type: this.state.type,
                type_hard: Number(this.state.type_hard)
            })
        });

        let result = await response.json();
        if (result.status) {
            localStorage.setItem('startQuestions', JSON.stringify(result.data))
            localStorage.setItem('type_hard', JSON.stringify(this.state.type_hard))
            this.setState({ diffChoosen: true })
        }
    }

    render() {
        return (
            <div className="input-field" >
                {(this.state.diffChoosen) ? <Redirect to='/game' /> :
                    <div className="selectField">
                        <select value={this.state.type_hard} onChange={this.changeHandler} required>
                            <option disabled value="0">Сложность</option>
                            <option value="1">Легко</option>
                            <option value="2">Сложно</option>
                        </select>

                        < button className="startBtn" onClick={this.load}> Start</button >
                    </div>

                }
            </div >
        )
    }
}

export default StartPage