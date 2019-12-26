import React from 'react';
import TextArea from "antd/es/input/TextArea";
import {Input} from "antd";
import {Scale} from "../scale";
import {Bool} from "../boolean";
import {useAnswers} from "../../useHooks/useAnswers";

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

    const renderedAnswers = answers.map((el)=>{
        switch (el.type) {
            case 0 :
                return <Scale key={el.id} {...el} />;
                break;
            case 1 :
                return <Bool key={el.id} {...el} />;
                break;
            case 2 :
                return <TextArea key={el.id} {...el} onChange={(event)=>answerHandler(event.target.value, questionId,el.id)} />;
                break;
            case 3 :
                return <Input key={el.id} type='text' onChange={(event)=>answerHandler(event.target.value, questionId,el.id)}   />;
                break;
            default :
                return '';
        }
    });
    return (
        <>
            {renderedAnswers}
        </>
    )
};