import React from 'react';
import {Radio} from "antd";
import {useAnswers} from "../../useHooks/useAnswers";

export const RadioAnswer = ({answers, questionId}) => {

    const {addNewAnswer} = useAnswers();
    const answerHandler = (val, questionId, answerId) => {
        console.log(val, questionId, answerId);
        addNewAnswer({
            value: val,
            question: questionId,
            answer: answerId
        });

    };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const radioRender = answers.map(el => {
        if (el.type === 2) {
            return <Radio key={el.id} onChange={(event) => answerHandler(event.target.value, questionId, el.id)}
                          style={radioStyle} value={el.value}>{el.value}</Radio>;
        }

    });
    return (
        <Radio.Group name={`questions_${questionId}`}>
            {radioRender}
        </Radio.Group>
    )
};