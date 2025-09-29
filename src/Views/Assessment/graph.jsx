
import React, { useEffect } from 'react';
import TitleHeader from '../../Components/TitleHeader';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGraphData } from '../../Actions/assessment';
import ChartImg from '../../assets/images/findings-2-img.png';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Grid, Typography, Box } from '@mui/material';

export default function Graph() {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const grapnDataArray = useSelector((state) => state.assessment.graphData);

  useEffect(() => {
    if (location?.state?.id) {
      dispatch(getGraphData(location?.state?.id, token));
    }
  }, [location?.state?.id]);

  const buildChartData = (labels = [], values = []) => {
    return labels.map((label, index) => ({
      name: label,
      value: values[index] ?? 0,
    }));
  };

  return (
    <>
  <Box sx={{ padding: 2 }}>
        <TitleHeader name="Assessment" />
        <Box
          className="main-layout whitebox-layout test-desc"
          sx={{ marginBottom: 4 }}
        >
          <Typography variant="h5" className="testNameTitle">
            CONCLUSIVE FINDINGS
          </Typography>
          <Grid
            container
            spacing={2}
            className="chartSection chart-img"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <Box className="chart-image">
                <img src={ChartImg} alt="" style={{ width: "100%" }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="findings-point-bg">
                <ul>
                  {grapnDataArray?.conclusive_findings?.length > 0 ? (
                    grapnDataArray.conclusive_findings.map(
                      (conclusiveData, index) => (
                        <li key={index}>
                          {conclusiveData?.career_profile_detail_name}
                        </li>
                      )
                    )
                  ) : (
                    <Typography>No Data Found</Typography>
                  )}
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Box> 

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // column on mobile, row on desktop
            gap: 3, // space between charts
          }}
        >
          {/* Aptitude Test */}
          <Box
            className="main-layout whitebox-layout test-desc"
            sx={{ flex: 1, padding: 2 }}
          >
            <Typography variant="h6" className="testNameTitle">
              Aptitude Test
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={buildChartData(
                  grapnDataArray?.apptitude?.aptituteGraphLabel,
                  grapnDataArray?.apptitude?.aptituteGraphValue
                )}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2170AC" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Interest Test */}
          <Box
            className="main-layout whitebox-layout test-desc"
            sx={{ flex: 1, padding: 2 }}
          >
            <Typography variant="h6" className="testNameTitle">
              Interest Test
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={buildChartData(
                  grapnDataArray?.interest?.interestGraphLabel,
                  grapnDataArray?.interest?.interestGraphValue
                )}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2170AC" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* <Grid container spacing={4}>
          <Grid item xs={12} md={6} >
            <Box className="main-layout w-100 whitebox-layout test-desc" sx={{ padding: 2 }}>
              <Typography variant="h6" className="testNameTitle">Aptitude Test</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={buildChartData(
                    grapnDataArray?.apptitude?.aptituteGraphLabel,
                    grapnDataArray?.apptitude?.aptituteGraphValue
                  )}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#2170AC" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box className="main-layout whitebox-layout test-desc" sx={{ padding: 2 }}>
              <Typography variant="h6" className="testNameTitle">Interest Test</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={buildChartData(
                    grapnDataArray?.interest?.interestGraphLabel,
                    grapnDataArray?.interest?.interestGraphValue
                  )}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#2170AC" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid> */}
      </Box>
    </>
  );
}

// import React, { useEffect } from 'react'
// import TitleHeader from '../../Components/TitleHeader'
// import { CChart } from '@coreui/react-chartjs'
// import { useLocation } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { getGraphData } from '../../Actions/assessment'
// import ChartImg from '../../assets/images/findings-2-img.png'
// export default function graph () {
//   const location = useLocation()
//   const dispatch = useDispatch()
//   const token = localStorage.getItem('token')

//   // useState
//   // useSelector
//   const grapnDataArray = useSelector((state) => state.assessment.graphData)
//   useEffect(() => {
//     if (location?.state?.id) {
//       dispatch(getGraphData(location?.state?.id, token))
//     }
//   }, [location?.state?.id])

//   return (
//     <>
//         <div className=''>
//           <TitleHeader name='Assessment' />
//           <div className='main-layout whitebox-layout test-desc'>
//               <h2 className='testNameTitle' >CONCLUSIVE FINDINGS</h2>
//             <div className='chartSection chart-img'>
//             <div className="chart-image">
//                   <img src={ChartImg} alt="" />
//                 </div>
//               <div className="innerChart">
//               <div className="findings-point-bg">
//               <ul>
//                 {
//                   grapnDataArray?.conclusive_findings && grapnDataArray?.conclusive_findings.length > 0
//                     ? grapnDataArray?.conclusive_findings.map((conclusiveData, index) => {
//                       return <li key={index} >{conclusiveData?.career_profile_detail_name}</li>
//                     })
//                     : <p>No Data Found</p>
//                 }
//               </ul>
//             </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-xl-6">
//             <div className='main-layout whitebox-layout test-desc mt-4'>
//               <h2 className='testNameTitle' >Aptitude Test</h2>
//             <div className='chartSection'>
//               <CChart
//               className='innerChart'
//                 type='bar'
//                 style={{ width: '1000%' }}
//                 data={{
//                   labels: grapnDataArray?.apptitude?.aptituteGraphLabel,
//                   datasets: [
//                     {
//                       label: '# out of 10',
//                       backgroundColor: '#2170AC',
//                       data: grapnDataArray?.apptitude?.aptituteGraphValue
//                     }
//                   ]
//                 }
//               }
//               options={{
//                 scales: {
//                   y: {
//                     min: 0,
//                     max: 10
//                   }
//                 }
//               }}
//                 labels='months'
//               />
//             </div>
//           </div>
//             </div>
//             <div className="col-xl-6">
//             <div className='main-layout whitebox-layout test-desc mt-4'>
//             <h2 className='testNameTitle' >Interest Test</h2>
//           <div className='chartSection'>
//             <CChart
//              className='innerChart'
//               type='bar'
//               style={{ width: '1000%' }}
//               data={{
//                 labels: grapnDataArray?.interest?.interestGraphLabel,
//                 datasets: [
//                   {
//                     label: '# out of 10',
//                     backgroundColor: '#2170AC',
//                     data: grapnDataArray?.interest?.interestGraphValue
//                   }
//                 ]
//               }}
//               options={{
//                 scales: {
//                   y: {
//                     min: 0,
//                     max: 10
//                   }
//                 }
//               }}
//               labels='months'
//             />
//             </div>
//           </div>
//             </div>
//           </div>
//         </div>
//     </>
//   )
// }
