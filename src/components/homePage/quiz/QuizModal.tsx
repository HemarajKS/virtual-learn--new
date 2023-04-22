import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showQuizModal, testShow } from "../../../redux/reducers/Conditions";
import { testisSuccess } from "../../../redux/reducers/testSlice";

import { closeIcon } from "../../../utils/svgIcons";
import "./Quiz.css";

const QuizModal = () => {
  const dispatch = useDispatch();
  const quizModal = useSelector(
    (state: any) => state.loginConditions.quizModal
  );

  return (
    <>
      {quizModal && (
        <aside
          className="headerSearch-filterModal"
          style={{
            alignItems: "center",
            marginTop: "unset",
          }}
        >
          <div
            className="headerSearch-filterActualModal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="headerSearch-filterModalBody">
              <div
                className="headerSearch-filterModalBodyTitle"
                style={{ fontSize: "24px" }}
              >
                Do you want to end the test?
                <div
                  className="headerSearch-filterModalBodyCloseIcon"
                  onClick={(e) => {
                    dispatch(showQuizModal(false));
                  }}
                >
                  {closeIcon}
                </div>
              </div>
              <div className="quizModal-text">
                You still have {sessionStorage.getItem("timer")} seconds
                remaining
                <br />
                <br />
                If you want to check your answer again, press cancel button. If
                you want to end the test and submit your answers you can press
                submit button.
              </div>

              <div className="headerSearch-filterModalButtons">
                <button
                  className="headerSearch-clearAllButton"
                  onClick={() => {
                    dispatch(showQuizModal(false));
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="headerSearch-applyFilterButton"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* <div
              className="headerSearch-filterModalBodyCloseIcon"
              onClick={(e) => {
                dispatch(showQuizModal(false));
              }}
            >
              {closeIcon}
            </div> */}
          </div>
        </aside>
      )}
    </>
  );
};

export default QuizModal;
