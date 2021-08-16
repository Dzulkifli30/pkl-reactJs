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
  KelurahanList as KelurahanListView,
  KabupatenList as KabupatenListView,
  LaporanKabupaten as LaporanKabupatenView,
  KecamatanList as KecamatanListView,
  ProvinsiList as ProvinsiListView,
  RtList as RtListView,
  RwList as RwListView,
  VuserList as VuserListView,
  LaporanKecamatan as LaporanKecamatanView,
  LaporanPerKabupaten as LaporanPerKabupatenView,
  LaporanPerKecamatan as LaporanPerKecamatanView,
  LaporanProvID as LaporanProvIDView,
  LaporanPerProv as LaporanPerProvView,
  LaporanKelurahan as LaporanKelurahanView,
  LaporanPerKelurahan as LaporanPerKelurahanView,
  SettingList as SettingListView,
  KelompokDataList as KelompokDataListView


} from './views';

const Routes=() => {

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
        component={SettingListView}
        exact
        layout={MainLayout}
        path="/setting"
      />
      <RouteWithLayout
        component={KelompokDataListView}
        exact
        layout={MainLayout}
        path="/kelompok-data"
      />


    {/* Beginning Of Input Data */}
      <RouteWithLayout
        component={VuserListView}
        exact
        layout={MainLayout}
        path="/vusertable"
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
        component={KelurahanListView}
        exact
        layout={MainLayout}
        path="/kelurahan"
      />
        <RouteWithLayout
        component={RtListView}
        exact
        layout={MainLayout}
        path="/rt"
      />
            <RouteWithLayout
        component={RwListView}
        exact
        layout={MainLayout}
        path="/rw"
      />
   
       {/*End Of Input Data  */}


      {/* Beginning of Laporan */}

      <RouteWithLayout
        component={LaporanProvIDView}
        exact
        layout={MainLayout}
        path="/laporan/provinsiID"
      />

      <RouteWithLayout
        component={LaporanPerProvView}
        exact
        layout={MainLayout}
        path="/laporan/perProvTable"
      />
      <RouteWithLayout
        component={LaporanKabupatenView}
        exact
        layout={MainLayout}
        path="/laporan-kabupaten"
      />
      <RouteWithLayout
        component={LaporanPerKabupatenView}
        exact
        layout={MainLayout}
        path="/laporan-per-kabupaten"
      />
        <RouteWithLayout
        component={LaporanPerKecamatanView}
        exact
        layout={MainLayout}
        path="/laporan-per-kecamatan"
      />
      <RouteWithLayout
        component={LaporanKecamatanView}
        exact
        layout={MainLayout}
        path="/laporan-kecamatan"
      />
      <RouteWithLayout
        component={LaporanKelurahanView}
        exact
        layout={MainLayout}
        path="/laporan-kelurahan"
      />
      <RouteWithLayout
        component={LaporanPerKelurahanView}
        exact
        layout={MainLayout}
        path="/laporan-perkelurahan"
      />
      {/* Ennding */}

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