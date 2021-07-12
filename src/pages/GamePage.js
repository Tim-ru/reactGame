import React from 'react'
import { Redirect, Link } from "react-router-dom";

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 2,
            type_hard: '',
            options: [],
            points: 0,
            question: '',
            time: 0,
            answer: 0,
            gameFinished: false,
        }
    }

    timer = () => {
        let interval = setInterval(() => {
            if (this.state.time > 0) {
                this.setState({ time: this.state.time - 1 })
            } else {
                clearInterval(interval)
            }
        }, 1000);
    }

    async componentDidMount() {
        let startQuestions = await JSON.parse(localStorage.getItem('startQuestions'))
        let type_hard = await JSON.parse(localStorage.getItem('type_hard'))
         this.setState({
            options: startQuestions.options,
            points: startQuestions.points,
            question: startQuestions.question,
            time: startQuestions.time,
            type_hard: type_hard,
        })
        this.timer()
    }

    answerLoad = async (e) => {
        let access_token = JSON.parse(localStorage.getItem('data')).access_token
        this.setState({ answer: Number(e.target.value) })
        let response = await fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify({
                type: this.state.type,
                type_hard: Number(this.state.type_hard),
                answer: Number(this.state.answer)
            })
        });
        let result = await response.json();
        if (result.status) {
            if (result.data.total_questions) {
                localStorage.setItem('finish', JSON.stringify(result.data))
                this.setState({ gameFinished: true })
            }
            this.setState({
                options: result.data.options,
                points: result.data.points,
                question: result.data.question,
                time: result.data.time,
            })
        }

        console.log(this.state);
    }

    render() {
        return (
            <div className='container'>
                {(this.state.gameFinished) ? <Redirect to='/result' /> :
                    <div>
                        <div className='score'>
                            <p>Score: {this.state.points}</p>
                        </div>
                        <div className='timer'>
                            <p>Timer: {this.state.time}</p>
                        </div>
                        <div className='example'>
                            {this.state.question} = ?
                        </div>
                        <div className='variants'>
                            {this.state.options.map((i) =>
                                <input type='button' value={i} className="variantsItem" onClick={this.answerLoad}></input>
                            )}
                        </div>
                        <Link className="backButton" to='/start'>Go Back</Link>
                    </div>
                }
            </div>
        )
    }
}

export default GamePage