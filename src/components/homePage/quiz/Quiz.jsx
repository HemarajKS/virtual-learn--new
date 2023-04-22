import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  showQuizModal,
  testShow,
  testSuccess,
} from '../../../redux/reducers/Conditions';
import { tabToggleState } from '../../../redux/reducers/myCourseReducer';
import { test, testisSuccess } from '../../../redux/reducers/testSlice';

import {
  closeIcon,
  nextIcon,
  previousIcon,
  timerIcon,
} from '../../../utils/svgIcons';
import Timer from '../../../utils/Timer';
import './Quiz.css';
import QuizBody from './QuizBody';
import QuizModal from './QuizModal';

const Quiz = () => {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(false);

  const [time, setTime] = useState(0);

  const quizModal = useSelector((state) => state.loginConditions.quizModal);

  // const renderer = ({ minutes, seconds, completed }) => {
  //   if (completed) {
  //     alert('time up');
  //     return <div>Completed</div>;
  //   } else {
  //     return (
  //       <span>
  //         {minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  // useEffect(() => {
  //   dispatch(test("moduleTest?testId=17"));
  // }, []);

  const testQuestions = useSelector((state) => state.test.data.data);

  console.log(testQuestions);

  return (
    <>
      <div className="quiz">
        <div className="quiz-header">
          <div className="quizHeaderTitle">
            {testQuestions && testQuestions.testName}
          </div>
          <div className="quizHeaderTime">
            <div className="quizHeaderTimeIcon">{timerIcon}</div>
            <div className="quiz-HeaderTimeText">
              <Timer />
              {/* <Countdown
                date={Date.now() + 480000}
                intervalDelay={0}
                precision={3}
                renderer={renderer}
              /> */}
              remaining
            </div>
          </div>
          <div
            className="quiz-HeaderCloseIcon"
            onClick={() => {
              setSkip(true);
            }}
          >
            {closeIcon}
          </div>
        </div>
        <QuizBody />
      </div>
      {skip && (
        <aside
          className="headerSearch-filterModal"
          style={{
            alignItems: 'center',
            marginTop: 'unset',
          }}
        >
          <div
            className="headerSearch-filterActualModal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="headerSearch-filterModalBody">
              <div
                className="headerSearch-filterModalBodyTitle"
                style={{ fontSize: '24px' }}
              >
                Are you sure you want to quit the exam?
              </div>

              <div className="headerSearch-filterModalButtons">
                <button
                  type="button"
                  className="headerSearch-clearAllButton"
                  onClick={() => {
                    setSkip(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="headerSearch-applyFilterButton"
                  onClick={() => {
                    dispatch(testShow(false));
                    dispatch(testSuccess());
                    dispatch(testisSuccess());
                    dispatch(tabToggleState(2))
                  }}
                >
                  Quit
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Quiz;
