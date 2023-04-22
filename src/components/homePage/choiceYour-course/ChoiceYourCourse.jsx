import React, { useEffect } from "react";
import { design } from "../../../utils/svgIcons";
import "./choiceYourCourse.css";
import { useDispatch, useSelector } from "react-redux";
import {
  basicCourse,
  categoryName,
} from "./../../../redux/reducers/basicCourses";
import { advancedCourse } from "./../../../redux/reducers/advancedCourse";
import { subCategories } from "./../../../redux/reducers/subCategories";
import { useNavigate } from "react-router-dom";
import { courseOverview } from "../../../redux/reducers/courseOverview";
import { chapterResponse } from "../../../redux/reducers/chapterResponses";
import { allCoursePW } from "../../../redux/reducers/AllcoursePW";
import {
  paginateNext,
  paginatePrevious,
} from "../../../redux/reducers/pagination";

const ChoiceYourCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const obtainedcourse = useSelector((state) => state.allcourse.value);
  const obtainedcategory = useSelector((state) => state.categorydata.value);
  console.log(obtainedcategory);

   const allcourseItem = useSelector((state) => state.allcourse.value);
   console.log("all",allcourseItem.length);

  const pageNum = useSelector((state) => state.pagination.pageNum);

  console.log("page number", pageNum);

  useEffect(() => {
    dispatch(allCoursePW({ pageNum: pageNum, pageLimit: 4 }));
  }, [pageNum]);

  useEffect(() => {
    dispatch(allCoursePW({ pageNum: pageNum, pageLimit: 4 }));
  }, []);

  const allCoursePagination = useSelector((state) => state.allCoursePW.data);

  return (
    <div className="choice-your-course">
      <div className="choice-your-course-heading">Choice your course</div>

      <div className="choice-your-course-categories-title">Categories</div>

      <div className="choice-your-course-categories">
        <div className="choice-your-course-categories-Body">
          {obtainedcategory.map((ele, i) => {
            return (
              <div
                className="choice-your-coursecategories-Parent"
                key={i}
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
                    subCategories(`subCategories?categoryId=${ele.categoryId}`)
                  );
                  navigate("/categories/design");
                }}
              >
                <div className="choice-your-coursecategories-Icon">
                  <img src={ele.categoryPhoto} alt="" />
                </div>
                <div className="choice-your-coursecategories-Name">
                  {ele.categoryName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="choice-your-course-allcourse">All courses</div>
      <div className="choice-your-course-card">
        <div className="choice-your-course-choice1">
          {allCoursePagination &&
            allCoursePagination.data &&
            allCoursePagination.data.length > 0 &&
            allCoursePagination.data.map((item) => (
              <div
                className="choice-your-coursesubcategory-image"
                onClick={() => {
                  dispatch(courseOverview(item.courseId));
                  dispatch(chapterResponse(item.courseId));
                  navigate("/myCourses/ongoingCourse");
                }}
              >
                <img src={item.coursePhoto} alt="" />

                <div className="choiceYourCourse-title-chapter">
                  <div className="choice-your-coursesubcategory-title">
                    {item.courseName}
                  </div>
                  <div className="choice-your-cahpbtn">
                    <div className="choice-your-coursechapter">
                      {item.chapterCount} chapters
                    </div>
                    <button className="choice-yourcourse-designbtn">
                      {item.categoryName}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {allCoursePagination && allCoursePagination.data&& allCoursePagination.data.length > 0 && (
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
                allcourseItem&&allcourseItem.length / 4
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

export default ChoiceYourCourse;
