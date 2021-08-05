import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actions/users';

const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';

export const ADD_QUESTION = 'ADD_QUESTION';

export const receiveQuestions = questions => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

export const addAnswerToQuestion = (authUser, qid, answer) => {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
  };
};

export const handleSaveQuestion = (optionOneText, optionTwoText, author) => {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
};
