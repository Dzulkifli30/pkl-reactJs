import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { AnggotaKKToolbar, AnggotaKKTable, AnggotaKKAddModi, ViewMap } from './components';
import { ModalComponent } from 'components';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlKab,urlGetAnggotaKK, } from '../../kumpulanUrl'

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

const AnggotaKKList=props => {
  const { rowKK,setRowKK,KK,setKK,AnggotaKK,setAnggotaKK, getKKID,...rest } = props;
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  // const { ,...rest } = props;
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }


   function getAnggotaKK(anggotaKK_params) {

    AnggotaKK.push(anggotaKK_params)
    setFilteredItems(AnggotaKK);
    setOpen(false);

    const userId=localStorage.getItem('user_id');
    // setFilteredItems(anggotaKK_params);
    // setOpen(false);
    // setAnggotaKK(anggotaKK_params)
    console.log('ini Anggota KK',AnggotaKK)
    console.log('FIltered Items',filteredItems)
    console.log("Parampaa = ",anggotaKK_params)
    // /* */
    // const requestOptions={
    //   method: 'get',
    //   //mode: "cors",
    //   headers: { 'Content-Type': 'application/json' },
    // };

    // let url=urlGetAnggotaKK
    // eslint-disable-next-line no-useless-concat
    // const response=await fetch(url, requestOptions)
    //   .then(res => {
    //     return res.json();
    //   })

    //   .then(resJson => {
    //     const data=resJson;
    //     setAnggotaKK(data.data);
    //     setFilteredItems(data.data);
    //     //return false;
    //   })
    //   .catch(e => {
    //     //console.log(e);
    //     alert("Nextwork Error");
    //     setAnggotaKK([]);
    //     setFilteredItems([]);
    //     setOpen(false);
    //     //this.setState({ ...this.state, isFetching: false });
    //   });

    setOpen(false);
  }



  // const deleteAnggotaKK = async (id_rt) => {  /* */
  //   const requestOptions={
  //     method: 'POST',
  //     mode: "cors",
  //     headers: { 'Content-Type': 'application/json' },
  //     body:JSON.stringify({
  //       id_rt: id_rt
  //     })
  //   };

  //   let url=urlDeleteAnggotaKK
  //   // eslint-disable-next-line no-useless-concat
  //   const response=await fetch(url, requestOptions)
  //     .then(res => {
  //       return res.json();
  //     })

  //     .then(resJson => {
  //       const data=resJson;
  //       setAnggotaKK(data.data);
  //       setFilteredItems(data.data);
  //       getAnggotaKK()
  //       //return false;
  //     })
  //     .catch(e => {
  //       //console.log(e);
  //       alert("Nextwork Error");
  //       setAnggotaKK([]);
  //       setFilteredItems([]);
  //       //this.setState({ ...this.state, isFetching: false });
  //     });
  // }

  const csvData=() => {
    const tempCsv=[];
    const tempCsvItem=[];

    //];

    SettingAnggotaKK[0].HeaderData.map(headCell => {
      tempCsvItem.push(
        headCell.label
      )
    });
    tempCsv.push(tempCsvItem)



    return tempCsv
  }



  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setAnggotaKKExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingAnggotaKK[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#AnggotaKKExport' })
      var posis_x=(doc.previousAutoTable.width-(SettingAnggotaKK[0].TitleModule).length)/2
      doc.text(SettingAnggotaKK[0].TitleModule, posis_x, 6);

      doc.save('AnggotaKK.pdf')
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
      setAnggotaKKfind(e.target.value)
      let AnggotaKK4=AnggotaKK.filter(function (entry) {
        return entry&&entry.UserName&&
          ((entry.UserName!==null? entry.UserName:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(AnggotaKK4)? AnggotaKK4:[AnggotaKK4]);

    } if (e.target.value.length==0) {
      setFilteredItems(AnggotaKK);
    }
    setAnggotaKKfind(e.target.value)

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


  // const [AnggotaKK, setAnggotaKK]=useState([]);
  const [rowAnggotaKK, setRowAnggotaKK]=useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  // const [rowKK, setRowAnggotaKK]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedAnggotaKK, setSelectedAnggotaKK]=useState([]);
  const [AnggotaKKExport, setAnggotaKKExport]=useState([]);
  const [anggotaKK_params, setAnggotaKK_params]=useState([]);
  const [AnggotaKKfind, setAnggotaKKfind]=useState([]);
  const [add,setAdd]=React.useState([])
  // const SettingAnggotaKK=useState(mockDataSettingAnggotaKK);
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  // const kkidbwang = () => {
  //   KK.push(rowKK)
  //   console.log('wwwwwwwwwwwwwwwww',KK)
  // }

  useEffect(() => {
   console.log(anggotaKK_params);
  //  kkidbwang()
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedAnggotaKK({
      ...setSelectedAnggotaKK,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmAnggotaKK, kdAnggotaKK, status, keyId) => {
    setRowAnggotaKK({
      ...selectedAnggotaKK,
      [field1]: value1,

      [field2]: value2,
      ['kdAnggotaKK']: kdAnggotaKK,
      ['nmAnggotaKK']: nmAnggotaKK,
      ['status']: status,
      ['keyId']: keyId,
    });

    /**/
    //alert(field1+" "+value);
    //alert()

  };


  const handleOpen=(e, rowAnggotaKK, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    // alert(MessageButton)
    setRowAnggotaKK(rowAnggotaKK);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e,RowKK) => {
    deleteAnggotaKK(RowKK.id_rt).then( Swal.fire({
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
    //setRowAnggotaKK(rowAnggotaKK);

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
      <ModalComponent getDataBackend={getAnggotaKK}
        handleChange={handleChange} setData={setData}
        handleOpenViewMap={handleOpenViewMap}
        rowKK={rowKK} KK2={KK}
        getKKID={getKKID}
        open={open} setRowSelect={setRowAnggotaKK} rowSelect={rowAnggotaKK}
        title={title} datas={filteredItems} handleClose={handleClose} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>

    )
  }


  return (
    <div className={classes.root}>
      {/*}
      <AnggotaKKToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={AnggotaKKfind} deleteAnggotaKK={deleteAnggotaKK}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        AnggotaKK={AnggotaKK}
      />
  {*/}
      <div className={classes.content,"font-poppins p-10"}>
      <AnggotaKKTable 
        getDataBackend={getAnggotaKK}
        AnggotaKK={AnggotaKK}
        filteredItems={filteredItems}
        anggotaKK_params={anggotaKK_params}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange} setData={setData}
        handleOpenViewMap={handleOpenViewMap}
        open={open} setRowSelect={setRowAnggotaKK} rowSelect={rowAnggotaKK}
        title={title}
        />
      {popupComponen(AnggotaKKAddModi)}

      </div>

    </div>

  );
};

export default AnggotaKKList;
