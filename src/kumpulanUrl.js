let ulrport="http://localhost:8000/";
let ulrportRefresh="http://localhost:8000/";
//"http://10.242.11.101:8082/"

//"http://10.242.11.101:8081/";
 //let ulrport="http://36.89.25.220:15002/"


export const urlPostLogin=ulrport+'vuser/showUser'
export const urlGetVuser=ulrport+'vuser/getUser'



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
 export const urlDeleteKec=ulrport+'kecamatan/delete/{id}'
 export const urlLaporanKec=ulrport+'kecamatan/laporanKec'
 export const urlShowPerKec=ulrport+'kecamatan/show-per-kec'


// Kelurahan
export const urlKel = ulrport+'kelurahan/getKelurahan'
export const urlAddKel = ulrport+'kelurahan/storeKel'
export const urlEditKel = ulrport+'kelurahan/updateKel'
export const urlShowKel = ulrport + '/kelurahan/showKel'
export const urlDeleteKel = ulrport+'kelurahan/deleteKel/{id}'

//Kabupaten
export const urlShowKab=ulrport+'kabupaten/showKabupaten'
export const urlShowsKab=ulrport+'kabupaten/showsKabupaten'
 export const urlKab=ulrport+'kabupaten/getKabupaten'
 export const urlDeleteKab=ulrport+'kabupaten/delete/{id}'
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


