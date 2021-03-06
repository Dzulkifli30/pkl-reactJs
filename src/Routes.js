import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  MinimalUser as MinimalUserLayout,
} from './layouts';

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
  LaporanSensusPerKelurahan as LaporanSensusPerKelurahanView,
  LaporanSensusPerKecamatan as LaporanSensusPerKecamatanView,
  SettingList as SettingListView,
  KelompokDataList as KelompokDataListView,
  LaporanSensusIDList as LaporanSensusIDView,
  TargetKkList as TargetKkListView,
  LaporanSensusPerKab as LaporanSensusPerKabVIew,
  LaporanSensusPerProv as LaporanSensusPerProvView,
  Profile as ProfileView,
  UserAccessSurveyList as UserAccessSurveyListView,
  LaporanTargetRealisasiID as LaporanTargetRealisasiIDView,
  LaporanTargetRealisasiPerprov as LaporanTargetRealisasiPerprovView,
  LaporanTargetRealisasiPerkab as LaporanTargetRealisasiPerkabView,
  LaporanKbId as LaporanKbIdView,
  LaporanKbPerProv as LaporanKbProvView,
  LaporanKbPerkab as LaporanKbKabView,



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
        to="/beranda"
      /> : <Redirect
        exact
        from="/"
        to="/login"
      />}


      <RouteWithLayout
        component={SettingListView}
        exact
        layout={MainLayout}
        path="/setting"
      />
      <RouteWithLayout
        component={ProfileView}
        exact
        layout={MainLayout}
        path="/profile"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={KelompokDataListView}
        exact
        layout={MainLayout}
        path="/kelompok-data"
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
      <RouteWithLayout
        component={TargetKkListView}
        exact
        layout={MainLayout}
        path="/target-kk"
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
      <RouteWithLayout
        component={UserAccessSurveyListView}
        exact
        layout={MainLayout}
        path="/user-access-survey"
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

      {/* Ending */}

      {/* Beginning Laporan Sensus */}
      <RouteWithLayout
        component={LaporanSensusIDView}
        exact
        layout={MainLayout}
        path="/laporan-sensus-indonesia"
      />
      <RouteWithLayout
        component={LaporanSensusPerKabVIew}
        exact
        layout={MainLayout}
        path="/laporan-sensus-perkab"
      />
      <RouteWithLayout
        component={LaporanSensusPerProvView}
        exact
        layout={MainLayout}
        path="/laporan-sensus-perprov"
      />
      <RouteWithLayout
        component={LaporanSensusPerKelurahanView}
        exact
        layout={MainLayout}
        path="/laporan-sensus-perkelurahan"
      />
      <RouteWithLayout
        component={LaporanSensusPerKecamatanView}
        exact
        layout={MainLayout}
        path="/laporan-sensus-perkecamatan"
      />
      {/* Ending */}

      {/* Beginning Target Realisasi */}
      <RouteWithLayout
        component={LaporanTargetRealisasiIDView}
        exact
        layout={MainLayout}
        path="/target-realisasi-id"
      />
      <RouteWithLayout
        component={LaporanTargetRealisasiPerprovView}
        exact
        layout={MainLayout}
        path="/target-realisasi-perprov"
      />
      <RouteWithLayout
        component={LaporanTargetRealisasiPerkabView}
        exact
        layout={MainLayout}
        path="/target-realisasi-perkab"
      />

      <RouteWithLayout
        component={LaporanKbIdView}
        exact
        layout={MainLayout}
        path="/laporan-alatKb-id"
      />
      <RouteWithLayout
        component={LaporanKbProvView}
        exact
        layout={MainLayout}
        path="/laporan-alatKb-prov"
      />
        <RouteWithLayout
        component={LaporanKbKabView}
        exact
        layout={MainLayout}
        path="/laporan-alatKb-kab"
      />

      {/* Ending */}

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