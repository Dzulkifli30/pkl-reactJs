import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  MinimalUser as MinimalUserLayout,
  MainUser as MainUserLayout,
} from './layouts';

import {
  Team as TeamView,
  UserSignIn as UserSignInView,
  ContactUs as ContactUsView,
  Portfolio as PortfolioView,
  Services as ServicesView,
  AboutUs as AboutUsView,
  Dashboard as DashboardView,
  KabKotaList as KabKotaListView,
  ProductList as ProductListView,
  GroupList as GroupListView,
  Typography as TypographyView,
  Icons as IconsView,
  VisitorUser as VisitorUsers,
  SignUp as SignUpView,
  Signout as SignoutView,
  NotFound as NotFoundView,
  FormSurvey as FormSurveyView,
  ProfileUser as ProfileUserView,



} from './views';

const Routes = () => {

  return (
    <Switch>
      {/* <Redirect
        exact
        from="/"
        to="/beranda"
      /> */}

      {localStorage.getItem("Username") ? <Redirect
        exact
        from="/"
        to="/beranda-user"
      /> : <Redirect
        exact
        from="/"
        to="/login"
      />}

      <RouteWithLayout
        component={ProfileUserView}
        exact
        layout={MainUserLayout}
        path="/profile-user"
      />
      <RouteWithLayout
        component={UserSignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />

      <RouteWithLayout
        component={FormSurveyView}
        exact
        layout={MainUserLayout}
        path="/form-survey"
      />


      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainUserLayout}
        path="/beranda-user"
      />

      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      {/* <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={UserSignInView}
        exact
        layout={MinimalUserLayout}
        path="/login-user"
      /> */}
      <RouteWithLayout
        component={SignoutView}
        exact
        layout={MinimalLayout}
        path="/logout"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>

  );
};

export default Routes;