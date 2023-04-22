import React, { useState, useEffect } from "react";
import { start_pauseIcon } from "../../../utils/svgIcons";
import { start_timeIcon } from "../../../utils/svgIcons";

import axios from "axios";
import "./HomeCategoriesDesign.css";
import { useDispatch, useSelector } from "react-redux";
import { basicCourse } from "./../../../redux/reducers/basicCourses";
import { subCategories } from "./../../../redux/reducers/subCategories";
import { homeCategory_sideArrow } from "../../../utils/svgIcons";
import { courseOverview } from "../../../redux/reducers/courseOverview";
import { chapterResponse } from "../../../redux/reducers/chapterResponses";
import { Link, useNavigate } from "react-router-dom";
import { allCoursePW } from "../../../redux/reducers/AllcoursePW";
import {
  paginateNext,
  paginatePrevious,
} from "../../../redux/reducers/pagination";
import { CatSubCategories } from "../../../redux/reducers/CategoriesSubCategories";
import { subCatAdvance } from "../../../redux/reducers/catSubadvance";
import { catSubBasic } from "../../../redux/reducers/catSubBasic";

const HomeCategoriesDesign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allcourseItem = useSelector((state) => state.allcourse.value);
  // console.log("all", allcourseItem.length);

  const basicCoursedata = useSelector((state) => state.basicCourse.data);
  const advancedCoursedata = useSelector((state) => state.advancedCourse.data);
  const subCategoriesdata = useSelector((state) => state.subCategories.data);


  const categoryName = useSelector((state) => state.basicCourse.category);

  const pageNum = useSelector((state) => state.pagination.pageNum);

  // console.log("page number", pageNum);

  useEffect(() => {
    dispatch(allCoursePW({ pageNum: pageNum, pageLimit: 4 }));
  }, [pageNum]);

  useEffect(() => {
    dispatch(allCoursePW({ pageNum: pageNum, pageLimit: 4 }));
  }, []);

  const allCoursePagination = useSelector((state) => state.allCoursePW.data);

  // console.log("all course", allCoursePagination)

  return (
    <div className="homecategoriesdesign">
      <div className="homeCategories-head-link">
        {/* <div className='homeCategoriesHead'> Categories </div> */}
        <span>
          <Link
            to="/categories"
            style={{ color: "var(--blueFont)", cursor: "pointer" }}
          >
            Categories &nbsp; &nbsp; {">"} &nbsp;
          </Link>
          &nbsp;
        </span>
        <span style={{ color:'#7A7A7A'}}>{categoryName}</span>
      </div>
      <div className="mobileCategoriesheadLink">{categoryName}</div>
      <div className="home-categories-section2">
        <div className="home-categories-courses-started">
          Courses to get you started
        </div>
        <div className="home-categories-seeall"></div>
      </div>
      <div className="home-categories-card">
        <div className="home-categories-choice1">
          {basicCoursedata &&
            basicCoursedata.data &&
            basicCoursedata.data.slice(0, 4).map((item) => (
              <div
                className="home-categories-subcategory-image"
                onClick={() => {
                  dispatch(courseOverview(item.courseId));
                  dispatch(chapterResponse(item.courseId));
                  navigate("/myCourses/ongoingCourse");
                }}
              >
                <div className="home-categories-image-pause">
                  <div className="home-categories-overlay"></div>
                  <img src={item.coursePhoto} alt="" />
                  <div className="home-categories-pauseIcon">
                    {start_pauseIcon}

                  </div>
                </div>
                <div className="home-categories-subcategory-title">
                  {item.courseName}
                </div>
                <div className="home-categories-time">
                  <div className="home-categories-chapter2">
                    {item.chapterCount} Chapters
                  </div>
                  <div className="startTimeIcon">{start_timeIcon}</div>
                  {item.courseDuration}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="home-categories-section2">
        <div className="home-categories-courses-started">Featured Courses</div>
        <div className="home-categories-seeall"></div>
      </div>
      <div className="home-categories-card">
        <div className="home-categories-choice1">
          {advancedCoursedata &&
            advancedCoursedata.data &&
            advancedCoursedata.data.slice(0, 4).map((item) => (
              <div
                className="home-categories-subcategory-image"
                onClick={() => {
                  dispatch(courseOverview(item.courseId));
                  dispatch(chapterResponse(item.courseId));
                  navigate("/myCourses/ongoingCourse");
                }}
              >
                <div className="home-categories-image-pause">
                  <div className="home-categories-overlay"></div>
                  <img src={item.coursePhoto} alt="" />
                  <div className="home-categories-pauseIcon">
                    {start_pauseIcon}
                  </div>
                </div>
                <div className="home-categories-subcategory-title">
                  {item.courseName}
                </div>
                <div className="home-categories-time">
                  <div >
                    {item.chapterCount} Chapters
                  </div>
                  <div className="homecatTime">{start_timeIcon}</div>
                  {item.courseDuration}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="home-categories-section2">
        <div className="home-categories-courses-started">Subcategories</div>
        <div className="home-categories-seeall"></div>
      </div>
      <div className="home-categories">
        <div className="home-categories-Body">
          {subCategoriesdata &&
            subCategoriesdata.data &&
            subCategoriesdata.data.map((ele, i) => {
              return (
                <div className="home-categories-Parent" key={i}
                  onClick={() => {
                    dispatch(CatSubCategories(ele.subCategoryId));
                    dispatch(subCatAdvance(ele.subCategoryId));
                    dispatch(catSubBasic(ele.subCategoryId));
                    navigate("/subcategories");
                  }}>
                  {/* <div className="start-course-categories-Icon">
          {design}
        </div> */}
                  <div className="home-categories-Name">
                    {ele.subCategoryName}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="home-categories-section2">
        <div className="home-categories-courses-started">All Courses</div>
        <div className="home-categories-seeall"></div>
      </div>
      <div className="home-categories-card-allcourse">
        <div className="home-categories-choice1-allcourse">
          {allCoursePagination &&
            allCoursePagination.data &&
            allCoursePagination.data.length > 0 &&
            allCoursePagination.data.map((item) => (
              <div
                className="home-categories-subcategory-allcourse-image"
                onClick={() => {
                  dispatch(courseOverview(item.courseId));
                  dispatch(chapterResponse(item.courseId));
                  navigate("/myCourses/ongoingCourse");
                }}
              >
                <div className="home-categories-image-allcourse-pause">
                  <img src={item.coursePhoto} alt="" />
                  <div className="home-categories-overlay-allcourse"></div>
                </div>
                <div className="home-categories-allcourse-ttlchapbtn">
                  <div className="home-categories-subcategory-allcourse-title">
                    {item.courseName}
                  </div>
                  <div className="home-categories-allcourse-titleBtn">
                    <div className="home-categories-allcourse-chapter">
                      {item.chapterCount} Chapters
                    </div>
                    <button className="home-categories-allcourse-designbtn">
                      {item.categoryName}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {allCoursePagination && allCoursePagination.data && allCoursePagination.data.length > 0 && (
        <div className="paginationBtns">
          <button
            onClick={() => {
              dispatch(paginatePrevious());
            }}
            disabled={pageNum <= 1}
          >
            {/* <img
                src={require("../../../assets/icons/previousIcon.png")}
                alt="previous"
              /> */}
            <i class="fa-solid fa-caret-left"></i>
          </button>
          &nbsp;{pageNum} &nbsp;
          <button
            onClick={() => {
              dispatch(paginateNext());
            }}
            disabled={
              Math.ceil(
                allcourseItem && allcourseItem.length / 4
              ) <= pageNum
            }
          >
            {/* <img
                  src={require("../../../assets/icons/nextIcon.png")}
                  alt="next"
                ></img> */}
            <i class="fa-solid fa-caret-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeCategoriesDesign;
