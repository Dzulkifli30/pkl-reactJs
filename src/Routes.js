import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Team as TeamView,
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
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Signout as SignoutView,
  NotFound as NotFoundView,

  ProvinsiList as ProvinsiListView,
  KabupatenList as KabupatenListView,
  KecamatanList as KecamatanListView,
  KelurahanList as KelurahanListView,
  RwList as RwListView,
  RtList as RtListView,

} from './views';

const Routes = () => {

  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/beranda"
      />



      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/beranda"
      />



      <RouteWithLayout
        component={ProvinsiListView}
        exact
        layout={MainLayout}
        path="/provinsi"
      />

    <RouteWithLayout
        component={KabupatenListView}
        exact
        layout={MainLayout}
        path="/kabupaten"
      />
      
      <RouteWithLayout
        component={KecamatanListView}
        exact
        layout={MainLayout}
        path="/kecamatan"
      />
      <RouteWithLayout
        component={VisitorUsers}
        exact
        layout={MainLayout}
        path="/vuser"
      />
      
      <RouteWithLayout
        component={KelurahanListView}
        exact
        layout={MainLayout}
        path="/kelurahan"
      />

      <RouteWithLayout
        component={KabupatenListView}
        exact
        layout={MainLayout}
        path="/kabupaten"
      />

      <RouteWithLayout
        component={KecamatanListView}
        exact
        layout={MainLayout}
        path="/kecamatan"
      />

      <RouteWithLayout
        component={KelurahanListView}
        exact
        layout={MainLayout}
        path="/kelurahan"
      />

      <RouteWithLayout
        component={RwListView}
        exact
        layout={MainLayout}
        path="/rw"
      />

      <RouteWithLayout
        component={RtListView}
        exact
        layout={MainLayout}
        path="/rt"
      />

      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />  
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
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
