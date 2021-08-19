
import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import {PencarianLaporan,LaporanSensusIDTable} from '../LaporanSensusID/components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlShowLaporanSensusID, urlShowTargetKk } from '../../kumpulanUrl'
import '../../assets/vendor/dist/css/datatable.css';
import '../../assets/vendor/dist/css/datatable1.css';
import axios from 'axios';

//import Modal from "@material-ui/core/Modal";
//import Backdrop from "@material-ui/core/Backdrop";
//import Fade from "@material-ui/core/Fade";

const useStyles=makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#fff',
  },
  content: {
    marginTop: theme.spacing(2)
  },
  yogi: {
    marginTop: theme.spacing(300)
  }
}));

const LaporanSensusID=props => {


  async function showTargetKK(rowsensusIDSelect) {
    const userId=localStorage.getItem('Periode Sensus');
    /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "Periode_Sensus": rowsensusIDSelect.Periode_Sensus,
        // "id_sensusID": rowsensusIDSelect.id_sensusID,
      }),
    };

    let url=urlShowLaporanSensusID
    // eslint-disable-next-line no-useless-concat
    alert(urlShowLaporanSensusID)
    const response=await fetch(url, requestOptions)
      .then(res => {
        console.log('res = ',res)
        return res.json();
        
      })

      .then(resJson => {
        alert('in')
        const data=resJson;
        console.log('data sens =', data.data)
        setSensusID(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        alert(e);
        setSensusID([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  const csvData=() => {
    const tempCsv=[];
    const tempCsvItem=[];

    //];

    SettingProvinsi[0].HeaderData.map(headCell => {
      tempCsvItem.push(
        headCell.label
      )
    });
    tempCsv.push(tempCsvItem)



    return tempCsv
  }


  const deletesensusID=(e) => {
    const selectedsensusID_string=selectedsensusID.join("<batas></batas>");
    let sensusID3=sensusID.filter(function (entry) {
      return entry&&entry.id&&selectedsensusID_string.toUpperCase().indexOf(entry.id.toUpperCase())===-1;
    });
    setFilteredItems(sensusID3)
    setSensusID(sensusID3)
    setSensusIDfind('')
    //console.log("groups3",groups3);
    //findData(groupfind)
  }
  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setSensusIDExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingProvinsi[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#sensusIDExport' })
      var posis_x=(doc.previousAutoTable.width-(SettingProvinsi[0].TitleModule).length)/2
      doc.text(SettingProvinsi[0].TitleModule, posis_x, 6);

      doc.save('provinsi.pdf')
    }, 2000);
    return () => clearTimeout(timer);


  }
  const getStatus=(status_prm) => {
    let status="";
    if (status_prm==='A')
      status='Active'
    else
      status='Inactive'
    return status;
  }
  const comboBox=(e) =>{
    if (e.targer.value.length>=3) {
      
    }
  }
  const onChangefind=(e) => {
    // return;
    if (e.target.value.length>=3) {
      setSensusIDfind(e.target.value)
      let sensusID4=sensusID.filter(function (entry) {
        return entry&&entry.Nama_sensusID&&
          ((entry.Nama_sensusID!==null? entry.Nama_sensusID:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(sensusID4)? sensusID4:[sensusID4]);

    } if (e.target.value.length==0) {
      setFilteredItems(sensusID);
    }
    setSensusIDfind(e.target.value)

    //console.log("user1", users1);
  }
  const Export=({ onExport }) => (
    <Button onClick={e => onExport(e.target)}>Export</Button>
  );


  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter=',';
    const lineDelimiter='\n';
    const keys=Object.keys(array[0]);
    result='';
    result+=keys.join(columnDelimiter);
    result+=lineDelimiter;

    array.forEach(item => {
      let ctr=0;
      keys.forEach(key => {
        if (ctr>0) result+=columnDelimiter;

        result+=item[key];

        ctr++;
      });
      result+=lineDelimiter;
    });

    return result;
  }

  function downloadCSV(e) {
    const link=document.createElement('a');
    let csv=convertArrayOfObjectsToCSV(filteredItems);
    if (csv==null) return;

    const filename='export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv=`data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }


  const [sensusID, setSensusID]=useState([]);
  const [kab, setKab]=useState([]);
  // const [provinsiId, setProvinsiId]=useState(getKab());
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowsensusIDSelect, setRowsensusIDSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedsensusID, setSelectedsensusID]=useState([]);
  const [sensusIDExport, setSensusIDExport]=useState([]);
  const [sensusIDfind, setSensusIDfind]=useState([]);
  const [add,setAdd]=React.useState([])
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');
  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    // getKab();
    // console.log('prov',provinsiId)
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedsensusID({
      ...setSelectedsensusID,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmProvinsi, kdProvinsi, status, keyId) => {
    setRowsensusIDSelect({
      ...selectedsensusID,
      [field1]: value1,

      [field2]: value2,
      ['kdProvinsi']: kdProvinsi,
      ['nmProvinsi']: nmProvinsi,
      ['status']: status,
      ['keyId']: keyId,
    });

    /**/
    //alert(field1+" "+value);
    //alert()

  };

  // async function showKab(id_provinsi) {
  //   /* */
  //   const requestOptions={
  //     method: 'POST',
  //     //mode: "cors",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       "id_provinsi": id_provinsi,
  //     })
  //   };

  //   let urlShow=urlShowKab
  //   // eslint-disable-next-line no-useless-concat
  //   const response=await fetch(urlShow, requestOptions)
  //     .then(res => {
  //       return res.json();
  //     })

  //     .then(resJson => {
  //       const data=resJson;
  //       console.log('sensusID =',data.data)
  //       setSensusID(data.data);
  //       //return false;
  //     })
  //     .catch(e => {
  //       //console.log(e);
  //       alert("Nextwork Error");
  //       setSensusID([]);
  //       //this.setState({ ...this.state, isFetching: false });
  //     });
  // } 


  const handleOpen=(e, rowsensusID, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    setRowsensusIDSelect(rowsensusID);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowsensusIDSelect(rowsensusID);

    //setCompPopup("Map")
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  /**/
  //openPopup
  const handleClose=() => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }} className="font-poppins">Laporan Target Sensus di Indonesia</h5>
      {/*}
      <sensusIDToolbar
        handleOpenViewMap={handleOpenViewMap}
        deleteProvinsi={deleteProvinsi}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        sensusID={sensusID}

      />
  {*/}
        <PencarianLaporan
          getDataBackend={showTargetKK}
          setSensusID={setSensusID}
          handleChange={handleChange} setData={setData}
          open={open} setRowSelect={setRowsensusIDSelect} rowSelect={rowsensusIDSelect}
          title={title} datas={filteredItems}
        />
      <div className={classes.content}>
        <LaporanSensusIDTable
          handleOpenViewMap={handleOpenViewMap}
          rowSelect={rowsensusIDSelect}
          sensusID={sensusID}
          getDataBackend={showTargetKK}
        // textfind={sensusIDfind} 
          onChange={onChangefind}
          // showKab={showKab}
          sensusIDExport={sensusIDExport}
          sensusIDfind={sensusIDfind}
          filteredItems={filteredItems}
          setRowSelect={setRowsensusIDSelect} rowSelect={rowsensusIDSelect}
          selectedsensusID={selectedsensusID} 
          sensusIDfind={sensusIDfind}
          handleOpen={handleOpen}
          setSelectedsensusID={setSelectedsensusID}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}

        />
      </div>

    </div>

  );
};

export default LaporanSensusID;
