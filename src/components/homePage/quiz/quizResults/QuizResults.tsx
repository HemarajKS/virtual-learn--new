import React, { useEffect } from 'react';
import { closeIcon, showAnsIcon } from '../../../../utils/svgIcons';
import './QuizResults.css';
import Drawer from 'react-modern-drawer';
import { useDispatch, useSelector } from 'react-redux';
import { quizAnswer } from '../../../../redux/reducers/result';
import QuizAns from '../quizAnswers/QuizAns';
import { answerHeader } from '../../../../redux/reducers/testAnswerHeader';
import { answer } from '../../../../redux/reducers/testAnswer';
import { testSuccess } from '../../../../redux/reducers/Conditions';
import { useNavigate } from 'react-router-dom';
import { tabToggleState } from '../../../../redux/reducers/myCourseReducer';
import { courseOverview } from '../../../../redux/reducers/courseOverview';
import { chapterResponse } from '../../../../redux/reducers/chapterResponses';

const QuizResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(answerHeader('resultHeader?testId=17'))
    // dispatch(answer('resultAnswers?testId=17'))
    dispatch(testSuccess(false));
    dispatch(testSuccess(false));
  }, []);

  const resultsHeaderData = useSelector(
    (state: any) => state.answerHeader.data
  );
  const resultAnswers = useSelector((state: any) => state.answer.data);
  const courseID = useSelector((state: any) => state.pauseTime.courseID);

  console.log('header data', resultsHeaderData, resultAnswers);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const chapterResponses = useSelector(
    (state: any) => state.chapterResponse.data
  );

  return (
    <div className="quizResults">
      {resultsHeaderData.data && (
        <div className="quizResults-header">
          <div className="quizResults-headerTitle">
            Module Test {resultsHeaderData.data.chapterNumber}
          </div>
          <div
            className="quizResults-closeicon"
            onClick={() => {
              console.log('close', resultsHeaderData);
              dispatch(tabToggleState(2));
              dispatch(
                chapterResponse(
                  chapterResponses &&
                    chapterResponses.data &&
                    chapterResponses.data.courseId &&
                    chapterResponses.data.courseId
                )
              );
              navigate('/myCourses/ongoingCourse');
            }}
          >
            {closeIcon}
          </div>
          <div className="quizResults-headerBody">
            <div className="quizResults-headerBodyResultMarks">
              {resultsHeaderData.data.chapterTestPercentage.toFixed(0)}
            </div>
            <div className="quizResults-headerBodyContents">
              <div className="quizResults-headerBodyContentsChapterName">
                Chapter {resultsHeaderData.data.chapterNumber}:{' '}
                {resultsHeaderData.data.chapterName}
              </div>
              <div className="quizResults-headerBodyContentsUnitName">
                Course: {resultsHeaderData.data.courseName}
              </div>
              <div className="quizResults-headerBodyContentsResults">
                <div className="quizResults-headerBodyContentsResultsBody">
                  <div className="quizResults-headerBodyContentsResultsBodyTitle">
                    Passing Grade
                  </div>
                  <div className="quizResults-headerBodyContentsResultsBodyResult">
                    {resultsHeaderData.data.passingGrade}/100
                  </div>
                </div>
                <div className="quizResults-headerBodyContentsResultsBody">
                  <div className="quizResults-headerBodyContentsResultsBodyTitle">
                    Correct
                  </div>
                  <div className="quizResults-headerBodyContentsResultsBodyResult">
                    {resultsHeaderData.data.correctAnswers}/
                    {resultsHeaderData.data.totalNumberOfQuestions}
                  </div>
                </div>
                <div className="quizResults-headerBodyContentsResultsBody">
                  <div className="quizResults-headerBodyContentsResultsBodyTitle">
                    Wrong
                  </div>
                  <div className="quizResults-headerBodyContentsResultsBodyResult">
                    {resultsHeaderData.data.wrongAnswers}/
                    {resultsHeaderData.data.totalNumberOfQuestions}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {resultAnswers && resultAnswers.data && (
        <div className="quizResults-body">
          <div className="quizResults-bodyListTitle">List of Questions</div>
          <div className="quizResults-bodyList">
            {resultAnswers.data.map((ele: any, i: any) => {
              return (
                <div className="quizResults-bodyListItem" key={i}>
                  <div className="quizResults-bodyListItemContent">
                    <div className="quizResults-bodyListItemContentQuestion">
                      Question {i + 1}
                    </div>
                    <div
                      className={
                        ele.correctAnswer === ele.userAnswer
                          ? 'quizResults-bodyListItemContentAnswer quizResults-bodyListItemContentAnswerGreen'
                          : 'quizResults-bodyListItemContentAnswer quizResults-bodyListItemContentAnswerRed'
                      }
                    >
                      {ele.correctAnswer === ele.userAnswer
                        ? 'Correct Answer'
                        : 'Wrong Answer'}
                    </div>
                  </div>
                  <div
                    className="quizResults-bodyListItemDrawer"
                    onClick={() => {
                      toggleDrawer();
                      dispatch(quizAnswer(ele));
                    }}
                  >
                    {showAnsIcon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="quizDrawerOverlay">
        {' '}
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="quizResults-Drawer"
        >
          <div className="quizResults-DrawerBody">
            <QuizAns />
          </div>
          <div
            className="quizDrawerCloseIcon"
            onClick={() => {
              toggleDrawer();
            }}
          >
            {closeIcon}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default QuizResults;
