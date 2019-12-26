import React from 'react';
import './App.css';
import {Button, Card, Icon} from "antd";
import {api} from "./REST/api";
import {Answer} from "./components/answers";
import {useAnswers} from "./useHooks/useAnswers";

function App() {

    const data = api.get();
    const {questions} = data;
    const {sendAnswers} = useAnswers();
    const renderedEl = questions.map((el) => {
       return (
           <Card key={el.id} type="inner" title={el.description} >
               <Answer questionId={el.id} answers={el.answers}/>
           </Card>
       )
    });
    return (
        <div className="App">
            {renderedEl}

            <Button onClick={sendAnswers} type='danger' block>
                <Icon type="check-circle"  />
                Завершити</Button>
        </div>
    );
}

export default App;
