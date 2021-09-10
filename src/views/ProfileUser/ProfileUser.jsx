import React from "react"
import { ModalComponent } from 'components';
import ProfileAddModi from "./components/ProfileUserAddModi";
import Swal from "sweetalert2";
import Popup from 'reactjs-popup'
import ProfileF from './components/ProfileF'
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
    DialogContent
} from '@material-ui/core';
const ProfileUser = () => {
    let periods = JSON.parse(localStorage.getItem("Period"));

    const [rowSelect, setRowSelect] = React.useState({})
    rowSelect.id = localStorage.getItem('id')
    let retrievedData = localStorage.getItem("Form Rt");
    let retrievedDatas = localStorage.getItem("Period");

const getLocal = () =>{
    let rts =JSON.parse(retrievedData);
    let periods =JSON.parse(retrievedDatas);
    if (rowSelect.id == localStorage.getItem("id")) {
        
      return  <p>{periods[0].nama_rt}</p>

    }
    console.log("Rt anda adalah",rts[0].nama_rt)
    
}
// const handleParam = (getLocal) => {
//     console.log("enak",getLocal())
    
// }


    return (
        <div className=" justify-center text-center mb-96  bg-indigo-700  ">
            <Card>
                <CardHeader
                    subheader=""
                    title={
                        <div className="  font-poppins ">
                            <p className="text-center">{localStorage.getItem("NamaLengkap")}</p>
                            {getLocal}
                        </div>
                    }
                />
                <Divider />
                <CardContent className="bg-indigo-900 text-white">
                    <DialogContent>
                        Tugas anda Berada di Wilayah
                    </DialogContent>
                    <Grid
                        container
                        spacing={0}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <DialogContent>
                                Provinsi : {periods[0].nama_provinsi}
                            </DialogContent>

                            <DialogContent>
                                Kecamatan : {periods[0].nama_kecamatan}
                            </DialogContent>

                            <DialogContent>
                                Rw : {periods[0].nama_rw}
                            </DialogContent>

                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <DialogContent>
                                Kabupaten : {periods[0].nama_kabupaten}
                            </DialogContent>

                            <DialogContent>
                                Kelurahan : {periods[0].nama_kelurahan}
                            </DialogContent>

                            <DialogContent>
                                Rt : {periods[0].nama_rt}
                            </DialogContent>

                        </Grid>
                        {/* <Popup trigger={<button className="btn btn-md bg-green-700 mt-2 ">Lihat Daerah Tugas Anda</button>}>
                    <ProfileF
                    />
                </Popup> */}
                    </Grid>
                </CardContent>
                <Popup trigger={<button className="btn btn-md bg-green-700 mt-2 ">Ubah ProfileUser</button>}>
                    <ProfileAddModi
                        rowSelect={rowSelect}
                        setRowSelect={setRowSelect}
                    />
                </Popup>

            </Card>

            {/* <div className="row">
                <div className="col-6-lg">
                    Hi
                </div>
                <div className="col-6-lg">Hi</div>
            </div> */}
        </div>


    )
}
export default ProfileUser;