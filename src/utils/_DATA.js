let users = {
  mahmoud: {
    id: 'mahmoud',
    name: 'Mahmoud',
    avatarURL: '/images/avatars/2.png',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  ali: {
    id: 'ali',
    name: 'Ali',
    avatarURL: '/images/avatars/3.png',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  sara: {
    id: 'sara',
    name: 'Sara',
    avatarURL: '/images/avatars/1.png',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  },
  mai: {
    id: 'mai',
    name: 'Mai',
    avatarURL: '/images/avatars/4.png',
    answers: {},
    questions: []
  },
  mariam: {
    id: 'mariam',
    name: 'Mariam',
    avatarURL: '/images/avatars/5.png',
    answers: {},
    questions: []
  },
  peter: {
    id: 'peter',
    name: 'Peter',
    avatarURL: '/images/avatars/6.png',
    answers: {},
    questions: []
  }
};

let questions = {
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'peter',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'Be a front-end developer'
    },
    optionTwo: {
      votes: ['mahmoud'],
      text: 'Be a back-end developer'
    }
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'mai',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['ali'],
      text: 'Learn React'
    },
    optionTwo: {
      votes: ['sara'],
      text: 'Learn Angular'
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'sara',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['mai'],
      text: 'Write JavaScript'
    },
    optionTwo: {
      votes: ['peter'],
      text: 'Write Swift'
    }
  }
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          questions: users[authUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          answers: {
            ...users[authUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authUser])
          }
        }
      };

      res();
    }, 500);
  });
}
