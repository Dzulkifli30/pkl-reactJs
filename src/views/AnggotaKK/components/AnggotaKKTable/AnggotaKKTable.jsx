import React, { useState } from 'react';
//import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SearchInput } from 'components';
import axios from 'axios';
import { urlDeleteProv } from 'kumpulanUrl';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/styles';
import DataTable from 'react-data-table-component';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TableSortLabel
} from '@material-ui/core';

import { getInitials } from 'helpers';
import { red } from '@material-ui/core/colors';
import { async } from 'validate.js';
import Add from '@material-ui/icons/Add';

const useStyles=makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    //    minWidth: 1050
    minWidth: '100%'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }, importButton: {
    marginRight: theme.spacing(1)
  },
}));
const AnggotaKKTable=props => {

  
  const {
    handleOpenViewMap,
    datas,
    className,handleDelete,
    textfind,Vuserfind,
    order, orderBy, SettingVuser,
    VuserExport, filteredItems, handleOpen, selectedVuser,
    setSelectedVuser,
    anggotaKK_params,
    handleClose,
    AnggotaKK,
    Export,
    convertArrayOfObjectsToCSV,
    downloadCSV

    , ...rest }=props;

  const [filterText, setFilterText]=React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle]=React.useState(false);
  const classes=useStyles();

  const [rowsPerPage, setRowsPerPage]=useState(10);
  const [page, setPage]=useState(0);




  const customStyles={
    header: {
      style: {
        minHeight: '10px',
        borderTopStyle: 'hidden',
        borderTopWidth: '0',
        borderTopsColor: 'ffffff',

      },
    },
    rows: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '000000',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '000000',
        minWidth: '98%',
        marginLeft: '7px', // override the cell padding for head cells
        //paddingRight: '3px',
        width: '98%',
        minHeight: '30px', // override the row height

      },

    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '000000',
        //alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBott0mColor: '000000',
        width: '98%',

        marginLeft: '7px', // override the cell padding for head cells
        //paddingRight: '3px',

        minHeight: '30px', // override the row height

      },
      //height: '30px',
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {

          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: '000000',
          //marginLeft: '3px', // override the cell padding for head cells
          //          marginRight: '3px',
          minHeight: '30px', // override the row heigh
        },

        ':last-of-type': {
          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: '000000',

          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '000000',
          minHeight: '30px', // override the row heigh

        },
        //textAlign: 'center',
        justifyContent: 'center',

        //alignItems: 'center',


      },

    },
    cells: {
      style: {
        '&:not(:last-of-type)': {

          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: '000000',
          //marginLeft: '3px', // override the cell padding for head cells
          //          marginRight: '3px',
          minHeight: '30px', // override the row heigh
        },

        ':last-of-type': {
          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: '000000',

          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '000000',
          minHeight: '30px', // override the row heigh

        }




      },

    },
  };

  const columns=[

    {
      name: 'Periode Sensus',
      selector: 'periode_sensus',
      sortable: true,
    },
    {
      name: 'NIK ',
      selector: 'NIK',
      sortable: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: 'jenis_kelamin',
      sortable: true,
    },
    {
      name: 'Tempat Lahir',
      selector: 'tempat_lahir',
      sortable: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: 'tanggal_lahir',
      sortable: true,
    },
    {
      name: 'Agama',
      selector: 'agama',
      sortable: true,
    },
    {
      name: 'Pendidikan',
      selector: 'pendidikan',
      sortable: true,
    },    {
      name: 'Jenis Pekerjaan',
      selector: 'jenis_pekerjaan',
      sortable: true,
    },
    {
      name: 'Status Nikah',
      selector: 'status_nikah',
      sortable: true,
    },
    {
      name: 'Tanggal Pernikahan',
      selector: 'tanggal_pernikahan',
      sortable: true,
    },
    {
      name: 'Status Dalam Keluarga',
      selector: 'status_dalam_keluarga',
      sortable: true,
    },
    {
      name: 'Kewarganegaraan',
      selector: 'kewarganegaraan',
      sortable: true,
    },
    {
      name: 'Nomor Paspor',
      selector: 'no_paspor',
      sortable: true,
    },    {
      name: 'Nomor Katas',
      selector: 'no_katas',
      sortable: true,
    },    {
      name: 'Nama Ayah',
      selector: 'nama_ayah',
      sortable: true,
    },    {
      name: 'Nama Ibu',
      selector: 'nama_ibu',
      sortable: true,
    },

    {
      name: 'CreatedBy',
      selector: 'create_by',
      sortable: true,
    },
  ];
  // const filteredItems=Vuser.filter(item => item.nama_Vuser&&item.nama_Vuser.toLowerCase().includes(filterText.toLowerCase()));
  const subHeaderComponentMemo=React.useMemo(() => {
    const handleClear=() => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return <div class="form-group">
      <div class="col-md-6">
          <Button filteredItems={filteredItems} color="primary" onClick={(e) => downloadCSV(e, [])}>
          <img src="/img/xls.jpeg" />
        </Button>

        <button className=" btn btn-md " onClick={(e) => handleOpen(e,[],"Tambah Anggota KK")}>
          <AddIcon/>
        </button>

      </div>

      <div class="col-md-6">
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Vuser"
          textfind={textfind}
        />
      </div>
    </div>



      ;
  }, [filteredItems, filterText, resetPaginationToggle]);





  /*  if (localStorage.getItem('accessId')!=="2") {
      return <Redirect to='/beranda' />;
    }
  */

  const handleSelectAll=event => {

    //const { groups }=props;
    //setSelectedUsers
    let selectedVuser_var;

    if (event.target.checked) {
      selectedVuser_var=Vuser.map(Vuser => Vuser.id);
    } else {
      selectedVuser_var=[];
    }

    setSelectedVuser(selectedVuser_var);
  };

  const handleSelectOne=(event, id) => {

    const selectedIndex=selectedVuser.indexOf(id);
    let newSelectedVuser=[];

    if (selectedIndex===-1) {
      newSelectedVuser=newSelectedVuser.concat(selectedVuser, id);
    } else if (selectedIndex===0) {
      newSelectedVuser=newSelectedVuser.concat(selectedVuser.slice(1));
    } else if (selectedIndex===selectedVuser.length-1) {
      newSelectedVuser=newSelectedVuser.concat(selectedVuser.slice(0, -1));
    } else if (selectedIndex>0) {
      newSelectedVuser=newSelectedVuser.concat(
        selectedVuser.slice(0, selectedIndex),
        selectedVuser.slice(selectedIndex+1)
      );
    }

    setSelectedVuser(newSelectedVuser);
    //console.log(selectedUsers);
  };

  const handlePageChange=(event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange=event => {
    setRowsPerPage(event.target.value);
  };
  //  const filteredItems=Vuser;
  //const actionsMemo=React.useMemo(() => <Export onExport={() => downloadCSV()} />, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)
      
      }
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>

          <div className={classes.inner}>
            <DataTable
              title=""
              customStyles={customStyles}
              columns={columns}
              data={filteredItems}
              keyField=""
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              selectableRows
              persistTableHead
              dense
            />


          </div>


        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

AnggotaKKTable.propTypes={
  className: PropTypes.string,
  filteredItems: PropTypes.array.isRequired
};

export default AnggotaKKTable;
