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
const ProvinsisTable=props => {
  const {
    handleOpenViewMap,
    className,handleDelete,
    textfind,provinsifind,
    order, orderBy, SettingProvinsi,
    provinsisExport, filteredItems, handleOpen, selectedProvinsis,
    setSelectedProvinsis,
    Export,ExportPDF,
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
      name: 'Provinsi ID',
      selector: 'id_provinsi',
      sortable: true,
    },
    {
      name: 'Kode Depdagri',
      selector: 'KodeDepdagri',
      sortable: true,
    },
    {
      name: 'Nama Provinsi',
      selector: 'nama_provinsi',
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: 'IsActive',
      sortable: true,
      cell: row => row.IsActive==1? "Aktiv":"Non Aktiv"
    },
    {
      name: 'CreatedBy',
      selector: 'CreatedBy',
      sortable: true,
    },
    {
      name: 'Created',
      selector: 'Created',
      sortable: true,
    },
    {
      name: 'LastModified',
      selector: 'LastModified',
      sortable: true,
    },
    {
      name: 'LastModifiedBy',
      selector: 'LastModifiedBy',
      sortable: true,
    },
    {
      name: 'Edit Provinsi',
      button: true,
      cell: row =>
        <Button color="primary"
          onClick={(e) => handleOpen(e, row, "Ubah Provinsi")}  ><EditIcon /></Button>
      ,
    },
    {
      name: 'Hapus Provinsi',
      button: true,
      cell: row =>
        <Button color="primary"
          onClick={(e) => handleDelete(e, row, "Hapus Provinsi")} ><DeleteIcon /></Button>
      ,
    }
  ];
  // const filteredItems=provinsis.filter(item => item.nama_provinsi&&item.nama_provinsi.toLowerCase().includes(filterText.toLowerCase()));
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
        <Button filteredItems={filteredItems} color="primary" onClick={() => ExportPDF()}>
          <img src="/img/pdf.jpeg" />
        </Button>
        <Button onClick={(e) => handleOpen(e, [], "Tambahah Provinsi")}>
          <AddIcon/>
        </Button>

      </div>

      <div class="col-md-6">
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Provinsi"
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
    let selectedProvinsis_var;

    if (event.target.checked) {
      selectedProvinsis_var=provinsis.map(provinsi => provinsi.id);
    } else {
      selectedProvinsis_var=[];
    }

    setSelectedProvinsis(selectedProvinsis_var);
  };

  const handleSelectOne=(event, id) => {

    const selectedIndex=selectedProvinsis.indexOf(id);
    let newSelectedProvinsis=[];

    if (selectedIndex===-1) {
      newSelectedProvinsis=newSelectedProvinsis.concat(selectedProvinsis, id);
    } else if (selectedIndex===0) {
      newSelectedProvinsis=newSelectedProvinsis.concat(selectedProvinsis.slice(1));
    } else if (selectedIndex===selectedProvinsis.length-1) {
      newSelectedProvinsis=newSelectedProvinsis.concat(selectedProvinsis.slice(0, -1));
    } else if (selectedIndex>0) {
      newSelectedProvinsis=newSelectedProvinsis.concat(
        selectedProvinsis.slice(0, selectedIndex),
        selectedProvinsis.slice(selectedIndex+1)
      );
    }

    setSelectedProvinsis(newSelectedProvinsis);
    //console.log(selectedUsers);
  };

  const handlePageChange=(event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange=event => {
    setRowsPerPage(event.target.value);
  };
  //  const filteredItems=provinsis;
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
              title="Provinsi List"
              customStyles={customStyles}
              columns={columns}
              data={filteredItems}
              keyField="nama_provinsi"
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

ProvinsisTable.propTypes={
  className: PropTypes.string,
  filteredItems: PropTypes.array.isRequired
};

export default ProvinsisTable;
