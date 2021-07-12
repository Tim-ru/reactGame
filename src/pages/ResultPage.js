import React from 'react'

class ResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: 0,
            questions: [],
        }
    }

    async componentDidMount() {
        let result = await JSON.parse(localStorage.getItem('finish'))
        this.setState({points: result.points, questions: result.questions})
        console.log(result);
    }

    render() {
        return (
            <div className='resultField'>
                <div className='score'>
                    <p>Score: {this.state.points}</p>
                </div>
                <div className='timer'>
                    <p>Timer: 0</p>
                </div>
                <p>END GAME</p>
                <div className="results">
                    <p>Question</p>
                    <p>Answer</p>
                    <p>Сurrent</p>

                </div>
                <div className='resultVariants'>
                    {this.state.questions.map((i) =>
                    <div className='resultVariantsItem'>
                        <p>{i.question}</p>
                        <p>{i.answer}</p>
                        <p>{i.current_answer}</p>
                    </div>
                    )}
                </div>
            </div>
        )
    }

}

export default ResultPage