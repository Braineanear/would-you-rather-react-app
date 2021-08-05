import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';

const addAnswerToUser = (authUser, qid, answer) => {
  return {
    type: ADD_ANSWER_TO_USER,
    authUser,
    qid,
    answer
  };
};

export const RECEIVE_USERS = 'RECEIVE_USERS';

export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';

export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

export const addQuestionToUser = ({ id, author }) => {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  };
};

export const handleSaveQuestionAnswer = (authUser, qid, answer) => {
  return dispatch => {
    dispatch(addAnswerToUser(authUser, qid, answer));
    dispatch(addAnswerToQuestion(authUser, qid, answer));

    return saveQuestionAnswer(authUser, qid, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
};
