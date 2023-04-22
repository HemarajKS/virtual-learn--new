import "./Categories.css";
import React from "react";
import { design } from "../../../../utils/svgIcons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { basicCourse, categoryName } from './../../../../redux/reducers/basicCourses';
import { advancedCourse } from './../../../../redux/reducers/advancedCourse';
import { subCategories } from './../../../../redux/reducers/subCategories';

const Categories = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const obtainedCategories = useSelector(state => state.categorydata.value)





  return (
    <div className="categories-homepage">
      <div className="breadcrumbs-categories">
        <ul className="breadcrumb-categories">
          <li>
            <a href="#">Categories</a>
          </li>
        </ul>
      </div>
      <div className="categories-body">
        <p className="categories-body-choose">
          Please choose a topic on which you want to start a course.
        </p>
        <div className="categories-body-display">
          {obtainedCategories.map((ele, i) => {

            return (<div
              className="categoriesDisplay-home-parent categories-home-chipBorder"
              key={i}
              onClick={() => {
                
                dispatch(categoryName(ele.categoryName))
                dispatch(basicCourse(`basicCourses?categoryId=${ele.categoryId}`))
                dispatch(advancedCourse(`advanceCourses?categoryId=${ele.categoryId}`))
                dispatch(subCategories(`subCategoriesWP?categoryId=${ele.categoryId}`))
                // dispatch(subcatInCategory(ele.categoryId));
                navigate('/categories/design')
              }
              }
            >
              <div className="categories-home-Icons"><img src={ele.categoryPhoto} alt="" /></div>
              <div className="categories-home-Names">{ele.categoryName}</div>
            </div>)
          }
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
