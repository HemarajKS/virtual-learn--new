import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showCertificate } from '../../../../redux/reducers/Conditions'
import '../../../../views/onboarding/success_page/Success_Page.css'
import Certificate from '../certificate/Certificate'
const CourseCompleted = () => {
  const dispatch = useDispatch()

  const finalResult = useSelector((state: any) => state.FinalResult.data)

  console.log('final result', finalResult.data)

  return (
    <>
      {finalResult && finalResult.data && (
        <div className="succesContainer">
          <div className="successContent">
            <div className="successImage" style={{ marginBottom: '60px' }}>
              <img
                src={require('../../../../assets/images/img_course complete_illustratipon 1.png')}
                alt="module test success"
              />
            </div>
            <div className="successText">Congratulations!</div>
            <div className="successDesc">
              You have completed the course:
              <span style={{ color: 'var(--black)' }}>
                {' '}
                {finalResult &&
                  finalResult.data &&
                  finalResult.data.congratulations}
              </span>{' '}
              Training with
            </div>
            <div
              style={{
                color: 'var(--correctGreen)',
                marginTop: '20px',
                fontFamily: 'Biko',
                fontSize: '64px',
              }}
            >
              {finalResult &&
                finalResult.data &&
                finalResult.data.approvalRate.toFixed(0)}
              %
            </div>
            <div className="successDesc">Approval Rate</div>
            <div
              className="getStarted"
              style={{ cursor: 'pointer', fontSize: '24px' }}
              onClick={() => {
                dispatch(showCertificate(true))
              }}
            >
              View certificate
            </div>
          </div>
          <Certificate
            certificate={
              finalResult && finalResult.data && finalResult.data.certificateUrl
            }
            name={
              finalResult &&
              finalResult.data &&
              finalResult.data.congratulations
            }
          />
        </div>
      )}
    </>
  )
}

export default CourseCompleted
