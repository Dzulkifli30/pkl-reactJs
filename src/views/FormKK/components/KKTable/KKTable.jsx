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
const KKTable=props => {
  const {
    handleOpenViewMap,
    className,handleClose,
    title,KKfind,
    order, orderBy, SettingKK,
    KKExport, filteredItems, handleOpen, selectedKK,
    setSelectedKK,datas,
    Export,setData,
    convertArrayOfObjectsToCSV,
    roles,handleChange

    , ...rest }=props;

  const [filterText, setFilterText]=React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle]=React.useState(false);
  const classes=useStyles();

  const [rowsPerPage, setRowsPerPage]=useState(10);
  const [page, setPage]=useState(0);

  const textfind=() =>{
      title();
  }
  const downloadCSV=() =>{
    roles();
}


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
      name: 'Nomor KK',
      selector: 'NoKK',
      sortable: true,
    },
    {
      name: 'NIK KK',
      selector: 'NIK_KK',
      sortable: true,
    },
    {
      name: 'Nama KK',
      selector: 'nama_kk',
      sortable: true,
    },
    {
      name: 'Alamat KK',
      selector: 'alamat_kk',
      sortable: true,
    },
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
    },    {
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
    },

    {
      name: 'CreatedBy',
      selector: 'create_by',
      sortable: true,
    },
    
    {
      name: 'Created',
      selector: 'create_date',
      sortable: true,
    },
    {
      name: 'LastModified',
      selector: 'update_date',
      sortable: true,
    },
    {
      name: 'LastModifiedBy',
      selector: 'update_by',
      sortable: true,
    },
    {
      button: true,
      cell: row =>
        <Button color="primary"
        disabled={row.Periode_Sensus <= localStorage.getItem('Periode Sensus')}//={row.Periode_Sensus <= localStorage.getItem('Periode Sensus') ? "true" : "false"}
          onClick={(e) => handleOpen(e, row, "Ubah Form Kk ") }  > {row.Periode_Sensus < parseInt(localStorage.getItem('Periode Sensus'))}<EditIcon /></Button>
      ,
    },
    {
      button: true,
      cell: row =>
        <Button color="primary"
          onClick={(e) => handleChange(e,row)} ><DeleteIcon /></Button>
      ,
    },
  ];
  // const filteredItems=KK.filter(item => item.nama_KK&&item.nama_KK.toLowerCase().includes(filterText.toLowerCase()));
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

      </div>

      <div class="col-md-6">
        <SearchInput
          className={classes.searchInput}
          placeholder="Search KK"
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
    let selectedKK_var;

    if (event.target.checked) {
      selectedKK_var=KK.map(KK => KK.id);
    } else {
      selectedKK_var=[];
    }

    setSelectedKK(selectedKK_var);
  };

  const handleSelectOne=(event, id) => {

    const selectedIndex=selectedKK.indexOf(id);
    let newSelectedKK=[];

    if (selectedIndex===-1) {
      newSelectedKK=newSelectedKK.concat(selectedKK, id);
    } else if (selectedIndex===0) {
      newSelectedKK=newSelectedKK.concat(selectedKK.slice(1));
    } else if (selectedIndex===selectedKK.length-1) {
      newSelectedKK=newSelectedKK.concat(selectedKK.slice(0, -1));
    } else if (selectedIndex>0) {
      newSelectedKK=newSelectedKK.concat(
        selectedKK.slice(0, selectedIndex),
        selectedKK.slice(selectedIndex+1)
      );
    }

    setSelectedKK(newSelectedKK);
    //console.log(selectedUsers);
  };

  const handlePageChange=(event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange=event => {
    setRowsPerPage(event.target.value);
  };
  //  const filteredItems=KK;
  //const actionsMemo=React.useMemo(() => <Export onExport={() => downloadCSV()} />, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>

          <div className={classes.inner}>
            <DataTable
              title=""
              customStyles={customStyles}
              columns={columns}
              data={datas}
              keyField="UserName"
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              selectableRows
              persistTableHead
              dense
            />
            <button className="btn btn-md btn-warning mr-10 mt-2 justify-center"
            onClick={handleClose}>
                Tutup
            </button>

          </div>


        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

KKTable.propTypes={
  className: PropTypes.string,
  filteredItems: PropTypes.array.isRequired
};

export default KKTable;
