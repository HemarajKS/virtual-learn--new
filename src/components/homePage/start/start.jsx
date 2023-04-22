import React, { useState, useEffect, useRef } from 'react';
import 'react-slideshow-image/dist/styles.css';
import 'react-tabs/style/react-tabs.css';
import './Start.css';
import {
  design,
  start_pauseIcon,
  start_timeIcon,
} from '../../../utils/svgIcons';
import Carousel from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  homeTabToggleState,
  tabToggleState,
} from '../../../redux/reducers/myCourseReducer';
import axios from 'axios';
import { coursedata } from '../../../redux/reducers/allcourseSlice';
import { categorydata } from '../../../redux/reducers/categorySlice';
import { useNavigate } from 'react-router-dom';
import { testShow, testSuccess } from '../../../redux/reducers/Conditions';
import { testisSuccess } from '../../../redux/reducers/testSlice';
import { testSuccessRed } from '../../../redux/reducers/SuccessTestRed';
import { showSuccessPage } from '../../../redux/reducers/showSuccesspage';
import { finaltestShowPage } from '../../../redux/reducers/finalTestSuccess';
import {
  basicCourse,
  categoryName,
} from './../../../redux/reducers/basicCourses';
import { advancedCourse } from './../../../redux/reducers/advancedCourse';
import { subCategories } from './../../../redux/reducers/subCategories';
import { courseOverview } from '../../../redux/reducers/courseOverview';
import { chapterResponse } from '../../../redux/reducers/chapterResponses';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import Carousel from "react-elastic-carousel";
// import Slider from "react-slick"
// import Slider from 'react-slick'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { headerCarousel } from '../../../redux/reducers/HomeCarouseldata';

const Start = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(testShow(false));
    dispatch(testSuccess(false));
    dispatch(testisSuccess());
    dispatch(testSuccessRed(false));
    dispatch(showSuccessPage(false));
    dispatch(finaltestShowPage(false));
  }, []);

  const homeTabState = useSelector((state) => state.mycourse.hometab);

  const handleTabClick = (id) => {
    // console.log(id);
    dispatch(homeTabToggleState(id));
  };

  const [headerdata1, setheaderdata] = useState([]);
  const [allcourseData, setallcourseData] = useState([]);
  const [popular, setpopular] = useState([]);
  const [newestData, setnewestData] = useState([]);
  const [topcourseData, setTopcourseData] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [name, setName] = useState('');

  const headerdata = useSelector((state) => state.headerCarousel.data);

  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/ongoingCourses`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setOngoing(res && res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // console.log('ongoing data', ongoing);

  //Fetching api for slider

  useEffect(() => {
    dispatch(headerCarousel());
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/home/course`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setheaderdata(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // console.log('headerdata', headerdata);

  //fetching data for all course

  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/home/course/all`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setallcourseData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  dispatch(coursedata(allcourseData));
  // console.log('allcoursedata', allcourseData);

  //fetching data for popular courses
  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/home/course/popular`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setpopular(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //fetching data for newest courses

  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/home/course/newest`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setnewestData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //fetching api for top courses

  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/home/course/category`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setTopcourseData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // fetching data for categories

  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/categoriesWP`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setcategoryData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/menu`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        setName(res.data.fullName);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // console.log(categoryData);
  dispatch(categorydata(categoryData));

  return (

    <div className="start">
      <div className="start-greeting">Hello!</div>
      <div className="start-username">{name}</div>

      <div className="webslider">
        <Slider
          autoplay={true}
          autoplaySpeed={2000}
          slidesToShow={3}
          dots={true}
          slidesToScroll={1}
          infinite={true}
        >
          {headerdata &&
            headerdata.data &&
            headerdata.data.slice(0,6).map((item) => (
              <div
                className="start-image-title"
                onClick={() => {
                  dispatch(courseOverview(item.courseId));
                  dispatch(chapterResponse(item.courseId));
                  navigate("/myCourses/ongoingCourse");
                }}
              >
                <div className="start-map-image">
                  <img src={item.coursePhoto} alt="" />
                </div>
                <div className="start-course-overlay-header"></div>
                <div className="start-title-text">{item.courseName}</div>
              </div>
            ))}
        </Slider>
      </div>

      <div className="mobileSlider">
        {headerdata && headerdata.data && (
          <Carousel autoplay={true} autoplaySpeed={2000} slidesToShow={3}>
            {headerdata.data.map((item) => (
              <div
                className="start-image-title"
                onClick={() => {
                  dispatch(courseOverview(item.courseId));
                  dispatch(chapterResponse(item.courseId));
                  navigate("/myCourses/ongoingCourse");
                }}
              >
                <div className="start-map-image">
                  <img src={item.coursePhoto} alt="" />
                </div>
                <div className="start-course-overlay-header"></div>
                <div className="start-title-text">{item.courseName}</div>
              </div>
            ))}
          </Carousel>
        )}
      </div>

      {ongoing && ongoing.length > 0 && (
        <>
          <div className="start-course-section2-first">
            <div className="start-ongoing-courses">Ongoing courses</div>
            <div
              className="start-seeall"
              onClick={() => {
                navigate("myCourses");
              }}
            >
              See All
            </div>
          </div>

          <div className="start-card2">
            <div className="start-course1">
              {ongoing.length > 0 &&
                ongoing.slice(0, 3).map((item) => (
                  <div
                    className="start-course1-image"
                    onClick={() => {
                      dispatch(courseOverview(item.courseId));
                      dispatch(chapterResponse(item.courseId));
                      dispatch(tabToggleState(2));
                      navigate("/myCourses/ongoingCourse");
                    }}
                  >
                    <div className="start-image-ongoing">
                      <img src={item.coursePhoto} alt="" />
                      <div className="start-image-sub">ongoing</div>
                    </div>
                    <div className="start-course-overlay"></div>
                    <div className="start-title-container">
                      <div className="start-title-chapter">
                        <div className="start-course-section2-title">
                          {item.courseName}
                        </div>
                        <div className="start-course-chapter">
                          {item.completedChapter}/{item.totalChapter} Chapters
                        </div>
                      </div>

                      <button className="start-course-button">Continue</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {categoryData && categoryData.length > 0 && (
        <>
          <div className="start-course-section2">
            <div className="start-ongoing-courses">Categories</div>
            <div
              className="start-seeall"
              onClick={() => {
                navigate("/categories");
              }}
            >
              See All
            </div>
          </div>

          <div className="start-course-categories">
            <div className="start-course-categories-Body">
              {categoryData.length > 0 &&
                categoryData.map((ele) => (
                  <div
                    className="start-course-categories-Parent"
                    onClick={() => {
                      dispatch(categoryName(ele.categoryName));
                      dispatch(
                        basicCourse(`basicCourses?categoryId=${ele.categoryId}`)
                      );
                      dispatch(
                        advancedCourse(
                          `advanceCourses?categoryId=${ele.categoryId}`
                        )
                      );
                      dispatch(
                        subCategories(
                          `subCategoriesWP?categoryId=${ele.categoryId}`
                        )
                      );
                      navigate("/categories/design");
                    }}
                  >
                    <div className="start-course-categories-Icon">
                      <img src={ele.categoryPhoto} alt="" />
                    </div>
                    <div className="start-course-categories-Name">
                      {ele.categoryName}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      <div className="start-course-section2">
        <div className="start-ongoing-courses">Choice your course</div>
        <div
          className="start-seeall"
          onClick={() => {
            navigate("courseChoice");
          }}
        >
          See All
        </div>
      </div>
      <div className="start-choice-course-subcategory">
        <div className="all-tabs-home">
          <div
            className={homeTabState === 1 ? "home-tab-1-active" : "home-tab-1"}
            onClick={() => handleTabClick(1)}
          >
            All
          </div>
          <div
            className={homeTabState === 2 ? "home-tab-1-active" : "home-tab-1"}
            onClick={() => handleTabClick(2)}
          >
            Popular
          </div>
          <div
            className={homeTabState === 3 ? "home-tab-1-active" : "home-tab-1"}
            onClick={() => handleTabClick(3)}
          >
            Newest
          </div>
        </div>
      </div>

      {homeTabState === 1 && (
        <div className="start-card">
          <div className="start-choice1">
            {allcourseData.length > 0 &&
              allcourseData.slice(0, 4).map((item) => (
                <div
                  className="start-choice-subcategory-image"
                  onClick={() => {
                    dispatch(courseOverview(item.courseId));
                    dispatch(chapterResponse(item.courseId));
                    dispatch(tabToggleState(1));
                    navigate("/myCourses/ongoingCourse");
                  }}
                >
                  <div className="start-image-pause">
                    <img src={item.coursePhoto} alt="" />
                    <div className="start-course-overlay-2"></div>

                    <button className="start-designbtn">
                      {item.categoryName}
                    </button>
                  </div>

                  <div className="start-choice-subcategory-title">
                    {item.courseName}
                  </div>
                  <div className="start-choice-chapter">
                    {item.chapterCount} chapters
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {homeTabState === 2 && (
        <div className="start-card">
          <div className="start-choice1">
            {popular.length > 0 ? (
              popular.length > 0 &&
              popular.slice(0, 4).map((item) => (
                <div
                  className="start-choice-subcategory-image"
                  onClick={() => {
                    dispatch(courseOverview(item.courseId));
                    dispatch(chapterResponse(item.courseId));
                    dispatch(tabToggleState(1));
                    navigate("/myCourses/ongoingCourse");
                  }}
                >
                  <div className="start-image-pause">
                    <img src={item.coursePhoto} alt="" />
                    <div className="start-course-overlay-2"></div>

                    <button className="start-designbtn">
                      {item.categoryName}
                    </button>
                  </div>

                  <div className="start-choice-subcategory-title">
                    {item.courseName}
                  </div>
                  <div className="start-choice-chapter">
                    {item.chapterCount} chapters
                  </div>
                </div>
              ))
            ) : (
              <div className="No-popular">No Popular Courses Available</div>
            )}
          </div>
        </div>
      )}
      {homeTabState === 3 && (
        <div className="start-card">
          <div className="start-choice1">
            {newestData.length > 0 ? (
              newestData.length > 0 &&
              newestData.slice(0, 4).map((item) => (
                <div
                  className="start-choice-subcategory-image"
                  onClick={() => {
                    dispatch(courseOverview(item.courseId));
                    dispatch(chapterResponse(item.courseId));
                    dispatch(tabToggleState(1));
                    navigate("/myCourses/ongoingCourse");
                  }}
                >
                  <div className="start-image-pause">
                    <img src={item.coursePhoto} alt="" />
                    <div className="start-course-overlay-2"></div>

                    <button className="start-designbtn">
                      {item.categoryName}
                    </button>
                  </div>

                  <div className="start-choice-subcategory-title">
                    {item.courseName}
                  </div>
                  <div className="start-choice-chapter">
                    {item.chapterCount} chapters
                  </div>
                </div>
              ))
            ) : (
              <div className="No-newest">No New Courses Available</div>
            )}
          </div>
        </div>
      )}
      <div>
        {topcourseData &&
          topcourseData.length > 0 &&
          topcourseData.map((item) => (
            <div>
              <div className="start-course-section2">
                <div className="start-ongoing-courses">
                  Top courses in {item.categoryName}
                </div>
                <div
                  className="start-seeall"
                  onClick={() => {
                    dispatch(categoryName(item.categoryName));
                    dispatch(
                      basicCourse(`basicCourses?categoryId=${item.categoryId}`)
                    );
                    dispatch(
                      advancedCourse(
                        `advanceCourses?categoryId=${item.categoryId}`
                      )
                    );
                    dispatch(
                      subCategories(
                        `subCategories?categoryId=${item.categoryId}`
                      )
                    );
                    navigate("/categories/design");
                  }}
                >
                  See All
                </div>
              </div>

              <div className="start-card">
                <div className="start-choice1">
                  {item.popularCourseInEachCategoryList
                    .slice(0, 4)
                    .map((ele) => (
                      <div
                        className="start-choice-subcategory-image"
                        onClick={() => {
                          dispatch(courseOverview(ele.courseId));
                          dispatch(chapterResponse(ele.courseId));
                          dispatch(tabToggleState(1));
                          navigate("/myCourses/ongoingCourse");
                        }}
                      >
                        <div className="start-image-pause">
                          <div className="start-course-overlay-2"></div>
                          <img src={ele.coursePhoto} alt="" />
                          <div className="start-pauseIcon">
                            {start_pauseIcon}
                          </div>
                        </div>

                        <div className="start-choice-subcategory-title">
                          {ele.courseName}
                        </div>
                        <div className="start-chapter-time">
                          <div className="start-choice-chapter2">
                            {ele.chapterCount} chapters
                          </div>
                          <div className="start-time-icon">
                            {start_timeIcon}
                          </div>
                          {ele.courseDuration}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>

  );
};

export default Start;
