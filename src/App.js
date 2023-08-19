import './App.css';
import Header from './components/Header/Header';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card1 from './components/Header/card1/Card1';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ErrorIcon from "@mui/icons-material/Error";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";

function App() {

  const [receivedGrouping, setReceivedGrouping] = useState('status');
  const [receivedOrdering, setReceivedOrdering] = useState('priority');

  const [statusArray2, setstatusArray2] = useState([])
  const [priorityArray2, setpriorityArray2] = useState([])
  const [userArray2, setuserArray2] = useState([])

  const [dataForStatus, setdataForStatus] = useState({})
  const [dataForPriority, setdataForPriority] = useState({})
  const [dataForUser, setdataForUser] = useState({})

  let responseData = false

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const handleValueFromChildGroup = (value) => {
    setReceivedGrouping(value);
  };

  const handleValueFromChildOrder = (value) => {
    setReceivedOrdering(value);
    if (value == 'title') {
      switch (receivedGrouping) {
        case 'status':
          statusArray2.forEach((q) => {
            let tempData = dataForStatus[q]
            tempData.sort((a, b) => a.title.localeCompare(b.title));
            combinedDataStatus[q] = tempData
          })
          setdataForStatus(combinedDataStatus)
          break;
        case 'user':
          userArray2.forEach((q) => {
            let tempData = dataForUser[q]
            tempData.sort((a, b) => a.title.localeCompare(b.title));
            combinedDataUser[q] = tempData
          })
          setdataForUser(combinedDataUser)

          break;
        case 'priority':
          priorityArray2.forEach((q) => {
            let tempData = dataForPriority[q]
            tempData.sort((a, b) => a.title.localeCompare(b.title));
            combinedDataPriority[q] = tempData
          })
          setdataForPriority(combinedDataPriority)
          break;
      }
    } else {
      switch (receivedGrouping) {
        case 'status':
          statusArray2.forEach((q) => {
            let tempData = dataForStatus[q]
            tempData.sort((a, b) => b.priority - a.priority);
            combinedDataStatus[q] = tempData
          })
          setdataForStatus(combinedDataStatus)
          break;
        case 'user':
          userArray2.forEach((q) => {
            let tempData = dataForUser[q]
            tempData.sort((a, b) => b.priority - a.priority);
            combinedDataUser[q] = tempData
          })
          setdataForUser(combinedDataUser)

          break;
        case 'priority':
          priorityArray2.forEach((q) => {
            let tempData = dataForPriority[q]
            tempData.sort((a, b) => b.priority - a.priority);
            combinedDataPriority[q] = tempData
          })
          setdataForPriority(combinedDataPriority)
          break;
      }
    }

  };

  const combinedDataStatus = {};
  const combinedDataPriority = {};
  const combinedDataUser = {};

  let statusArray = []
  let priorityArray = []
  let userArray = []

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {

        setTickets(response.data.tickets)
        setUsers(response.data.users)

        if (!responseData) {
          response.data.tickets.forEach(item => {
            const status = item.status;
            const priority = item.priority;
            const userId = item.userId;

            const matchingUser = response.data.users.find(user => user.id === userId);


            if (!combinedDataStatus[status]) {
              combinedDataStatus[status] = [];
              statusArray.push(status)
            }

            if (!combinedDataPriority[priority]) {
              combinedDataPriority[priority] = [];
              priorityArray.push(priority)
            }

            const user = response.data.users.find(user => user.id === item.userId);
            const combinedItem = {
              ...item,
              userName: user ? user.name : null,
              userAvailable: user ? user.available : null
            };
            combinedDataStatus[status].push(combinedItem);
            combinedDataPriority[priority].push(combinedItem);

            if (matchingUser) {
              const userName = matchingUser.name;

              if (!combinedDataUser[userName]) {
                combinedDataUser[userName] = [];
                userArray.push(userName)
              }
              combinedDataUser[userName].push({
                ...item,
                userAvailable: matchingUser.available,
                userName: userName
              });
            }



          });
          setstatusArray2(statusArray)
          setpriorityArray2(priorityArray)
          setuserArray2(userArray)
          setdataForStatus(combinedDataStatus)
          setdataForPriority(combinedDataPriority)
          setdataForUser(combinedDataUser)
          handleValueFromChildOrder(receivedOrdering)
        }

        responseData = true


      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className="App" style={{ fontFamily: 'CustomFont, sans-serif' }}>
      <Header onGroupingChange={handleValueFromChildGroup} onOrderingChange={handleValueFromChildOrder} />

      {receivedGrouping === 'status' ?
        <>

          <div className="container" >
            {statusArray2.map((item, index) => (
              <div className="dynamic-element" key={index}>
                <div >
                  {item == "Todo" ? <RadioButtonUncheckedIcon /> : null}{item == "In progress" ? <HourglassBottomIcon /> : null}{item == "Backlog" ? <RotateLeftIcon /> : null}{item == "Done" ? <CheckCircleIcon /> : null}{item == "Canceled" ? <CancelIcon /> : null} <span style={{ position: 'relative', bottom: '6px' }}><b>{item}</b> - {dataForStatus[item].length}</span>
                </div>
                {dataForStatus[item].map((item2, index) => (
                  <Card1 id={item2.id} title={item2.title} user={item2.userName} tag={item2.tag} priority={item2.priority} type={receivedGrouping} />
                ))}

              </div>

            ))}

          </div>


        </>
        :
        null
      }

      {receivedGrouping === 'user' ?
        <>

          <div className="container" >
            {userArray2.map((item, index) => (
              <div className="dynamic-element" key={index}>
                <div >

                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Avatar sx={{ bgcolor: deepOrange[500], width: '25px', height: '25px' }}>
                        <span>
                          {item.split(" ")[0][0]}{" "}
                        </span>

                      </Avatar>
                    </Grid>
                    <Grid item xs={10}>

                      {item} {dataForUser[item].length}
                    </Grid>
                  </Grid>
                </div>

                {dataForUser[item].map((item2, index) => (
                  <Card1 id={item2.id} title={item2.title} user={item2.userName} tag={item2.tag} priority={item2.priority} type={receivedGrouping} status={item2.status} />
                ))}

              </div>

            ))}

          </div>

        </>
        :
        null
      }

      {receivedGrouping === 'priority' ?
        <>

          <div className="container" >
            {priorityArray2.map((item, index) => (
              <div className="dynamic-element" key={index}>
                <div >
                  {item == 0 ? <><span > <MoreHorizIcon /> <span style={{ position: 'relative', bottom: '6px' }}>No Priority</span></span></> : null}{item == 1 ? <><span> <SignalCellularAlt1BarIcon /><span style={{ position: 'relative', bottom: '6px' }}>Low</span> </span></> : null}{item == 2 ? <><span> <SignalCellularAlt2BarIcon /> <span style={{ position: 'relative', bottom: '6px' }}>Medium</span></span></> : null}{item == 3 ? <><span> <SignalCellularAltIcon /> <span style={{ position: 'relative', bottom: '6px' }}>High</span></span></> : null}{item == 4 ? <><span><ErrorIcon /> <span style={{ position: 'relative', bottom: '6px' }}>Urgent</span></span></> : null} <span style={{ position: 'relative', bottom: '6px' }}> - {dataForPriority[item].length}</span>
                </div>

                {dataForPriority[item].map((item2, index) => (
                  <Card1 id={item2.id} title={item2.title} user={item2.userName} tag={item2.tag} priority={item2.priority} type={receivedGrouping} status={item2.status} />
                ))}

              </div>

            ))}

          </div>

        </>
        :
        null
      }
    </div>
  );
}

export default App;
