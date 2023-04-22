import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Completed.css';
import Certificate from '../../quiz/certificate/Certificate';
import { useDispatch } from 'react-redux';
import { showCertificate } from '../../../../redux/reducers/Conditions';
import { courseOverview } from '../../../../redux/reducers/courseOverview';
import { chapterResponse } from '../../../../redux/reducers/chapterResponses';
import { tabToggleState } from '../../../../redux/reducers/myCourseReducer';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
  const [completed, setcompleted] = useState([]);
  const [certificate, setCertificate] = useState();
  const [courseName, setCourseName] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/completedCourses`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setcompleted(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // console.log(completed);
  return (
    <>
      {completed && completed.length > 0 ? (
        <>
          <div className="completed-section">
            {completed.map((ele, i) => {
              return (
                <div
                  className="completed-parent"
                  key={i}
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    dispatch(courseOverview(ele.courseId));
                    dispatch(chapterResponse(ele.courseId));
                    dispatch(tabToggleState(1));
                    navigate('/myCourses/ongoingCourse');
                  }}
                >
                  <div className="completed-images">
                    <div className="comp-overlay"></div>
                    <img src={ele.coursePhoto} alt="" className="comp-img" />
                    <div className="completed-chap-progress">
                      <p className="completed-text">Completed</p>
                      <div className="completed-chap-descp">
                        <p>{ele && ele.courseName}</p>
                        <p>
                          {ele &&
                            ele.coursePercentage &&
                            ele.coursePercentage.toFixed(2)}
                          % Approval Rate
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn-continue-completed"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(showCertificate(true));
                        setCourseName(ele.courseName);

                        axios
                          .get(
                            `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/pdf?courseId=${ele.courseId}`,
                            {
                              headers: {
                                Authorization: `Bearer ${sessionStorage.getItem(
                                  'Token'
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            res &&
                              res.data &&
                              res.data.certificate &&
                              setCertificate(res.data.certificate);
                          })
                          .catch((err) => {
                            console.error(err);
                          });
                      }}
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {courseName && certificate && (
            <Certificate certificate={certificate} name={courseName} />
          )}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            height: '50vh',
            textAlign: 'center',
            marginTop: '30px',
          }}
        >
          <div className="emptyImageCourse">
            <img
              src={require('../../../../assets/images/start-courses-image/EmptyImage.png')}
              alt=""
            />
          </div>
          No completed courses
        </div>
      )}
    </>
  );
};

export default Completed;

/*

<div className="completed-parent" key={i}>
          <div className="completed-images">
            <img src={ele.image} alt="" className="comp-img" />
            <div className="completed-chap-progress">
              <p className="completed-text">Ongoing</p>
              <div className="completed-chap-descp">
                <p>{ele.title}</p>
                <p>{ele.chapters}</p>
              </div>
            </div>
            <button className="btn-continue-completed">Continue</button>
          </div>
        </div>
*/
