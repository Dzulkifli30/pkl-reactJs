import React from "react"
import { ModalComponent } from 'components';
import ProfileAddModi from "./components/ProfileUserAddModi";
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


    const [rowSelect, setRowSelect] = React.useState({})
    rowSelect.id = localStorage.getItem('id')

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
                                Provinsi : {localStorage.getItem('nama_provinsi')}



                            </DialogContent>
                            <DialogContent

                            >
                                Kabupaten : {localStorage.getItem('nama_kabupaten')}



                            </DialogContent>
                            <DialogContent

                            >
                                Kecamatan : {localStorage.getItem('nama_kecamatan')}



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
                                Kelurahan : {localStorage.getItem('nama_kelurahan')}



                            </DialogContent>
                            <DialogContent

                            >
                                Rw : {localStorage.getItem('nama_rw')}



                            </DialogContent>
                            <DialogContent

                            >
                                Rt : {localStorage.getItem('nama_rt')}



                            </DialogContent>




                        </Grid>
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