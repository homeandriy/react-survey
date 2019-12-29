import React from 'react';
import TextArea from "antd/es/input/TextArea";
import {Input, Radio} from "antd";
import {Scale} from "../scale";
import {Bool} from "../boolean";
import {useAnswers} from "../../useHooks/useAnswers";
import {RadioAnswer} from "../radioAnswers";

export const Answer = ({answers, questionId}) => {

    const {addNewAnswer} = useAnswers();
    const answerHandler = (val, questionId, answerId) => {
        console.log(val, questionId, answerId);
        addNewAnswer({
            value : val,
            question : questionId,
            answer : answerId
        });

    };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    // HARDCODE if answer type == 2
    let renderedAnswers = [];
    if(answers[0]['type'] === 2) {
        renderedAnswers = <RadioAnswer answers={answers} questionId={questionId}/>
    }
    else {
        renderedAnswers = answers.map((el) => {
            switch (el.type) {
                case 0 :
                    return <Scale key={el.id} {...el} />;
                    break;
                case 1 :
                    return <Bool key={el.id} {...el} />;
                    break;
                case 2 :
                    return <Radio key={el.id} onChange={(event) => answerHandler(event.target.value, questionId, el.id)}
                                  name={questionId} style={radioStyle} value={el.value}>{el.value}</Radio>;
                    break;
                case 3 :
                    return <TextArea key={el.id} type='text'
                                     onChange={(event) => answerHandler(event.target.value, questionId, el.id)}/>;
                    break;
                default :
                    return '';
            }
        });
    }
    return (
        <>
            {renderedAnswers}
        </>
    )
};