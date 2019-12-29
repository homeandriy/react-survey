import {useState} from "react";
import {api} from "../REST/api";

/**
 * answers order example
 *
 * [
 *   {
 *       "question_id : 6,
 *       "answer_list" : {
 *           "id" : 1,
 *           "custom" : "My answer"
 *       }
 *   },
 {
 *       "question_id : 6,
 *       "answer_list" : {
 *           "id" : 25,
 *           "custom" : NULL
 *       }
 *   },
 *   {}
 * ]
 *
 * @returns {{sendAnswers: sendAnswers, addNewAnswer: addNewAnswer}}
 */

export const useAnswers = () => {
    const [answers, setAnswer] = useState([]);

    /**
     * inputAnswer = {
     *         value: val,
     *         question: questionId,
     *         answer: answerId
     *     }
     *
     * @param {object} inputAnswer
     */
    const addNewAnswer = ({value, question, answer}) => {
        console.log('before add new anwers', answers);
        const findId = answers.findIndex((el) => {
            return el['question'] === question
        });
        console.log('findIndex', findId);
        if (findId === -1) {
            console.log('concat arrays', [...answers, {value, question, answer}]);
            setAnswer([...answers, {value, question, answer}])
        } else {
            setAnswer(
                prev => prev[findId].answer = answer
            );
        }

        console.log('current answers', answers);
    };
    const sendAnswers = () => {
        api.send(answers);
    };

    return {addNewAnswer, sendAnswers}
};