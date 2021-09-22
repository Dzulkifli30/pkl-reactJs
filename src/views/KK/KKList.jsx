import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { KKToolbar, KKTable, KKAddModi, ViewMap } from './components';
import { ModalComponent } from 'components';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlKab,urlGetKK,urlGetFormKK, urlDeleteFormKK } from '../../kumpulanUrl'

import '../../assets/vendor/dist/css/datatable.css';
import '../../assets/vendor/dist/css/datatable1.css';
import axios from 'axios';
import { async } from 'validate.js';
import Swal from 'sweetalert2';

//import Modal from "@material-ui/core/Modal";
//import Backdrop from "@material-ui/core/Backdrop";
//import Fade from "@material-ui/core/Fade";

const getMockData=() =>{
  mockData.map(mock => {
    return(
      <h4>{mock}</h4>

    )
  })
  console.log(mockData)

  
}

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

const KKList=props => {
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function getTargetKk() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(KK);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlGetFormKK
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKK(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        alert("Nextwork Error");
        setKK([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }



  const deleteTargetKk = async (KK_id) => {  /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        KK_id: KK_id
      })
    };

    let url=urlDeleteFormKK
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKK(data.data);
        setFilteredItems(data.data);
        getTargetKk()
        //return false;
      })
      .catch(e => {
        //console.log(e);
        alert("Nextwork Error");
        setKK([]);
        setFilteredItems([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  const csvData=() => {
    const tempCsv=[];
    const tempCsvItem=[];

    //];

    SettingKK[0].HeaderData.map(headCell => {
      tempCsvItem.push(
        headCell.label
      )
    });
    tempCsv.push(tempCsvItem)



    return tempCsv
  }


  

  const deleteKK=async (e, id) => {
    const selectedKK_string=selectedKK.join("<batas></batas>");
    let KK3=KK.filter(function (entry) {
      return entry&&entry.id&&selectedKK_string.toUpperCase().indexOf(entry.id.toUpperCase())===-1;
    });

    let url=urlDeleteProv
    if (url === 200) {
      // thisClickedFunda.closest("tr").remove();
      console.log(url.data.message)
    }

    setFilteredItems(KK3)
    setKK(KK3)
    setKKfind('')
    //console.log("groups3",groups3);
    //findData(groupfind)
  }
  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setKKExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingKK[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#KKExport' })
      var posis_x=(doc.previousAutoTable.width-(SettingKK[0].TitleModule).length)/2
      doc.text(SettingKK[0].TitleModule, posis_x, 6);

      doc.save('KK.pdf')
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
  const onChangefind=(e) => {
    // return;
    if (e.target.value.length>=3) {
      setKKfind(e.target.value)
      let KK4=KK.filter(function (entry) {
        return entry&&entry.nama_kk&&
          ((entry.nama_kk!==null? entry.nama_kk:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(KK4)? KK4:[KK4]);

    } if (e.target.value.length==0) {
      setFilteredItems(KK);
    }
    setKKfind(e.target.value)

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


  const [KK, setKK]=useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowKKSelect, setRowKKSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedKK, setSelectedKK]=useState([]);
  const [KKExport, setKKExport]=useState([]);
  const [KKfind, setKKfind]=useState([]);
  const [add,setAdd]=React.useState([])
  // const SettingKK=useState(mockDataSettingKK);
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    getTargetKk();
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedKK({
      ...setSelectedKK,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmKK, kdKK, status, keyId) => {
    setRowKKSelect({
      ...selectedKK,
      [field1]: value1,

      [field2]: value2,
      ['kdKK']: kdKK,
      ['nmKK']: nmKK,
      ['status']: status,
      ['keyId']: keyId,
    });

    /**/
    //alert(field1+" "+value);
    //alert()

  };


  const handleOpen=(e, rowKK, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    // alert(MessageButton)
    setRowKKSelect(rowKK);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e,RowKKSelect) => {
    deleteTargetKk(RowKKSelect.KK_id).then( Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Berhasil Dihapus',
      showConfirmButton: false,
      timer: 1000
    }))
  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowKKSelect(rowKK);

    //setCompPopup("Map")
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  /**/
  //openPopup
  const handleClose=() => {
    setOpen(false);
  };


  function popupComponen(componenPopup) {
    return (
      <ModalComponent getDataBackend={getTargetKk}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowKKSelect} rowSelect={rowKKSelect}
        title={title} datas={filteredItems} handleClose={handleClose} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>

    )
  }


  return (
    <div className={classes.root}>
      {/*}
      <KKToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={KKfind} deleteKK={deleteKK}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        KK={KK}
      />
  {*/}
      <div className={classes.content}>
        <KKTable
          handleOpenViewMap={handleOpenViewMap}
          rowSelect={rowKKSelect}
          getMockData={getMockData}
          KK = {KK}
          handleDelete={handleDelete}
          onChange={onChangefind}
          deleteKK={deleteKK}
          // SettingKK={SettingKK}
          KKExport={KKExport}
          // deleteProv={deleteProv}
          // deleteKK={deleteKK}
          KKfind={KKfind}
          filteredItems={filteredItems}
          selectedKK={selectedKK} 
          handleOpen={handleOpen}
          setSelectedKK={setSelectedKK}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}

        />


      {popupComponen(KKAddModi)}

      </div>

    </div>

  );
};

export default KKList;
