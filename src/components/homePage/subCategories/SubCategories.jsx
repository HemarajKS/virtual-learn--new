import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CatSubCategories } from "../../../redux/reducers/CategoriesSubCategories";
import { start_pauseIcon } from "../../../utils/svgIcons";
import { start_timeIcon } from "../../../utils/svgIcons";
import { courseOverview } from "../../../redux/reducers/courseOverview";
import { chapterResponse } from "../../../redux/reducers/chapterResponses";
import './subCategories.css'
import { paginateNext, paginatePrevious } from "../../../redux/reducers/pagination";
import { allCoursePW } from "../../../redux/reducers/AllcoursePW";

const SubCategories = () => {
  const categoriesSubCategoriesdata = useSelector(
    (state) => state.CatSubCategories.data
  );

  const subBasicData = useSelector((state) => state.catSubBasic.data);
  const subAdvanceData = useSelector((state) => state.subCatAdvance.data);
  const allcourseItem = useSelector((state) => state.allcourse.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoriesName = useSelector((state) => state.basicCourse.category);

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

  // console.log(
  //   "categoriesSubCategoriesdata",
  //   categoriesSubCategoriesdata.data[0].categoryName
  // );

  // console.log("dfjkbnj", categoriesSubCategoriesdata);
  return (
    <div className="subCategoryCat">
      <div className="homeCategories-head-link">
        <span>
          <Link
            to="/categories"
            style={{ color: "var(--blueFont)", cursor: "pointer" }}
          >
            Categories &nbsp; &nbsp; {">"} &nbsp;
          </Link>
          &nbsp;
        </span>
        <span>
          <Link
            to="/categories/design"
            style={{ color: "var(--blueFont)", cursor: "pointer" }}
          // onClick={componentUnMount}
          // onClick={dispatch(mycoursetabToggleState(2))}
          >
            {(categoriesSubCategoriesdata &&
              categoriesSubCategoriesdata.data &&
              categoriesSubCategoriesdata.data.length > 0 &&
              categoriesSubCategoriesdata.data[0].categoryName) ||
              categoriesName}
            &nbsp; &nbsp; {">"} &nbsp;
          </Link>
          &nbsp;{" "}
          {categoriesSubCategoriesdata &&
            categoriesSubCategoriesdata.data &&
            categoriesSubCategoriesdata.data.length > 0 &&
            categoriesSubCategoriesdata.data[0].subCategoryName}
        </span>

        {/* {overviewData && overviewData.courseName && overviewData.courseName} */}
      </div>
      <div className='mobileSubcategory'>{categoriesSubCategoriesdata &&
            categoriesSubCategoriesdata.data &&
            categoriesSubCategoriesdata.data.length > 0 &&
            categoriesSubCategoriesdata.data[0].subCategoryName}</div>

      {/* <div className="home-categories-section2">
        <div className="home-categories-courses-started">
          Courses to get you started
        </div>
        <div className="home-categories-seeall"></div>
      </div> */}

      <div className="home-categories-section2">
        <div className="home-categories-courses-started">
          Courses to get you started
        </div>
        <div className="home-categories-seeall"></div>
      </div>
      {subBasicData && subBasicData.data && subBasicData.data.length > 0 ? (
        <div className="home-categories-card">
          <div className="home-categories-choice1">
            {subBasicData &&
              subBasicData.data &&
              subBasicData.data.length > 0 &&
              subBasicData.data.slice(0, 4).map((item) => (
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
                    <div className="homecatTime">{start_timeIcon}</div>
                    {item.courseDuration}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="subcatNocourse">No Courses Avaliable</div>
      )}

      <div className="home-categories-section2">
        <div className="home-categories-courses-started">Featured Courses</div>
        <div className="home-categories-seeall"></div>
      </div>
      {subAdvanceData &&
        subAdvanceData.data &&
        subAdvanceData.data.length > 0 ? (
        <div className="home-categories-card">
          <div className="home-categories-choice1">
            {subAdvanceData &&
              subAdvanceData.data &&
              subAdvanceData.data.slice(0, 4).map((item) => (
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
                    <div className="homecatTime">{start_timeIcon}</div>
                    {item.courseDuration}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="subcatNocourse">No Courses Avaliable</div>
      )}

      <div className="home-categories-section2">
        <div className="home-categories-courses-started"> All Courses</div>
        <div className="home-categories-seeall"></div>
      </div>
      {categoriesSubCategoriesdata &&
        categoriesSubCategoriesdata.data &&
        categoriesSubCategoriesdata.data.length > 0 ? (
        <div className="choice-your-course-card">
          <div className="choice-your-course-choice1">
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
      ) : (
        <div className="subcatNocourse">No Courses Available</div>
      )}

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

export default SubCategories;
