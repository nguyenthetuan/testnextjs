/*
 * File: undefined
 * Desc:
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-20 00:40:05
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { fetchFirstToken, fetchListResumes, signOut } from '../actions/auth';
import { fetchConstants, fetchCategories, fetchCities } from '../actions/constants';
import { Base, MenuBar, SideBar, Footer, AuthPopup, Button } from '../components';
import { deleteRemberAuthData, getRememberAuthData, saveRememberAuthData } from '../utils/localData';
import './style.scss';

export default function(ComposedComponent, isSearchPage = false, isMenu = true) {
  class Layout extends Base {
    constructor(props) {
      super(props);
      this._pinSideBar = true;
    }

    componentDidMount() {
      window.addEventListener('beforeunload', this._onBeforeUnload);
      window.addEventListener('storage', this._onLocalStorageChange);

      if (!this.props.firstToken) {
        this.props.fetchFirstToken();
      } else {
        this.props.fetchConstants();
        this.props.fetchCities();
        this.props.fetchCategories();
      }

      if (this.props.isLoggedIn) {
        this.props.fetchListResumes();
      }
      document.body.removeAttribute('class');
      document.body.classList.add(ComposedComponent.wrapperClasses);
    }

    componentWillUnmount() {
      window.removeEventListener('beforeunload', this._onBeforeUnload);
      window.removeEventListener('storage', this._onLocalStorageChange);
    }

    _onLocalStorageChange = () => {
      const data = getRememberAuthData();
      if (data && data.signedout) {
        this.props.signOut(true);
      } else if (data === null || !data.token || !data.info) {
        const { token, info } = this.props.authInfo;
        saveRememberAuthData({ token, info, rememberPassword: false });
      }
    };

    _onBeforeUnload = () => {
      const data = getRememberAuthData();
      if (data && !data.rememberPassword) {
        deleteRemberAuthData();
      }
    };

    render() {
      const { isLoggedIn, requiredAuth, showSidebar, constants, locations, categories } = this.props;
      if (!isLoggedIn && requiredAuth) {
        return <Redirect to={{ pathname: '/', state: { showLoginPopup: requiredAuth } }} />;
      }

      return (
        <div id="app_wrapper">
          {isMenu && <MenuBar />}
          <section id="content_outer_wrapper">
            <div id="content_wrapper" className={(showSidebar ? ['has-sidebar'] : []).join(' ')}>
              {showSidebar && <SideBar />}
              <div className="main-content">
                {(constants.message && constants.message.code) || (locations.message && locations.message.code) || (categories.message && categories.message.code) ? (
                  <div className="error-connect">
                    {this.t('Có lỗi kết nối với máy chủ. Vui lòng ')}
                    <Button
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      {this.t('thử lại')}
                    </Button>
                  </div>
                ) : (
                  <ComposedComponent {...this.props} />
                )}
              </div>
            </div>
          </section>
          {!isSearchPage && <Footer />}
          <AuthPopup />
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    firstToken: state.firstToken,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.info,
    constants: state.constants,
    locations: state.locations,
    categories: state.categories,
    authInfo: state.auth
  });

  return withRouter(
    connect(
      mapStateToProps,
      { fetchFirstToken, fetchConstants, fetchCategories, fetchCities, fetchListResumes, signOut }
    )(Layout)
  );
}
