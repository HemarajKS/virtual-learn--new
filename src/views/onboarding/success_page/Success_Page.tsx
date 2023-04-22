import React, { useEffect } from 'react'
import './Success_Page.css'
import { success_Image } from '../../../utils/svgIcons'
import { registerSuccess } from '../../../redux/reducers/Conditions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Success_Page = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(registerSuccess(false))
  }, [])
  return (
    <div className="succesContainer">
      <div className="successContent">
        <div className="successImage">{success_Image}</div>
        <div className="successText">Success!</div>
        <div className="successDesc">
          Your VirtualLearn account has been successfully created!
        </div>
        <div
          className="getStarted"
          onClick={() => {
            navigate('/onboarding/personalDetails')
          }}
        >
          Get Started
        </div>
      </div>
    </div>
  )
}

export default Success_Page
