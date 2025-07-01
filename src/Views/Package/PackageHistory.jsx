import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { useSnackbar } from 'react-notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

// Components
import TitleHeader from '../../Components/TitleHeader';

// Images
import pdficon from '../../assets/images/pdf-icon.svg';

// Action
import { getAllPackageHistoryDataAction } from '../../Actions/packages';

const PackageHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem('token');
  const [packageHistoryDataSet, setPackageHistoryDataSet] = useState([]);

  const packageHistoryData = useSelector(state => state.packages.packageHistoryArray);
  const responseStatus = useSelector(state => state.packages.resStatus);
  const responseMessage = useSelector(state => state.packages.resMessage);
  const previousProps = useRef({ packageHistoryData, responseStatus, responseMessage }).current;
const apiUrl = import.meta.env.VITE_AXIOS_BASE_URL_DEV;
  useEffect(() => {
    if (responseStatus === 401) {
      localStorage.removeItem('token');
      enqueueSnackbar(`${responseMessage}`, { variant: 'error', autoHide: true, hide: 3000 });
      navigate('/');
    }
  }, [responseStatus]);

  useEffect(() => {
    if (token) {
      dispatch(getAllPackageHistoryDataAction(token));
    }
  }, [token]);

  useEffect(() => {
    if (previousProps?.packageHistoryData !== packageHistoryData && packageHistoryData) {
      const transformedData = packageHistoryData.map((item, index) => ({
        id: index + 1,
        srNo: index + 1,
        package_name: item.package_name,
        purchase_date: item.purchase_date,
        isExpired: item.isExpired,
        package_custom_id: item.package_custom_id
      }));
      setPackageHistoryDataSet(transformedData);
    }
    return () => {
      previousProps.packageHistoryData = packageHistoryData;
    };
  }, [packageHistoryData]);

  // Columns for DataGrid
  const columns = [
    { field: 'srNo', headerName: 'Sr. No', width: 100 },
    { field: 'package_name', headerName: 'Package Name', flex: 1 },
    {
      field: 'purchase_date',
      headerName: 'Package Purchased',
      flex: 1,
      renderCell: (params) => moment(params.value).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      field: 'isExpired',
      headerName: 'Package Status',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.value === false ? 'success' : 'error'}
          size="small"
        >
          {params.value === false ? 'Active' : 'Inactive'}
        </Button>
      )
    },
    {
      field: 'invoice',
      headerName: 'Package Invoice',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <a
          href={`${apiUrl}/api/v1/student/purchased-package/invoice/${params.row.package_custom_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outlined" startIcon={<img src={pdficon} alt="" width="20" />}>
            Download
          </Button>
        </a>
      )
    }
  ];

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Package History - Ollato</title>
      </Helmet>
      <div>
        <TitleHeader title="Your Active Package" name="Package History" />
        <Box className='main-layout whitebox-layout table-student' sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={packageHistoryDataSet}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableSelectionOnClick
            getRowId={(row) => row.id}
            localeText={{ noRowsLabel: 'No data' }}
          />
        </Box>
      </div>
    </>
  );
};

export default PackageHistory;




// import React, { useEffect, useRef, useState } from 'react'
// import BootstrapTable from 'react-bootstrap-table-next'
// import { Helmet } from 'react-helmet'
// import moment from 'moment'
// import { useSnackbar } from 'react-notistack'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// // Components
// import TitleHeader from '../../Components/TitleHeader'

// // images
// import pdficon from '../../assets/images/pdf-icon.svg'

// // Action-File
// import { getAllPackageHistoryDataAction } from '../../Actions/packages'

// const PackageHistory = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { enqueueSnackbar } = useSnackbar()

//   // token
//   const token = localStorage.getItem('token')

//   // useState
//   const [packageHistoryDataSet, setPackageHistoryDataSet] = useState([])

//   // useSelector
//   const packageHistoryData = useSelector(state => state.packages.packageHistoryArray)
//   const responseStatus = useSelector(state => state.packages.resStatus)
//   const responseMessage = useSelector(state => state.packages.resMessage)
//   const previousProps = useRef({ packageHistoryData, responseStatus, responseMessage }).current

//   useEffect(() => {
//     if (responseStatus === 401) {
//       localStorage.removeItem('token')
//       enqueueSnackbar(`${responseMessage}`, {
//         variant: 'error',
//         autoHide: true,
//         hide: 3000
//       })
//       navigate('/')
//     }
//   }, [responseStatus])

//   useEffect(() => {
//     if (token) {
//       dispatch(getAllPackageHistoryDataAction(token))
//     }
//   }, [token])

//   useEffect(() => {
//     if (previousProps?.packageHistoryData !== packageHistoryData) {
//       if (packageHistoryData) {
//         setPackageHistoryDataSet(packageHistoryData)
//       }
//     }
//     return () => {
//       previousProps.packageHistoryData = packageHistoryData
//     }
//   }, [packageHistoryData])

//   // Active-Inactive Button
//   const actionbutton = (row, cell) => {
//     return (
//       <div className="button-box">
//         <button className='action-btns light-red-bg medium-btn' type='button'>{cell?.isExpired === false ? 'Active' : 'InActive'}</button>
//       </div>
//     )
//   }

//   // Downlaod Invoice Button
//   const invoicebutton = (row, cell, rowIndex) => {
//     return (
//       <div className="button-box">
//         <a href={`${process.env.REACT_APP_AXIOS_BASE_URL}api/v1/student/purchased-package/invoice/${cell.package_custom_id}`} >
//           <button className='outline-btn withicon' type='button' >
//           <img src={pdficon} alt="" /> <span>Download</span></button>
//         </a>
//       </div>
//     )
//   }

//   // Table-Columns
//   const columns = [
//     {
//       dataField: 'Sr.no',
//       text: 'Sr. No',
//       formatter: (cell, row, rowIndex) => {
//         const rowNumber = rowIndex + 1
//         return <span>{rowNumber}</span>
//       }
//     },
//     {
//       dataField: 'package_name',
//       text: 'Package Name'
//     },
//     {
//       dataField: 'purchase_date',
//       text: 'Package Purchased',
//       formatter: (cell, row, rowIndex) => {
//         // const data = moment(cell?.purchase_date).local().format('YYYY-MM-DD HH:mm:ss')
//         //
//         return <span>{moment(cell).format('YYYY-MM-DD HH:mm:ss')}</span>
//       }
//     },
//     {
//       dataField: '',
//       text: 'Package Status',
//       formatter: actionbutton
//     },
//     {
//       dataField: 'package-invoice',
//       text: 'Package Invoice',
//       formatter: invoicebutton
//     }
//   ]

//   // Table Data
//   const products = packageHistoryDataSet

//   return (
//     <>
//     <Helmet>
//         <meta charSet='utf-8' />
//         <title>Package History - Ollato</title>
//       </Helmet>
//           <div className=''>
//             {/* <Header /> */}
//             <TitleHeader title="Your Active Package" name="Package History" />
//             <div className='main-layout whitebox-layout table-student'>
//               <BootstrapTable keyField='id' data={products} columns={columns} responsive="md" noDataIndication={() => 'No data'}/>
//             </div>
//           </div>
//   </>
//   )
// }

// export default PackageHistory
