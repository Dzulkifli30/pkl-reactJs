import React, { createRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import DataTable from 'react-data-table-component';
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
import L from 'leaflet';
import axios from 'axios';
import { urlAddProv, urlEditProv, urlU, urlUbahPassword } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
import Swal from 'sweetalert2';

let form_rt = JSON.parse(localStorage.getItem("form rt"));
const useStyles = makeStyles(theme => ({
    root: {},
    buttonSuccess: {
        color: theme.palette.white,
        backgroundColor: theme.palette.green,
        '&:hover': {
            backgroundColor: '#4caf50',
            borderColor: '#66bb6a',
            boxShadow: 'none',
        },
    },
    buttonCancel: {
        color: theme.palette.white,
        backgroundColor: theme.palette.red,
        '&:hover': {
            backgroundColor: '#f44336',
            borderColor: '#ef5350',
            boxShadow: 'none',
        },
    },
}));

const ProfileTugas = props => {
    const { className, setData, getDataBackend, getMockData, setRowSelect, rowSelect, title, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({});
    const [getStatus, setStatus] = useState([]);
    const [getKeyId, setKeyId] = useState([]);
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    const close = () => {
        getDataBackend();
    }
    ///  const mapRef=createRef();

    const columns = [
        {
            name: 'Nama Provinsi',
            selector: 'nama_provinsi',
            sortable: true,
        },
        {
            name: 'Nama Kabupaten',
            selector: 'nama_kabupaten',
            sortable: true,
        },
        {
            name: 'Nama Kecamatan',
            selector: 'nama_kecamatan',
            sortable: true,
        },
        {
            name: 'Nama Kelurahan',
            selector: 'nama_kelurahan',
            sortable: true,
        },
        {
            name: 'Nama Rw',
            selector: 'nama_rw',
            sortable: true,
        },
        {
            name: 'Nama Rt',
            selector: 'nama_rt',
            sortable: true,
            cell: () => (
                form_rt.map(option => (
                    <div>{option.nama_rt},</div>
                  ))
            ),
        },
    ];

    //  const position=[currentLocation.lat, currentLocation.lng]

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
    <button
                className="btn btn-md bg-red-600 text-white"
                onClick={() => {
                    getDataBackend();
                }}
            >
                X
            </button>
            <CardContent
                className="bg-indigo-900 text-white"
            >
                
                <DialogContent>
                    Tugas anda Berada di
                </DialogContent>
                <DataTable
                    columns={columns}
                    data={setData}
                />
                
            </CardContent>
        </Card>
    );
};

ProfileTugas.propTypes = {
    className: PropTypes.string,
};

export default ProfileTugas;