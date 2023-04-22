import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { accordianToggleState } from '../../../../redux/reducers/myCourseReducer';
import './Accordian.css'
const Accordian = ({ accId }) => {
    const dispatch = useDispatch();
    const accordianToggle = (id) => {
        // setTabs(id)
        dispatch(accordianToggleState(id))
    }
    const accordianState = useSelector((state) => state.mycourse.accordian)
    return (
        <>
            <div className="course-accordian-heading">
                <div className="course-accordian-container">
                    <p className='course-accordian-container-title'>Chapter 1 - Introduction to the course   </p>
                    <p className='course-accordian-container-state'>
                        {
                            accordianState === accId ? "+" : "-"
                        }
                    </p>
                </div>
            </div>

            {/* <div className="course-accordian-content accordian-show"> */}
            <div className={(accordianState === accId ? "accordian-show" : "") + " course-accordian-content"}>
                <div className="course-accordian-container-body">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas deserunt aperiam, dolorem porro laudantium illum praesentium delectus voluptate. Nobis ullam harum molestiae architecto minus necessitatibus explicabo beatae corporis magni officiis dignissimos dolore cumque voluptates, libero eius laboriosam, nihil nam aut facilis mollitia consequuntur illum est! Harum suscipit assumenda at magnam.</p>
                </div>
            </div>
        </>
    )
}

export default Accordian