import Header from '../../components/homePage/header/Header'
import CourseCompleted from '../../components/homePage/quiz/courseCompleted/CourseCompleted'
import Quiz from '../../components/homePage/quiz/Quiz'
import QuizResults from '../../components/homePage/quiz/quizResults/QuizResults'
import QuizSuccess from '../../components/homePage/quiz/quizSuccessPage/quizSuccess'

import MyCourse from '../../components/homePage/mycourse/MyCourse'
import Categories from '../../components/homePage/start/categories/Categories'
import './HomePage.css'
import ChoiceYourCourse from './../../components/homePage/choiceYour-course/ChoiceYourCourse'
import SubCategories from '../../components/homePage/subCategories/SubCategories'
import HomeCategoriesDesign from '../../components/homePage/homeCategories-design/HomeCategoriesDesign'
import Start from '../../components/homePage/start/start'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'


const HomePage = () => {

  return (
    <div className="homePage">
      <div className="homePageNavbar">
        <Header />
      </div>
      <div className="homePageBody">
        {/* <Start /> */}
        {/* <ChoiceYourCourse/> */}
        {/* <HomeCategoriesDesign/> */}
        {/* <Start /> */}
        {/* <Quiz /> */}
        {/* <QuizResults /> */}
        {/* <CourseCompleted /> */}
        {/* <MyCourse /> */}
        {/* <Categories /> */}
        {/* <SubCategories /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage
