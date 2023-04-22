import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { advancedCourse } from '../../../redux/reducers/advancedCourse';
import {
  basicCourse,
  categoryName,
} from '../../../redux/reducers/basicCourses';
import { subCategories } from '../../../redux/reducers/subCategories';
import { design } from '../../../utils/svgIcons';

const EmptyCourse = () => {
  const [Categories, setcategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        setcategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="mycourse-body">
      <div className="mycourse-emptyImg-section">
        <div className="mycourse-imgSection">
          <img
            src={require('../../../assets/images/start-courses-image/img_my-course_empty.png')}
            alt=""
          />
        </div>
        <div className="mycourse-imgText">
          <p>What will you learn first?</p>
        </div>
        <div className="mycourse-Desc">
          <p>Your courses will go here</p>
        </div>
      </div>
      <div className="mycourse-categoriesSection">
        <div className="categories-heading">
          <p>Categories</p>
        </div>
        <div className="categories-eachCategories">
          {Categories.map((ele: any, i) => {
            return (
              <div
                className="categoriesDisplay-parent categories-chipBorder"
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
                  navigate('/categories/design');
                }}
              >
                <div className="categoriesDisplay-Icons">
                  {' '}
                  <img src={ele.categoryPhoto} alt="" />
                </div>
                <div className="categoriesDisplay-Names">
                  {ele.categoryName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmptyCourse;
