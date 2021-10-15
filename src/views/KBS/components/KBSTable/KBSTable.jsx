import React, { useState } from 'react';
//import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SearchInput } from 'components';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
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
const KBSList=props => {
  const {
    handleOpenViewMap,
    className,handleDelete,
    textfind,kabupatenfind,
    order, orderBy,
    provinsisExport, filteredItems, handleOpen, selectedkabupaten,
    setselectedkabupaten,
    Export,
    convertArrayOfObjectsToCSV,
    downloadCSV,
    AnggotaKK,
    setAnggotaKK

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

  const ExportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "KB";
    const headers = [["NIK", "Alat Kontrasepsi", "Tahun Pemakaian", "Alasan", "Dibuat oleh"]];

    const data = filteredItems.map(elt=> [elt.NIK, elt.alat_kontrasepsi, elt.alasan, elt.CreatedBy]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("KB.pdf")
  }

  const carinama = (paramNIK) => {
    let value = paramNIK
    let result = [];
    // alert(value)
    result = AnggotaKK.filter((entry) => {
      return entry&&entry.NIK &&(entry.NIK === value) 
    });
    // 
    // alert("result = " + result[0])
    // return result[0].nama_anggota
  }
  const alatKB = JSON.parse(localStorage.getItem("Alat Kontrasepsi"));

  const columns=[
    {
      name: 'NIK',
      selector: 'NIK',
      sortable: true,
    },
    {
      name: 'Alat Kontrasepsi',
      selector: 'alat_kontrasepsi',
      sortable: true,
      cell: row =>   {
        return alatKB[row.alat_kontrasepsi].nama  
      }
    },
    {
      name: 'Tahun Pemakaian',
      selector: 'tahun_pemakaian',
      sortable: true,
    },
    {
      name: 'Alasan',
      selector: 'alasan',
      sortable: true,
    },
    {
      name: 'CreatedBy',
      selector: 'CreatedBy',
      sortable: true,
    },
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
        <Button onClick={(e) => handleOpen(e, [], "Tambah Kabupaten")}>
          <AddIcon/>
        </Button>

      </div>

      <div class="col-md-6">
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Kabupaten"
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
    let selectedkabupaten_var;

    if (event.target.checked) {
      selectedkabupaten_var=provinsis.map(provinsi => provinsi.id);
    } else {
      selectedkabupaten_var=[];
    }

    setselectedkabupaten(selectedkabupaten_var);
  };

  const handleSelectOne=(event, id) => {

    const selectedIndex=selectedkabupaten.indexOf(id);
    let newselectedkabupaten=[];

    if (selectedIndex===-1) {
      newselectedkabupaten=newselectedkabupaten.concat(selectedkabupaten, id);
    } else if (selectedIndex===0) {
      newselectedkabupaten=newselectedkabupaten.concat(selectedkabupaten.slice(1));
    } else if (selectedIndex===selectedkabupaten.length-1) {
      newselectedkabupaten=newselectedkabupaten.concat(selectedkabupaten.slice(0, -1));
    } else if (selectedIndex>0) {
      newselectedkabupaten=newselectedkabupaten.concat(
        selectedkabupaten.slice(0, selectedIndex),
        selectedkabupaten.slice(selectedIndex+1)
      );
    }

    setselectedkabupaten(newselectedkabupaten);
    //
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
              title=""
              customStyles={customStyles}
              columns={columns}
              data={filteredItems}
              keyField="nama_kabupaten"
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

KBSList.propTypes={
  className: PropTypes.string,
  filteredItems: PropTypes.array.isRequired
};

export default KBSList;