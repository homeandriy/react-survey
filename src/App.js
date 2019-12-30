import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import {Button, Card, Icon, Result, Spin} from "antd";
import {api} from "./REST/api";
import {Answer} from "./components/answers";
import {useAnswers} from "./useHooks/useAnswers";

function App() {
	const [load, setLoad] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [error, setError] = useState(false);
	const [all, setAll] = useState(false);
	const [endTests, setEnd] = useState(false)

	const {sendAnswers, currentProgress, setLenght} = useAnswers();
	console.log('currentProgress', currentProgress);
	useEffect(() => {
		(async () => {
			setLoad(true);

			const token = api.getToken();
			const data = await api.get(token);
			// console.log('data', data);
			if(data.status === 404) {
				setError(true)
			}
			else {
				const {questions} = data;
				setLenght(questions.length);
				setQuestions(questions);
			}

			setLoad(false);
		})();
	}, []);

	useEffect(( currentProgress)=>{
		if(currentProgress === questions.length) {
			console.log('set true');
			setAll(true);
		}
		console.log('set false')
	},[currentProgress]);
	// console.log('questions', questions);
	const renderedEl = load === false ? questions.map((el) => {
		return (
			<Card key={el.id} type="inner" title={el.description} >
				<Answer questionId={el.id} answers={el.answers} isCheckbox={el.is_multi_answer}/>
			</Card>
		)
	}) : '';
	const sendHandler  = (event) => {
		const sendResult = sendAnswers(questions.length);
		if(sendResult) {
			setEnd(true);
		}
	};
	// console.log(currentProgress);
	return (
		<div className="App">
			<Fragment>
				{!error ?
					<Fragment>
						{!endTests ?
							<Fragment>
								{load ? <Spin size='large'/> : renderedEl}


								<Button onClick={sendHandler} type='success' block>
									<Icon type="check-circle"/>
									Завершити
								</Button>
							</Fragment>
							:
							<Result
								status="success"
								title="Дякуємо"
								subTitle="за успішне проходження тесту"

							/>
						}

					</Fragment>
				:
					<Fragment>
						<Result
							status="warning"
							title="Ви вже пройшли опитування або при завантаженні виникли проблеми. Для вирішення проблеми опишіть вашу проблему в коментарях"

						/>
					</Fragment>
				}
			</Fragment>
		</div>
	);
}

export default App;
