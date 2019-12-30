import React from 'react';
import TextArea from "antd/es/input/TextArea";
import {Input, Radio} from "antd";
import {Scale} from "../scale";
import {Bool} from "../boolean";
import {useAnswers} from "../../useHooks/useAnswers";
import {RadioAnswer} from "../radioAnswers";
import {ChekcBoxAnswer} from "../checkBoxAnswers";

export const Answer = ({answers, questionId, isCheckbox}) => {

    const {addNewAnswer} = useAnswers();
    const answerHandler = (val, questionId, answerId, custom) => {
        // console.log(val, questionId, answerId, custom);
        addNewAnswer({
            value : val,
            question : questionId,
            answer : answerId,
            isCheckbox : false,
            custom : custom
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
        renderedAnswers = isCheckbox === 0 ? <RadioAnswer answers={answers} questionId={questionId}/> : <ChekcBoxAnswer answers={answers} questionId={questionId}/>
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
                case 3 :
                    return <TextArea key={el.id} type='text'
                                     onChange={(event) => answerHandler(event.target.value, questionId, el.id, true)}/>;
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