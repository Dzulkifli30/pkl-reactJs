import React from "react"
import { ModalComponent } from 'components';
import ProfileAddModi from "./components/ProfileUserAddModi";
import ProfileTugas from "./components/ProfileTugas";
import Swal from "sweetalert2";
import Popup from 'reactjs-popup'
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
    let wilayah = JSON.parse(localStorage.getItem("nama wilayah"));
    let rt = JSON.parse(localStorage.getItem("form rt"));

    const [rowSelect, setRowSelect] = React.useState({})
    const [open, setOpen]=React.useState(false);

    const handleOpen=(e) => {
        setOpen(true);
    };
    const handleClose=(e) => {
        setOpen(false);
    };
    rowSelect.id = localStorage.getItem('id')
    function popupComponen(componenPopup) {
        return (
            <ModalComponent
                open={open} ComponenAddModi={componenPopup} setData={wilayah} getDataBackend={handleClose}>
            </ModalComponent>
        )
      }

    return (
        <div className=" justify-center text-center mb-96  bg-indigo-700  ">
            <Card>
                <CardHeader
                    subheader=""
                    title={
                        <div className="  font-poppins ">
                            <p className="text-center">{localStorage.getItem("NamaLengkap")}</p>
                        </div>
                    }
                />
                <Divider />
                <CardContent className="bg-indigo-900 text-white">
                    <Grid
                        container
                        spacing={0}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <DialogContent

                            >
                                Username : {localStorage.getItem('username')}



                            </DialogContent>
                            <DialogContent>
                                Nama Lengkap : {localStorage.getItem('NamaLengkap')}
                            </DialogContent>

                            <DialogContent

                            >
                                Provinsi : {wilayah[0].nama_provinsi}



                            </DialogContent>
                            <DialogContent

                            >
                                Kabupaten : {wilayah[0].nama_kabupaten}



                            </DialogContent>
                            <DialogContent

                            >
                                Kecamatan : {wilayah[0].nama_kecamatan}



                            </DialogContent>
                            <DialogContent

                            >
                                Id Rt : {localStorage.getItem('rt')}



                            </DialogContent>

                        </Grid>
                        <Grid
                            item
                            md={3}
                            xs={12}
                        >
                            <DialogContent

                            >
                                Jabatan : {localStorage.getItem('Jabatan')}



                            </DialogContent>
                            <DialogContent

                            >
                                Alamat : {localStorage.getItem('Alamat')}



                            </DialogContent>

                            <DialogContent

                            >
                                Nomor Induk : {localStorage.getItem('NIK')}


                            </DialogContent>

                            <DialogContent

                            >
                                Kelurahan : {wilayah[0].nama_kelurahan}



                            </DialogContent>
                            <DialogContent

                            >
                                Rw : {wilayah[0].nama_rw}



                            </DialogContent>
                            <DialogContent

                            >
                                Rt : {rt[0].nama_rt}



                            </DialogContent>




                        </Grid>
                    </Grid>
                    
                    
                </CardContent>
                <button
                    onClick={handleOpen}
                    className="btn btn-md btn-warning"
                >
                    Tugas anda 
                </button>
                <Popup trigger={<button className="btn btn-md bg-green-700 mt-2 ">Ubah ProfileUser</button>}>
                    <ProfileAddModi
                        rowSelect={rowSelect}
                        setRowSelect={setRowSelect}
                    />
                </Popup>

                {popupComponen(ProfileTugas)}
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