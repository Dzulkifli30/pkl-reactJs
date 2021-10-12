import React, { useState, useEffect } from 'react'
import { ModalComponent } from 'components';
import { KKTable, KKaddModi} from "./components";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
  } from '@material-ui/core';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {urlGetFormKK, urlDeleteFormKK } from '../../kumpulanUrl'
import '../../assets/vendor/dist/css/datatable.css';
import '../../assets/vendor/dist/css/datatable1.css';
import Swal from 'sweetalert2';


const KKList = (props) => {
    const { gotoNext,rowKK,setRowKK,KK,setKK,...rest } = props;

      function getFormKK() {
      // alert("Get Form KK")
      const userId=localStorage.getItem('user_id');
      // KK = JSON.parse(localStorage.getItem("Data KK"))
      // 
      setKK([rowKK]);
      // KK.push(rowKK)
      // 
    }


    function saveRowKK() {
      // alert("Get Form KK")
      const userId=localStorage.getItem('user_id');
      // KK = JSON.parse(localStorage.getItem("Data KK"))
      // 
      // setKK(JSON.parse(localStorage.getItem("Data KK")));
     
      KK.push(rowKK)
      // 

    }
    const deleteFormKK = async (KK_id) => {  /* */
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
          //
          // alert("Nextwork Error");
          setKK([]);
          setFilteredItems([]);
          //this.setState({ ...this.state, isFetching: false });
        });
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
  
      //
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

    const ExportPDF = () => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(15);
  
      const title = "KK di Indonesia";
      const headers = [["Periode Sensus", "Nomor KK", "NIK KK", "Nama KK", "Alamat KK", "Id Provinsi", "Id kabupaten", "Id Kecamatan", "Id Kelurahan", "Id Rw", "Id Rt", "Dibuat oleh"]];
  
      const data = filteredItems.map(elt=> [elt.periode_sensus, elt.NoKK, elt.NIK_KK, elt.nama_kk, elt.alamat_kk, elt.id_provinsi, elt.id_kabupaten, elt.id_kecamatan, elt.id_kelurahan, elt.id_rw, elt.id_rt, elt.create_by]);
  
      let content = {
        startY: 50,
        head: headers,
        body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("KK.pdf")
    }

    // const [KK, setKK]=useState([]);
    const [filteredItems, setFilteredItems]=useState([]);
    // const [rowKK, setRowKK]=useState({});
    const [open, setOpen]=React.useState(false);
    const [title, setTitle]=React.useState(false);
    const [selectedKK, setSelectedKK]=useState([]);
    const [KKExport, setKKExport]=useState([]);
    const [KKfind, setKKfind]=useState([]);
    const [add,setAdd]=React.useState([])
    // const SettingKK=useState(mockDataSettingKK);
    const [order, setOrder]=React.useState('asc');
    const [orderBy, setOrderBy]=React.useState('keyId');

    const setData=(field1, value1, field2, value2, nmKK, kdKK, status, keyId) => {
      setRowKK({
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

    const handleChange=event => {
      //setData(event.target.name, event.target.value);
  
  
      setSelectedKK({
        ...setSelectedKK,
        [event.target.name]: event.target.value[0]
      });
  
    };

    const handleOpen=(e) => {
        getFormKK();
        setOpen(true);
    };

    const handleClose=(e) => {
        setOpen(false);
    };

    const handleDelete=(e,RowKK) => {
      deleteFormKK(RowKK.KK_id).then( Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Berhasil Dihapus',
        showConfirmButton: false,
        timer: 1000
      }))
      // getFormKK();
    };

    function popupComponen(componenPopup) {
      return (
        <ModalComponent getDataBackend={deleteFormKK}
          handleChange={handleDelete} setData={setData} roles={downloadCSV}
          open={open} setRowSelect={setRowKK} rowSelect={rowKK}
          title={KKfind} handleClose={handleClose} datas={KK}
          ComponenAddModi={componenPopup} ExportPDF={ExportPDF}>
           </ModalComponent>
  
      )
    }

    return (
        <div className="p-10">
          <KKaddModi
        getDataBackend={saveRowKK}
        handleChange={handleChange} setData={setData} handleOpen={handleOpen}
        open={open} setRowSelect={setRowKK} rowSelect={rowKK}
        title={title} datas={filteredItems} handleClose={handleClose} gotoNext={gotoNext}
        />
          {popupComponen(KKTable)}
        </div>
        
        
    )
}

export default KKList;