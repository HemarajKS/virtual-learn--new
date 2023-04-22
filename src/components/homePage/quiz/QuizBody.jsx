import './Quiz.css';
import { MultiStepForm, Step } from 'react-multi-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  showQuizModal,
  testShow,
  testSuccess,
} from '../../../redux/reducers/Conditions';
import QuizModal from './QuizModal';

import { Navigate, useNavigate } from 'react-router-dom';
import { answerHeader } from '../../../redux/reducers/testAnswerHeader';
import { answer } from '../../../redux/reducers/testAnswer';
import { testisSuccess } from '../../../redux/reducers/testSlice';
import { testSuccessRed } from '../../../redux/reducers/SuccessTestRed';
import { showSuccessPage } from '../../../redux/reducers/showSuccesspage';
import { finaltestShowPage } from '../../../redux/reducers/finalTestSuccess';
import { FinalResult } from '../../../redux/reducers/finalResult';
import Loading from '../../../utils/loading/Loading';

const QuizBody = () => {
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizData = useSelector((state) => state.test.data.data);
  const showTestSuccesPage = useSelector(
    (state) => state.loginConditions.successTest
  );

  const finaltestShow = useSelector((state) => state.finaltestShowPage.value);

  useEffect(() => {
    finaltestShow && setLoading(false);
    finaltestShow && navigate('/finalResult');
  }, [finaltestShow]);

  useEffect(() => {
    // showTestSuccesPage && dispatch(testShow(false));
    showTestSuccesPage && setLoading(false);
    showTestSuccesPage && navigate('/testSuccess');
  }, [showTestSuccesPage]);

  useEffect(() => {
    dispatch(testSuccessRed(false));
  }, []);

  let userAnswer = [];

  const submitQuizHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    var form = document.getElementById('quiz');

    quizData.questions.forEach((element) => {
      userAnswer.push({
        questionId: element.questionId,
        correctAnswer: form.elements[`Id${element.questionId}`].value,
      });
    });

    const submitData = { testId: quizData.testId, userAnswers: userAnswer };

    console.log('submit', quizData);

    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/${
        quizData.testName === 'Final Test' ? 'finalSubmit' : 'submit'
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
        body: JSON.stringify(submitData),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('resppp', res);
        if (res && res.chapterTestPercentage >= 0) {
          if (quizData.testName === 'Final Test') {
            dispatch(finaltestShowPage(true));
            dispatch(FinalResult(`result?testId=${quizData.testId}`));
          } else {
            dispatch(testSuccess(true));
            dispatch(answerHeader(`resultHeader?testId=${quizData.testId}`));
            dispatch(answer(`resultAnswers?testId=${quizData.testId}`));
          }

          dispatch(testisSuccess());
          dispatch(showSuccessPage(true));
        } else if (res && res.chapterTestPercentage < 0) {
          alert('You have not met the minimum passing grade');
          dispatch(testShow(false));
          dispatch(testSuccess());
          dispatch(testisSuccess());
        } else {
          alert('Some error occured');

          dispatch(testShow(false));
          dispatch(testSuccess());
          dispatch(testisSuccess());
        }
      });

    dispatch(showQuizModal(false));
    // dispatch(testShow(false));

    dispatch(showQuizModal(false));
  };
  // dispatch(testShow(false));

  console.log('sub', quizData);
  return (
    <form className="quiz-body" onSubmit={submitQuizHandler} id="quiz">
      <div className="quiz-bodyQuestionForm">
        <MultiStepForm activeStep={active}>
          {quizData &&
            quizData.questions &&
            quizData.questions.map((ele, i) => {
              return (
                <div key={i}>
                  <Step label={i}>
                    <div className="quiz-questionNum">
                      {' '}
                      Question {i + 1} of {quizData.questions.length}
                    </div>

                    <div className="quiz-question">{ele.questionName}</div>
                    <div className="quiz-options">
                      <div className="quiz-eachOption">
                        <input
                          type="radio"
                          name={`Id${ele.questionId}`}
                          value={ele.option_1}
                          id="accent"
                        />
                        <label htmlFor="accent" className="quiz-eachOptionBox">
                          {ele.option_1}
                        </label>
                        <label
                          htmlFor="accent"
                          className="quiz-accentLabel"
                        ></label>
                      </div>
                      <div className="quiz-eachOption">
                        <input
                          type="radio"
                          name={`Id${ele.questionId}`}
                          value={ele.option_2}
                          id="accent"
                        />
                        <label htmlFor="accent" className="quiz-eachOptionBox">
                          {ele.option_2}
                        </label>
                        <label
                          htmlFor="accent"
                          className="quiz-accentLabel"
                        ></label>
                      </div>
                      <div className="quiz-eachOption">
                        <input
                          type="radio"
                          name={`Id${ele.questionId}`}
                          value={ele.option_3}
                          id="accent"
                        />
                        <label htmlFor="accent" className="quiz-eachOptionBox">
                          {ele.option_3}
                        </label>
                        <label
                          htmlFor="accent"
                          className="quiz-accentLabel"
                        ></label>
                      </div>
                      <div className="quiz-eachOption">
                        <input
                          type="radio"
                          name={`Id${ele.questionId}`}
                          value={ele.option_4}
                          id="accent"
                        />
                        <label htmlFor="accent" className="quiz-eachOptionBox">
                          {ele.option_4}
                        </label>
                        <label
                          htmlFor="accent"
                          className="quiz-accentLabel"
                        ></label>
                      </div>
                    </div>
                  </Step>
                </div>
              );
            })}
        </MultiStepForm>
      </div>
      {quizData && (
        <div className="quiz-footer">
          <div className="quiz-footerText">
            <div className="quiz-footerChapter">
              Chapter {quizData.chapterNumber}
            </div>
            <div className="quiz-footerChapterTitle">
              {quizData.chapterName}
            </div>
          </div>
          <div className="quiz-buttons">
            <button
              onClick={() => setActive(active - 1)}
              disabled={active === 1}
              type="button"
            >
              <img
                src={require('../../../assets/icons/previousIcon.png')}
                alt="previous"
              />
            </button>

            <button
              type="button"
              onClick={() => setActive(active + 1)}
              style={{ float: 'right' }}
              className={
                active === (quizData.questions && quizData.questions.length)
                  ? 'quiz-buttonsSubmit'
                  : ''
              }
              disabled={
                active === (quizData.questions && quizData.questions.length)
              }
            >
              {active === (quizData.questions && quizData.questions.length) ? (
                <span
                  onClick={() => {
                    dispatch(showQuizModal(true));
                  }}
                >
                  submit
                </span>
              ) : (
                <img
                  src={require('../../../assets/icons/nextIcon.png')}
                  alt="next"
                ></img>
              )}
            </button>
          </div>
        </div>
      )}
      <QuizModal time={0} />
      {loading && <Loading />}
    </form>
  );
};

export default QuizBody;
