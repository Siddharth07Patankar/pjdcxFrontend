import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import ReactSelect from 'react-select';
import './Table.css';
import { useEffect } from 'react';
import { ToastContainer, Zoom, toast } from 'react-toastify';
const TableComponent = () => {
  const [rows, setRows] = useState([
    { id: 1, coin: '', amount: '', target: '' }
  ]);
  const [data, setData] = useState(null);

  const addRow = () => {
    const newRow = { id: rows.length + 1, coin: '', amount: '', target: '' };
    setRows([...rows, newRow]);
  };

  const options = data ? Object.entries(data).map(([value, label]) => ({ value, label })) : [];
  
  const handleAmountChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].amount = event.target.value;
    setRows(updatedRows);
  };

  const handleTargetChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].target = event.target.value;
    setRows(updatedRows);
  };

  const handleLogout = async () => {
      await localStorage.clear();
      window.location.reload();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const coin_info = rows.map(row => ({
      Coin: row.coin.label,
      Amount: row.amount,
      Target: row.target
    }));

    const coin_data = {coin_info};

    fetch('http://34.16.0.31:8000/api/save_csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coin_data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      toast.success(`${data.body}`);
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error(`${error}`);
    });
    // console.log(JSON.stringify(coin_info, null, 2));
  };
  

  useEffect(() => {
    const apiUrl = 'http://34.16.0.31:8000/api/get_coins';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.body);
      })
      .catch(error => {
        console.log(error);
      });
    }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Amount</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>
                {/* ReactSelect component */}
                <ReactSelect 
                  value={row.coin}
                  onChange={(selectedOption) => {
                    const updatedRows = [...rows];
                    updatedRows[index].coin = selectedOption;
                    setRows(updatedRows);
                  }}
                  options={options}
                  placeholder="Search Coins"
                  isSearchable={true}
                /> 
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.amount}
                  onChange={(event) => handleAmountChange(index, event)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.target}
                  onChange={(event) => handleTargetChange(index, event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant='dark' onClick={addRow}>Add Row</Button>{' '}
      <Button variant='success' onClick={handleSubmit}>Submit</Button>

      <div className='logout-btn'>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

    <ToastContainer
        limit={1}
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ minWidth: "100px" }}
        transition={Zoom}
        />
    </>
  );
};

export default TableComponent;

