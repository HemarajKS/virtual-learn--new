import React, { useEffect, useState } from 'react';
import './MyCourse.css';
import { design } from '../../../utils/svgIcons';
import Ongoing from './ongoing/Ongoing';
import { NavLink, Route, Routes } from 'react-router-dom';
import Completed from './completed/Completed';
import { useSelector, useDispatch } from 'react-redux';
import OngoingOverview from './ongoing-overview/OngoingOverview';
import { mycoursetabToggleState } from '../../../redux/reducers/myCourseReducer';
import EmptyCourse from './EmptyCourse';
import axios from 'axios';

const MyCourse = () => {
  const dispatch = useDispatch();
  const [myCourse, setMyCourse] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/checkMyCourses`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setMyCourse(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const tabState = useSelector((state) => state.mycourse.tab);
  const mycoursetabState = useSelector((state) => state.mycourse.mycoursetab);
  return (
    <div className="mycourse">
      <div className="homeCategories-head-link">My Course</div>
      <div className="mobile-myCourse">
        <p>My Course</p>
      </div>

      {myCourse ? (
        <>
          <div className="mycourse-tabs">
            <div
              className={
                mycoursetabState === 1 ? 'mycourse-tab-active' : 'mycourse-tab'
              }
              onClick={() => dispatch(mycoursetabToggleState(1))}
            >
              Ongoing
            </div>
            <div
              className={
                mycoursetabState === 2 ? 'mycourse-tab-active' : 'mycourse-tab'
              }
              onClick={() => dispatch(mycoursetabToggleState(2))}
            >
              Completed
            </div>
          </div>
          {mycoursetabState === 1 ? <Ongoing /> : <Completed />}
          {/* <OngoingOverview /> */}
        </>
      ) : (
        <EmptyCourse />
      )}
    </div>
  );
};

export default MyCourse;
