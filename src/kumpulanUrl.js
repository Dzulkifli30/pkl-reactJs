let ulrport="http://localhost:8000/";
let ulrportRefresh="http://localhost:8000/";
//"http://10.242.11.101:8082/"

//"http://10.242.11.101:8081/";
 //let ulrport="http://36.89.25.220:15002/"



 // Vuser
export const urlPostLogin=ulrport+'vuser/showUser'
export const urlAddVuser=ulrport+'vuser/storeUser'
export const urlEditVuser=ulrport+'vuser/updateUser'
export const urlUbahPassword=ulrport+'vuser/ubahPassword'
export const urlGetVuser=ulrport+'vuser/getUser'
export const urlDeleteUser=ulrport+'vuser/deleteUser'

// setting
export const urlShowSetting=ulrport+'setting/showSetting'
export const urlAddSetting=ulrport+'setting/storeSetting'
export const urlEditSetting=ulrport+'setting/updateSetting'
export const urlGetSetting=ulrport+'setting/getSetting'
export const urlDeleteSetting=ulrport+'setting/deleteSetting'

// kel data
export const urlShowKelompokData=ulrport+'kelompok-data/showKelompokData'
export const urlAddKelompokData=ulrport+'kelompok-data/storeKelompokData'
export const urlEditKelompokData=ulrport+'kelompok-data/updateKelompokData'
export const urlGetKelompokData=ulrport+'kelompok-data/getKelompokData'
export const urlDeleteKelompokData=ulrport+'kelompok-data/deleteKelompokData'

// targetKK
export const urlShowTargetKk=ulrport+'target-kk/showTargetKk'
export const urlShowTargetKkPerProv=ulrport+'target-kk/showTargetKkPerProv'
export const urlAddTargetKk=ulrport+'target-kk/storeTargetKk'
export const urlEditTargetKk=ulrport+'target-kk/updateTargetKk'
export const urlGetTargetKk=ulrport+'target-kk/getTargetKk'
export const urlDeleteTargetkk=ulrport+'target-kk/deleteTargetKk'

 //provinsi
export const urlProv=ulrport+'provinsi/getProvinsi'
export const urlAddProv=ulrport+'provinsi/storeProv'
export const urlEditProv=ulrport+'provinsi/updateProv'
export const urlDeleteProv= ulrport+ 'provinsi/deleteProv'
export const urlLaporanProv=ulrport+'provinsi/laporanProv'
export const urlLaporanPerProv=ulrport+'provinsi/laporanPerProv'

 //Kecamatan
 export const urlKec=ulrport+'kecamatan/getKecamatan'
 export const urlAddKec=ulrport+'kecamatan/storeKec'
 export const urlEditKec=ulrport+'kecamatan/updateKec'
 export const urlShowKec=ulrport+'kecamatan/showKecamatan'
 export const urlShowKecs=ulrport+'kecamatan/showKecamatans'
 export const urlDeleteKec=ulrport+'kecamatan/deleteKec'
 export const urlLaporanKec=ulrport+'kecamatan/laporanKec'
 export const urlShowPerKec=ulrport+'kecamatan/show-per-kec'


// Kelurahan
export const urlKel = ulrport+'kelurahan/getKelurahan'
export const urlAddKel = ulrport+'kelurahan/storeKel'
export const urlEditKel = ulrport+'kelurahan/updateKel'
export const urlShowKel = ulrport + '/kelurahan/showKel'
export const urlDeleteKel = ulrport+'kelurahan/deleteKel'
export const urlLaporanKel=ulrport+'kelurahan/laporanKel'
export const urlLaporanPerKel=ulrport+'kelurahan/laporanPerKel'

//Kabupaten
export const urlShowKab=ulrport+'kabupaten/showKabupaten'
export const urlShowsKab=ulrport+'kabupaten/showsKabupaten'
 export const urlKab=ulrport+'kabupaten/getKabupaten'
 export const urlDeleteKab=ulrport+'kabupaten/deleteKab'
 export const urlAddKab=ulrport+'kabupaten/storeKab'
 export const urlEditKab=ulrport+'kabupaten/updateKab'
 export const urlLaporanKab=ulrport+'kabupaten/laporanKab'
 export const urlLaporanPerKab=ulrport+'kabupaten/show-per-kab'

 //RW
export const urlShowRw=ulrport+'rw/showRw'
export const urlRw=ulrport+'rw/getRw'
export const urlAddRw=ulrport+'rw/storeRw'
export const urlEditRw=ulrport+'rw/updateRw'
export const urlDeleteRw=ulrport +'rw/deleteRw'

//RT
export const urlShowRt=ulrport+'rt/showRt'
export const urlRt=ulrport+'rt/getRt'
export const urlAddRt=ulrport+'rt/storeRt'
export const urlEditRt=ulrport+'rt/updateRt'
export const urlDeleteRt=ulrport +'rt/deleteRt'

//LaporanSensus
export const urlShowLaporanSensusID=ulrport +'laporan-sensus/indonesia'
export const urlShowLaporanSensusPerProv=ulrport +'laporan-sensus/perprov'
export const urlShowLaporanSensusPerKab=ulrport +'laporan-sensus/perkab'
export const urlShowLaporanSensusPerKec=ulrport +'laporan-sensus/perkec'
export const urlShowLaporanSensusPerKel=ulrport +'laporan-sensus/perkel'

//User Access Survey
export const urlGetUserAccessSurvey = ulrport + '/user-access-survey/get'
export const urlPostLoginUser = ulrport + '/user-access-survey/showUAS'
export const urlAddUserAccessSurvey = ulrport + '/user-access-survey/store'
export const urlEditUserAccessSurvey = ulrport + '/user-access-survey/update'
export const urlDeleteUserAccessSurvey = ulrport + '/user-access-survey/delete'

//KB
export const urlGetKB = ulrport + 'data-kb/getKB'
export const urlUpdateKB = ulrport + 'data-kb/updateKB'
export const urlEditKB = ulrport + 'data-kb/editKB'
export const urlAddKB = ulrport + 'data-kb/addKB'
export const urlDeleteKB = ulrport + 'data-kb/deleteKB'