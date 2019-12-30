import {api} from "../REST/api";
import {dataAnswers} from './data';
import {useState} from "react";

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
	const [currentProgress, setCurrentProgress] = useState(0);

	/**
	 * inputAnswer = {
	 *         value: val,
	 *         question: questionId,
	 *         answer: answerId
	 *     }
	 *
	 * @param {object} inputAnswer
	 */
	const addNewAnswer = ({value, question, answer, isCheckbox = false, custom = false, checked = false}) => {
		// console.log('before add new anwers', dataAnswers);
		const findId = findID([...dataAnswers], question);
		// console.log('findIndex', findId);
		if (findId === -1) {
			// console.log('I am in -1 find', findId);
			// answers.push({value, question, answer});
			// console.log('concat arrays', answers);
			dataAnswers.push({
				question_id: question,
				answer_list: [{
					id: answer,
					custom: custom === false ? null : value
				}]
			});
		} else {
			if (!isCheckbox) {
				dataAnswers[findId].answer_list = [{
					id: answer,
					custom: custom === false ? null : value
				}];
			} else {
				dataAnswers[findId].answer_list = isMultiAnser(dataAnswers[findId].answer_list,{value, answer}, checked);
				/**
				 * {
					id: answer,
					custom: custom === false ? null : value
				};
				 */
			}

		}
		setCurrentProgress(dataAnswers.length);
		// console.log('current answers', dataAnswers);
	};
	const sendAnswers = (lengthQuestions) => {
		if(dataAnswers.length === lengthQuestions) {
			api.send(dataAnswers);
			return true;
		}
		else {
			console.log('Dont send');
		}
	};

	const setLenght = _length => {
		setCurrentProgress(_length);
	};
	console.log('use currentProgress : ', currentProgress);
	return {addNewAnswer, sendAnswers, currentProgress, setLenght}
};

function findID(arrayLookFor, id) {
	return arrayLookFor.findIndex((el) => {
		return el['question_id'] === id
	});
}

function isMultiAnser (answers, newElement, checked) {
	// console.log('answers', answers, 'newElement', newElement, 'checked', checked);
	if (checked) {
		answers.push({
			id: newElement.answer,
			custom: null
		});
		return answers;
	}
	else {
		return answers.filter((el)=> el.id !== newElement.answer);
	}
}