import '../styles/App.css'
import React, { Component } from 'react'



class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1,
            type_hard: '0',
            error: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            type_hard: e.target.value
        })
    }

    render() {
        return (
            <div className="form-container" >
                <select value={this.state.type_hard} onChange={this.changeHandler}>
                    <option value="0">Сложность</option>
                    <option value="1">Легко</option>
                    <option value="2">Сложно</option>
                </select>

                < button className="startBtn" > Start</button >
            </div >
        )
    }
}

export default StartPage