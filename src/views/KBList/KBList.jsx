import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';
import { KKTable } from '../KKList/components/'
import { makeStyles } from '@material-ui/styles';
import Popup from 'reactjs-popup'
import moment from 'moment';
import { KBTable, KBAddModi } from '../KBList/components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlDeleteKB, urlGetKB } from '../../kumpulanUrl'
import '../../assets/vendor/dist/css/datatable.css';
import '../../assets/vendor/dist/css/datatable1.css';
import axios from 'axios';
import { urlGetFormKK } from '../../kumpulanUrl';
import FormKK from 'views/FormKK/FormKK';
import KKSList from 'views/KKS'
import AnggotasList from 'views/Anggotas'
import AnggotaKKList from 'views/AnggotaKK'
import KBSList from 'views/KBS'

//import Modal from "@material-ui/core/Modal";
//import Backdrop from "@material-ui/core/Backdrop";
//import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
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

const KBList = props => {
  const { kb, setKB, AnggotaKK, setAnggotaKK, rowKK, setRowKK, ...rest } = props;

  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');
  }


  function getKB(KB_params) {

    kb.push(KB_params)
    setFilteredItems(kb);
    setOpen(false);

    const userId = localStorage.getItem('user_id');
    // setFilteredItems(KB_params);
    // setOpen(false);
    // setkb(KB_params)
    console.log('ini data KB ', kb)
    console.log('FIltered ItemsKB', filteredItems)
    console.log("ParampaaKB = ", KB_params)
    // /* */
    // const requestOptions={
    //   method: 'get',
    //   //mode: "cors",
    //   headers: { 'Content-Type': 'application/json' },
    // };

    // let url=urlGetkb
    // eslint-disable-next-line no-useless-concat
    // const response=await fetch(url, requestOptions)
    //   .then(res => {
    //     return res.json();
    //   })

    //   .then(resJson => {
    //     const data=resJson;
    //     setkb(data.data);
    //     setFilteredItems(data.data);
    //     //return false;
    //   })
    //   .catch(e => {
    //     //console.log(e);
    //     alert("Nextwork Error");
    //     setkb([]);
    //     setFilteredItems([]);
    //     setOpen(false);
    //     //this.setState({ ...this.state, isFetching: false });
    //   });

    setOpen(false);
  }
  const [KK, setKK] = React.useState([])

  async function getServer() {
    const userId = localStorage.getItem('user_id');
    setFilteredItems(KK);
    setOpen(true);
    console.log("Ini KK", KK)
    /* */
    const requestOptions = {
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url = urlGetFormKK
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        setKK(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setKK([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });
    setOpen(false);
  }

  const csvData = () => {
    const tempCsv = [];
    const tempCsvItem = [];

    //];

    SettingProvinsi[0].HeaderData.map(headCell => {
      tempCsvItem.push(
        headCell.label
      )
    });
    tempCsv.push(tempCsvItem)



    return tempCsv
  }


  const deletekb = (e) => {
    const selectedkb_string = selectedkb.join("<batas></batas>");
    let kb3 = kb.filter(function (entry) {
      return entry && entry.id && selectedkb_string.toUpperCase().indexOf(entry.id.toUpperCase()) === -1;
    });
    setFilteredItems(kb3)
    setKB(kb3)
    setKBfind('')
    //console.log("groups3",groups3);
    //findData(groupfind)
  }

  const classes = useStyles();
  const printPdf = (e) => {
    //alert("dsdsd")
    setKBExport(flteredItems);
    const doc = new jsPDF()

    const timer = setTimeout(() => {
      doc.setProperties({ title: SettingProvinsi[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#kbExport' })
      var posis_x = (doc.previousAutoTable.width - (SettingProvinsi[0].TitleModule).length) / 2
      doc.text(SettingProvinsi[0].TitleModule, posis_x, 6);

      doc.save('provinsi.pdf')
    }, 2000);
    return () => clearTimeout(timer);


  }
  const getStatus = (status_prm) => {
    let status = "";
    if (status_prm === 'A')
      status = 'Active'
    else
      status = 'Inactive'
    return status;
  }
  const onChangefind = (e) => {
    // return;
    if (e.target.value.length >= 3) {
      setKBfind(e.target.value)
      let kb4 = kb.filter(function (entry) {
        return entry && entry.nama_kb &&
          ((entry.nama_kb !== null ? entry.nama_kb : '').toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1);
      });
      setFilteredItems(Array.isArray(kb4) ? kb4 : [kb4]);

    } if (e.target.value.length == 0) {
      setFilteredItems(kb);
    }
    setKBfind(e.target.value)

    //console.log("user1", users1);
  }
  const Export = ({ onExport }) => (
    <Button onClick={e => onExport(e.target)}>Export</Button>
  );


  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(e) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(filteredItems);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }



  // const [provinsiId, setProvinsiId]=useState(getKB());
  const [filteredItems, setFilteredItems] = useState([]);
  const [rowkbSelect, setRowkbSelect] = useState({});
  const [KB_params, setKB_params] = useState({});
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(false);
  const [selectedkb, setSelectedkb] = useState([]);
  const [kbExport, setKBExport] = useState([]);
  const [kbfind, setKBfind] = useState([]);
  const [add, setAdd] = React.useState([])
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('keyId');
  const [compPopup, setCompPopup] = useState(null);

  useEffect(() => {
    console.log(KB_params);
    // console.log('prov',provinsiId)
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange = event => {
    //setData(event.target.name, event.target.value);


    setSelectedkb({
      ...setSelectedkb,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData = (field1, value1, field2, value2, nmProvinsi, KK_id, status, keyId) => {
    setRowkbSelect({
      ...selectedkb,
      [field1]: value1,

      [field2]: value2,
      ['KK_id']: KK_id,
      ['nmProvinsi']: nmProvinsi,
      ['status']: status,
      ['keyId']: keyId,
    });

    /**/
    //alert(field1+" "+value);
    //alert()

  };


  const handleOpen = (e, rowkb, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    setRowkbSelect(rowkb);
    // console.log("ANggota kk di formkb ", AnggotaKK)

    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleView = (e) => {
    getServer();
    setOpen(true)
  }

  const handleDelete = (e, rowkbSelect) => {
    deleteKB(rowkbSelect.data_kb_id)
  };

  /* */
  const handleOpenViewMap = (e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowkbSelect(rowkb);

    //setCompPopup("Map")
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  /**/
  //openPopup
  const handleClose = () => {
    setOpen(false);
  };


  function popupComponen(componenPopup) {
    return (
      <ModalComponent
        getDataBackend={getKB}
        handleChange={handleChange}
        setData={setData}
        open={open}
        handleOpenViewMap={handleOpenViewMap}
        setRowSelect={setRowkbSelect}
        rowSelect={rowkbSelect}
        title={title}
        handleClose={handleClose}
        datas={filteredItems}
        handleOpen={handleOpen}
        AnggotaKK={AnggotaKK}
        setAnggotaKK={setAnggotaKK}
        ComponenAddModi={componenPopup}>
      </ModalComponent>

    )
  }

  const contentStyle = {
    maxWidth: "600px",
    width: "90%"
  };

  function popupKK(componenPopup) {
    <ModalComponent

      handleChange={handleDelete} setData={setData} roles={downloadCSV}
      open={open} setRowSelect={setRowKK} rowSelect={rowKK} handleClose={handleClose} datas={KK}
      ComponenAddModi={componenPopup}>

    </ModalComponent>
  }

  return (
    <div className={classes.root}>
      {/* <h5 style={{ color: 'black' }} className="font-poppins">KB</h5> */}
      {/*}
      <kbToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={kbfind} deleteProvinsi={deleteProvinsi}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        kb={kb}
      />
  {*/}

      <div className={classes.content}>
        <KBTable
          handleOpen={handleOpen}
          handleDelete={handleDelete}
          onChange={onChangefind}
          handleView={handleView}
          kbExport={kbExport}
          // deleteProv={deleteProv}
          // deleteProvinsi={deleteProvinsi}
          kbfind={kbfind}
          selectedkb={selectedkb}
          kbfind={kbfind}
          getKB={getKB}
          getDataBackend={getKB}
          handleChange={handleChange}
          setSelectedkb={setSelectedkb}
          Export={Export}
          KB_params={KB_params}
          kb={kb}
          setRowSelect={setRowkbSelect}
          rowSelect={rowkbSelect}
          title={title}
          handleClose={handleClose}
          setData={setData}
          filteredItems={filteredItems}
          open={open}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          handleClose={handleClose}
          downloadCSV={downloadCSV}
          getServer={getServer}
          AnggotaKK={AnggotaKK}
          setAnggotaKK={setAnggotaKK}
        />


        {popupComponen(KBAddModi)}

        <div className="mt-20 flex justify-around ">
            <div className="">
            <Popup  trigger={
          <button
            className="bg-blue-800 btn btn-lg"
            variant="contained"
            // onClick={handleView}

          >
            Lihat Server KK
          </button>}
         position="top center"
         contentStyle = {contentStyle}
         modal
         closeOnDocumentClick

          >
            <KKSList/>

          </Popup>
            </div>
            <div className="">
            <Popup  trigger={
          <button
          className="bg-green-500 text-white btn btn-lg"
          variant="contained"
          // onClick={handleView}
        >
          Lihat Server Anggota
        </button>}
         position="top center"
         contentStyle = {contentStyle}
         modal
         closeOnDocumentClick

          >
            <AnggotasList/>

          </Popup>
            </div>
            <div className="">
            <Popup  trigger={
          <button
          className="bg-yellow-500 btn btn-lg text-white"
          variant="contained"
          // onClick={handleView}

        >
          Lihat Server KB
        </button>}
         position="top center"
         contentStyle = {contentStyle}
         modal
         closeOnDocumentClick

          >
            <KBSList
            AnggotaKK={AnggotaKK}
            setAnggotaKK={setAnggotaKK}
            
            />

          </Popup>
            </div>
        </div>
      </div>


    </div>

  );
};

export default KBList;