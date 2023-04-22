import React, { useEffect, useState } from 'react';
import './Header.css';
import {
  bellIcon,
  closeIcon,
  closeProfile,
  design,
  filterIcon,
  graduationCapIcon,
  headerLogo,
  logoutIcon,
  profileIcon,
  searchIcon,
  settingsIcon,
} from '../../../utils/svgIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  editProfileSection,
  headerProfile,
  modalFilter,
  notificationSection,
  privacySection,
  profileDrawer,
  profileSection,
  settingsSection,
  termsSection,
} from '../../../redux/reducers/headerProfileOptions';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Profile from './profile/Profile';
import Settings from './settings/Settings';
import PrivacyPolicy from './privacypolicy/PrivacyPolicy';
import Terms from './terms/Terms';
import Notification from './notification/Notification';
import { searchFocus } from '../../../redux/reducers/headerProfileOptions';
import EditProfile from './edit-profile/EditProfile';
import ChangePassword from './changePassword/ChangePassword';
import { useNavigate } from 'react-router-dom';
import filter, {
  clearFilter,
  removeChapterCount,
  removefilter,
  setChapterCount,
  setfilter,
} from '../../../redux/reducers/filter';
import Loading from '../../../utils/loading/Loading';
import axios from 'axios';
import { courseOverview } from '../../../redux/reducers/courseOverview';
import { chapterResponse } from '../../../redux/reducers/chapterResponses';
import { NotifyClick } from '../../../redux/reducers/NotificationsData';
import { MobileNotifyClick } from '../../../redux/reducers/MobileNotification';
import { ProfileClick } from '../../../redux/reducers/EditProfileData';
import { testSuccessRed } from '../../../redux/reducers/SuccessTestRed';
import { testSuccess } from '../../../redux/reducers/Conditions';
import { showSuccessPage } from '../../../redux/reducers/showSuccesspage';
import { testisSuccess } from '../../../redux/reducers/testSlice';
import { finaltestShowPage } from '../../../redux/reducers/finalTestSuccess';

const Header = () => {
  const [onChange, setOnChange] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topSearch, setTopSearch] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [searchedCourse, setSearchedCourse] = useState([]);
  const [profileData1, setprofileData] = useState<any>({});
  const [courseFromSearch, setCourseFromSearch] = useState([]);

  const navigate = useNavigate();

  const filterData = useSelector((state: any) => state.filter.value);
  const profileData = useSelector((state: any) => state.MobileNotifyClick.data);
  useEffect(() => {
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/topSearches`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log("Top Search", res);
        setTopSearch(res);
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/categoriesWP`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setTopCategories(res);
      });
  }, []);

  useEffect(() => {
    dispatch(MobileNotifyClick());
  }, []);

  // console.log("profile data", profileData);

  const Duration = [
    { start: 0, end: 5 },
    { start: 5, end: 10 },
    { start: 10, end: 20 },
    { start: 20, end: 30 },
    { start: 30, end: 40 },
    { start: 50 },
  ];

  const [notifydata, setnotifydata] = useState(false);
  const handleProfileClick = () => {
    dispatch(profileDrawer(true));
    dispatch(headerProfile(false));
    dispatch(profileSection(true));
    dispatch(ProfileClick());
  };

  const handleCloseDrawer = () => {
    dispatch(profileDrawer(false));
    dispatch(headerProfile(false));
    setLeftdrawer(false);
  };

  const handleCloseDrawerMobile = () => {
    setLeftdrawer(false);
  };

  const handlenotify = () => {
    dispatch(profileDrawer(true));
    dispatch(headerProfile(false));
    dispatch(profileSection(false));
    dispatch(notificationSection(true));
    dispatch(settingsSection(false));
    dispatch(NotifyClick());
  };

  const handleSetting = () => {
    dispatch(profileDrawer(true));
    dispatch(profileSection(false));
    dispatch(notificationSection(false));
    dispatch(headerProfile(false));
    dispatch(settingsSection(true));
  };

  const dispatch = useDispatch();
  const headerOptions = useSelector((state: any) => state.headerProfile.value);

  const searchFieldFocus = useSelector(
    (state: any) => state.headerProfile.searchFocused
  );
  const profileDrawerState = useSelector(
    (state: any) => state.headerProfile.drawer
  );
  const profileSectionState = useSelector(
    (state: any) => state.headerProfile.profile
  );
  const notificationSectionState = useSelector(
    (state: any) => state.headerProfile.notification
  );
  const settingsSectionState = useSelector(
    (state: any) => state.headerProfile.settings
  );
  const modalFilterStatus = useSelector(
    (state: any) => state.headerProfile.filterModal
  );

  const changeHandler = (e: any) => {
    setOnChange(e.target.value);
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/search?searchKey=${e.target.value}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('response', res);
        setCourseFromSearch(res);

        const arrA = JSON.parse(sessionStorage.getItem('filter') || '[]');
        const arrB = res;
        console.log('arr ', arrA);
        let intersection =
          arrA && arrA.length > 0
            ? arrA.filter((a: any) =>
                arrB.some((b: any) => a.courseId === b.courseId)
              )
            : res;
        setSearchedCourse(intersection);
        console.log('arr intersection', intersection);
      });
  };

  const toggleMobileHeader = () => {
    setArrow(true);
    dispatch(searchFocus(true));
  };
  const closeMobileHeader = () => {
    setArrow(false);
    dispatch(searchFocus(false));
  };

  const handleMobileDrawer = () => {
    setLeftdrawer(true);
    dispatch(NotifyClick());
  };

  const [arrow, setArrow] = useState(false);
  const [leftdrawer, setLeftdrawer] = useState(false);

  //filter logic

  //filter logic
  const filterHandler = () => {
    setLoading(true);
    setShowFilter(true);
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/applyFilter`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
        body: JSON.stringify(filterData),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // setSearchedCourse(res);
        dispatch(modalFilter(false));
        setLoading(false);
        //here changed
        sessionStorage.setItem('filter', JSON.stringify(res));

        const arrA = res;
        const arrB = courseFromSearch;
        console.log('arr ', arrA);
        let intersection =
          arrA && arrA.length > 0
            ? arrA.filter((a: any) =>
                arrB.some((b: any) => a.courseId === b.courseId)
              )
            : courseFromSearch;
        setSearchedCourse(intersection);
        console.log('arr intersection filter', intersection);
        //here changed
      })
      .catch((err) => {
        setSearchedCourse([]);
        setLoading(false);
        dispatch(modalFilter(false));
      });
  };

  const topSearchKeyword = (keyword: string) => {
    setLoading(true);
    setShowFilter(true);
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/searchByKeyword?keyword=${keyword}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchedCourse(res);
        setLoading(false);
      })
      .catch((err) => {
        setSearchedCourse([]);
        setLoading(false);
      });
  };

  const categorySearch = (catId: any) => {
    setLoading(true);
    setShowFilter(true);
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/allCoursesOfCategory?categoryId=${catId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('category', res);
        setSearchedCourse(res);
        setLoading(false);
      })
      .catch((err) => {
        setSearchedCourse([]);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="header-parent">
        <div
          className={searchFieldFocus ? 'header headerSearchFocus' : 'header'}
        >
          <div
            className="header-logo"
            onClick={() => {
              navigate('/');
            }}
          >
            {headerLogo}
          </div>
          {arrow ? (
            <img
              className="mobile-logo"
              src={require('../../../assets/images/right_arrow.png')}
              alt=""
              onClick={closeMobileHeader}
            />
          ) : (
            <img
              className="mobile-logo"
              src={require('../../../assets/images/burger-mobile-icon.png')}
              alt=""
              onClick={handleMobileDrawer}
            />
          )}
          <form
            className="header-search"
            onSubmit={(e: any) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              className={
                searchFieldFocus
                  ? 'header-searchField header-searchFieldPadding'
                  : 'header-searchField'
              }
              placeholder="Search"
              onFocus={() => {
                dispatch(searchFocus(true));
              }}
              onChange={changeHandler}
              value={onChange}
            />
            {!searchFieldFocus && (
              <div className="header-searchIcon">{searchIcon}</div>
            )}
            {searchFieldFocus && (
              <button className="header-searchIconButton">{searchIcon}</button>
            )}
          </form>

          {!searchFieldFocus ? (
            <>
              <div className="header-options">
                <div className="header-optionsBell" onClick={handlenotify}>
                  {bellIcon}
                </div>
                <div className="header-settings" onClick={handleSetting}>
                  {settingsIcon}
                </div>
                <div className="header-profilePic">
                  <img
                    src={
                      profileData &&
                      profileData.data &&
                      profileData.data.profilePhoto
                        ? profileData.data.profilePhoto
                        : require('../../../assets/images/start-courses-image/profilepic.jpg')
                    }
                    alt="Profile Pic"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      dispatch(headerProfile(!headerOptions));
                    }}
                  />
                  {headerOptions && (
                    <div
                      className="header-profileOptions"
                      onClick={(e: any) => {
                        e.stopPropagation();
                      }}
                    >
                      <div
                        className="header-profileOption header-profileOptionBorder"
                        onClick={() => {
                          dispatch(testSuccess(false));
                          dispatch(testisSuccess());
                          dispatch(testSuccessRed(false));
                          dispatch(showSuccessPage(false));
                          dispatch(finaltestShowPage(false));
                          navigate('/myCourses');
                        }}
                      >
                        <div className="header-profileOptionIcon">
                          {graduationCapIcon}
                        </div>
                        <div className="header-profileOptiontext">
                          My Course
                        </div>
                      </div>

                      <div
                        className="header-profileOption  header-profileOptionBorder"
                        onClick={handleProfileClick}
                      >
                        <div className="header-profileOptionIcon">
                          {profileIcon}
                        </div>
                        <div className="header-profileOptiontext">
                          My Profile
                        </div>
                      </div>

                      <div
                        className="header-profileOption"
                        onClick={() => {
                          sessionStorage.clear();
                          window.location.reload();
                        }}
                      >
                        <div className="header-profileOptionIcon">
                          {logoutIcon}
                        </div>
                        <div className="header-profileOptiontext">Logout</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="mobile-search"
                style={{ filter: 'invert(1)' }}
                onClick={toggleMobileHeader}
              >
                {searchIcon}
              </div>
            </>
          ) : (
            <div className="header-options">
              {searchFieldFocus && (
                <button
                  className="header-filterButton"
                  onClick={() => {
                    dispatch(modalFilter(true));
                  }}
                >
                  {filterIcon}
                </button>
              )}
              <div
                onClick={() => {
                  dispatch(searchFocus(false));
                  setShowFilter(false);
                }}
                className="header-optionsCloseIcon"
              >
                {closeProfile}
              </div>
            </div>
          )}
          {searchFieldFocus && (
            <div className="header-categoryContents">
              <div className="mobile-form-with-filter">
                <form
                  className="mobile-header-search"
                  onSubmit={(e: any) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="text"
                    className={
                      searchFieldFocus
                        ? 'header-searchField header-searchFieldPadding'
                        : 'header-searchField'
                    }
                    placeholder="Search"
                    onFocus={() => {
                      dispatch(searchFocus(true));
                    }}
                    onChange={changeHandler}
                  />
                  <div className="header-searchIcon">{searchIcon}</div>
                </form>
                <button
                  className="header-filterButton"
                  onClick={() => {
                    dispatch(modalFilter(true));
                  }}
                >
                  {filterIcon}
                </button>
              </div>
              {!(
                (onChange.length > 0 || showFilter) &&
                searchedCourse &&
                searchedCourse.length > 0
              ) ? (
                <>
                  {!(onChange.length > 0 || showFilter) ? (
                    <div className="headerSearchCategoriesTopSearch ">
                      <div className="headerSearchCategoriesTopSearchTitle">
                        Top Search
                      </div>
                      <div className="headerSearchCategoriesTopSearchBody">
                        {topSearch &&
                          topSearch.length > 0 &&
                          topSearch.map((ele: any, i: any) => {
                            return (
                              <div
                                className="headerSearchCategoriesTopSearchesParent headerSearchCategoriesTopSearchesParent-orange"
                                key={i}
                                onClick={() => {
                                  topSearchKeyword(ele.keyWord);
                                }}
                              >
                                <div className="headerSearchCategoriesTopSearchesName">
                                  {ele && ele.keyWord && ele.keyWord}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <div className="headerSearchcategories-nosearchResults">
                      <div
                        className="headerSearchCategoriesTopSearchTitle"
                        style={{ fontSize: '32px' }}
                      >
                        No matching course
                      </div>
                      <div className="headerSearchcategories-TryDiffCourse">
                        Try a different search or browse categories
                      </div>
                    </div>
                  )}
                  <div className="headerSearchCategoriesTopSearch">
                    <div className="headerSearchCategoriesTopSearchTitle">
                      Search from Categories
                    </div>
                    <div className="headerSearchCategoriesTopSearchBody">
                      {topCategories &&
                        topCategories.length > 0 &&
                        topCategories.map((ele: any, i: any) => {
                          return (
                            <div
                              className="headerSearchCategoriesTopSearchesParent"
                              key={i}
                              onClick={() => {
                                categorySearch(ele.categoryId);
                              }}
                            >
                              <div className="headerSearchCategoriesTopSearchesIcon">
                                <img
                                  src={
                                    ele &&
                                    ele.categoryPhoto &&
                                    ele.categoryPhoto
                                  }
                                  // alt={
                                  //   ele && ele.categoryName && ele.categoryName
                                  // }
                                />
                              </div>
                              <div className="headerSearchCategoriesTopSearchesName">
                                {ele && ele.categoryName && ele.categoryName}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="headerSearch-response">
                  {searchedCourse &&
                    searchedCourse.map((ele: any, i: number) => {
                      return (
                        <div
                          className="headersearch-responseBody"
                          key={i}
                          onClick={() => {
                            dispatch(courseOverview(ele.courseId));
                            dispatch(chapterResponse(ele.courseId));
                            navigate('/myCourses/ongoingCourse');
                            dispatch(searchFocus(false));
                            setShowFilter(false);
                          }}
                        >
                          <div className="headerSearch-responsePic">
                            <img src={ele.coursePhoto} />
                          </div>
                          <div className="headerSearch-responseContainer">
                            <div className="headerSearch-responseTitle">
                              {ele.courseName}
                            </div>
                            <div className="headerSearch-responseChapters">
                              {ele.chapterCount} chapters
                            </div>
                            <div className="headerSearch-responseCategory">
                              {ele.categoryName}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {modalFilterStatus && (
        <aside
          className="headerSearch-filterModal"
          // onClick={() => {
          //   dispatch(modalFilter(false));
          // }}
        >
          <div
            className="headerSearch-filterActualModal"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <div className="headerSearch-filterModalBody">
              <div className="headerSearch-filterModalBodyTitle">
                Search Filters
                <div
                  className="headerSearch-filterModalBodyCloseIcon"
                  onClick={() => {
                    dispatch(modalFilter(false));
                  }}
                >
                  {closeIcon}
                </div>
              </div>
              <div className="headerSearch-filterModalCategory">
                {' '}
                <div className="headerSearch-filterModalCategoryTitle">
                  Search from Categories
                </div>
                <div className="headerSearch-filterModalCategoryBody">
                  {topCategories &&
                    topCategories.length > 0 &&
                    topCategories.map((ele: any, i: any) => {
                      return (
                        <div
                          className={
                            filterData.categoryId.includes(ele.categoryId)
                              ? 'headerSearchCategoriesTopSearchesParent headerSearchCategories-chpBorder chipBackgroundYellow'
                              : 'headerSearchCategoriesTopSearchesParent headerSearchCategories-chpBorder '
                          }
                          key={i}
                          onClick={() => {
                            filterData.categoryId.includes(ele.categoryId)
                              ? dispatch(removefilter(ele.categoryId))
                              : dispatch(
                                  setfilter({
                                    catId: ele.categoryId,
                                  })
                                );
                          }}
                        >
                          <div className="headerSearchCategoriesTopSearchesIcon">
                            {' '}
                            <img
                              src={
                                ele && ele.categoryPhoto && ele.categoryPhoto
                              }
                              // alt={ele && ele.categoryName && ele.categoryName}
                            />
                          </div>
                          <div className="headerSearchCategoriesTopSearchesName">
                            {ele && ele.categoryName && ele.categoryName}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="headerSearch-filterModalDuration">
                <div className="headerSearch-filterModalCategoryTitle">
                  Duration
                </div>
                <div className="headerSearch-filterModalCategoryBody">
                  {Duration.map((ele: any, i: any) => {
                    return (
                      <div
                        className={
                          filterData.chapterStartCount.includes(ele.start)
                            ? 'headerSearchCategoriesTopSearchesParent  headerSearchCategories-chpBorder chipBackgroundYellow'
                            : 'headerSearchCategoriesTopSearchesParent  headerSearchCategories-chpBorder'
                        }
                        key={i}
                      >
                        <div
                          className="headerSearchCategoriesTopSearchesName"
                          onClick={() => {
                            filterData.chapterStartCount.includes(ele.start)
                              ? dispatch(
                                  removeChapterCount({
                                    start: ele.start,
                                    end: ele.end,
                                  })
                                )
                              : dispatch(
                                  setChapterCount({
                                    start: ele.start,
                                    end: ele.end,
                                  })
                                );
                          }}
                        >
                          {ele.start}
                          {ele.end ? `/${ele.end}` : '+'} Chapters
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="headerSearch-filterModalButtons">
                <button
                  className="headerSearch-applyFilterButton"
                  onClick={filterHandler}
                >
                  Apply Filter
                </button>
                <button
                  className="headerSearch-clearAllButton"
                  onClick={() => {
                    dispatch(clearFilter());
                    setSearchedCourse(courseFromSearch);
                    sessionStorage.removeItem('filter');
                    dispatch(modalFilter(false));
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>
            {/* <div
              className="headerSearch-filterModalBodyCloseIcon"
              onClick={() => {
                dispatch(modalFilter(false));
              }}
            >
              {closeIcon}
            </div> */}
          </div>
        </aside>
      )}
      {/* </div>
      </div > */}
      <Drawer
        open={profileDrawerState}
        onClose={handleCloseDrawer}
        direction="right"
        enableOverlay={true}
        overlayOpacity={0.7}
        style={{
          width: '25rem',
          zIndex: '9999',
        }}
      >
        {profileSectionState && <Profile />}

        {notificationSectionState && <Notification />}

        {settingsSectionState && <Settings />}

        {/* <Terms /> */}
        {/* <PrivacyPolicy/> */}
        {/* <Terms/> */}
        {/* <EditProfile /> */}
        {/* {
          notifydata ? <Notification /> : <Profile />
        } */}
      </Drawer>
      {/* mobile drawer */}
      <Drawer
        open={leftdrawer}
        onClose={handleCloseDrawer}
        direction="left"
        enableOverlay={true}
        overlayOpacity={0.7}
        style={{
          width: '25rem',
          zIndex: '9999',
        }}
      >
        <div className="left-drawer">
          <div className="left-drawer-header">
            <div className="left-drawer-profile-logo-name">
              <div className="left-drawer-profile-img-frame">
                <img
                  src={
                    profileData &&
                    profileData.data &&
                    profileData.data.profilePhoto
                  }
                  alt=""
                />
              </div>
              <div className="left-drawer-profile-image-name">
                <p className="left-drawer-name">
                  {profileData && profileData.data && profileData.data.fullName}
                </p>
                <p className="left-drawer-role">
                  {' '}
                  {profileData &&
                    profileData.data &&
                    profileData.data.occupation}
                </p>
              </div>
            </div>
          </div>
          <div className="left-drawer-body">
            <div className="left-drawer-links">
              <div
                className="left-drawer-link"
                onClick={() => {
                  navigate('/');
                  dispatch(testisSuccess());
                  dispatch(testSuccessRed(false));
                  dispatch(showSuccessPage(false));
                  dispatch(finaltestShowPage(false));
                  handleCloseDrawerMobile();
                }}
              >
                <img
                  src={require('../../../assets/icons/icn_home_menu-Home.png')}
                  alt=""
                />
                <p>Home</p>
              </div>
              <div
                className="left-drawer-link"
                onClick={() => {
                  navigate('/myCourses');
                  dispatch(testisSuccess());
                  dispatch(testSuccessRed(false));
                  dispatch(showSuccessPage(false));
                  dispatch(finaltestShowPage(false));
                  handleCloseDrawerMobile();
                }}
              >
                <img
                  src={require('../../../assets/icons/icn_course_menu-Briefcase.png')}
                  alt="My Course"
                />
                <p>My Course</p>
              </div>
              <div
                className="left-drawer-link"
                onClick={() => {
                  handleProfileClick();
                  handleCloseDrawerMobile();
                }}
              >
                <img
                  src={require('../../../assets/icons/icn_profile_menu.png')}
                  alt="Profile"
                />
                <p>My Profile</p>
              </div>
              <div
                className="left-drawer-link"
                onClick={() => {
                  handlenotify();
                  handleCloseDrawerMobile();
                  dispatch(NotifyClick());
                }}
              >
                <img
                  src={require('../../../assets/icons/icn_notification_menu.png')}
                  alt="Notifications"
                />
                <p>Notifications</p>
                {profileData &&
                profileData.data &&
                profileData.data.notificationCount > 0 ? (
                  <span>
                    {profileData &&
                      profileData.data &&
                      profileData.data.notificationCount}
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div
                className="left-drawer-link"
                onClick={() => {
                  handleSetting();
                  handleCloseDrawerMobile();
                }}
              >
                <img
                  src={require('../../../assets/icons/icn_settings_menu-Settings.png')}
                  alt="Settings"
                />
                <p>Settings</p>
              </div>
              <div
                className="left-drawer-link"
                onClick={() => {
                  handleCloseDrawerMobile();
                  sessionStorage.clear();
                  window.location.reload();
                }}
              >
                <img
                  src={require('../../../assets/icons/icn_logout_menu-Power buttom.png')}
                  alt="Logout"
                />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
        <p onClick={handleCloseDrawer} className="left-drawer-close">
          X
        </p>
      </Drawer>
      {loading && <Loading />}
    </>
  );
};

export default Header;
