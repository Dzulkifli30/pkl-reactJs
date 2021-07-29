let ulrport="http://localhost:8000/";//"http://10.242.11.101:8082/"
let ulrportRefresh="http://localhost:8000/";//"http://10.242.11.101:8081/";
 //let ulrport="http://36.89.25.220:15002/"

 export const urlPostLogin=ulrport+'vuser/showUser'

 //provinsi
export const urlProv=ulrport+'provinsi/getProvinsi'
export const urlDeleteProv=ulrport+'provinsi/delete/'
export const urlAddProv=ulrport+'provinsi/storeProv'
export const urlEditProv=ulrport+'provinsi/updateProv'

 //Kabupaten
 export const urlKab=ulrport+'kabupaten/getKabupaten'
//  export const urlDeleteProv=ulrport+'kabupaten/delete/'
 export const urlAddKab=ulrport+'kabupaten/storeKab'
 export const urlEditKab=ulrport+'kabupaten/updateKab'

 //Kecamatan
 export const urlKec=ulrport+'kecamatan/getKecamatan'
 export const urlAddKec=ulrport+'kecamatan/storeKec'
 export const urlEditKec=ulrport+'kecamatan/updateKec'


