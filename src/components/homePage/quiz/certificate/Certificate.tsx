import React from 'react'
import './Certificate.css'
import { useDispatch, useSelector } from 'react-redux'
import { showCertificate } from '../../../../redux/reducers/Conditions'
import { closeIcon, downloadIcon } from '../../../../utils/svgIcons'
import { saveAs } from 'file-saver'

const Certificate = (props: any) => {
  const dispatch = useDispatch()
  const showCert = useSelector((state: any) => state.loginConditions.quizModal)
  console.log('cerificate url', props)

  const downloadImage = () => {
    saveAs(props.certificate, props.name)
  }
  return (
    <>
      {' '}
      {showCert && (
        <aside
          className="headerSearch-filterModal certificate-modalOverlay"
          style={{
            alignItems: 'center',
            marginTop: 'unset',
          }}
        >
          <div
            className="headerSearch-filterActualModal"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="certificate-header">
              <div className="certificate-headerTitle">Course Certificate</div>
              <button
                className="certificate-headerDownload"
                onClick={downloadImage}
              >
                {downloadIcon}{' '}
              </button>
            </div>
            <div className="certificate">
              <img src={props.certificate} alt="Certificate" />
            </div>
            <div
              className="headerSearch-filterModalBodyCloseIcon certificate-closeIcon"
              onClick={(e) => {
                dispatch(showCertificate(false))
              }}
              style={{
                position: 'fixed',
                display: 'block',
                top: '100px',
                right: '80px',
                filter: 'invert(1)',
              }}
            >
              {closeIcon}
            </div>
          </div>
        </aside>
      )}
    </>
  )
}

export default Certificate
