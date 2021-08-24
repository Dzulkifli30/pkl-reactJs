import React from "react"
import { ModalComponent } from 'components';
import ProfileAddModi from "./components/ProfileAddModi";
import Swal from "sweetalert2";
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
const Profile = () => {


    const [rowSelect,setRowSelect] = React.useState({})
    rowSelect.id = localStorage.getItem('id')

    return (
        <div className=" justify-center text-center mb-96  bg-indigo-700  ">
            <Card>
                <CardHeader
                    subheader=""
                    title={localStorage.getItem("username")}
                />
                <Divider />
                <CardContent className="bg-blue-700">
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
                                Nomor Induk : {localStorage.getItem('NIK')}



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


                        </Grid>
                    </Grid>
                </CardContent>

                <ProfileAddModi
                rowSelect={rowSelect}
                setRowSelect={setRowSelect}
                />

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
export default Profile;