import {useState} from "react";
import {api} from "../REST/api";


export const useAnswers =  () => {
  const [answers, setAnswer] = useState([]);

  const addNewAnswer = (answer) => {
      setAnswer(answer);
  };
  const sendAnswers  = () => {
    api.send(answers);
  };

  return {addNewAnswer, sendAnswers}
};