import React, { useState, useEffect } from 'react';
import { getTables, addTable, updateTableStatus, deleteTable } from '../api/api';

function Tables() {
  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await getTables();
      setTables(res.data);
    } catch (err) {
      setMessage('Error fetching tables');
    }
  };

  const handleAddTable = async () => {
    if (!tableNumber || !capacity) {
      setMessage('Please fill all fields!');
      return;
    }
    try {
      await addTable({ tableNumber: parseInt(tableNumber), capacity: parseInt(capacity) });
      setMessage('Table added successfully! ✅');
      setTableNumber('');
      setCapacity('');
      fetchTables();
    } catch (err) {
      setMessage('Error adding table ❌');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTableStatus(id, status);
      fetchTables();
    } catch (err) {
      setMessage('Error updating status ❌');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTable(id);
      setMessage('Table deleted ✅');
      fetchTables();
    } catch (err) {
      setMessage('Error deleting table ❌');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>🪑 Add New Table</h2>
        {message && <p style={{ color: '#e74c3c', marginBottom: '10px' }}>{message}</p>}
        <div className="form-row">
          <input
            type="number"
            placeholder="Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddTable}>
            Add Table
          </button>
        </div>
      </div>

      <div className="card">
        <h2>🪑 All Tables</h2>
        <div className="table-wrapper">
          <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Table No</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map(table => (
              <tr key={table.id}>
                <td>{table.id}</td>
                <td>Table {table.tableNumber}</td>
                <td>{table.capacity} persons</td>
                <td>
                  <span className={`badge badge-${table.status.toLowerCase()}`}>
                    {table.status}
                  </span>
                </td>
                <td className="action-buttons">
                  {table.status === 'AVAILABLE' ? (
                    <button className="btn btn-warning" onClick={() => handleStatusChange(table.id, 'OCCUPIED')}>
                      Mark Occupied
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={() => handleStatusChange(table.id, 'AVAILABLE')}>
                      Mark Available
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDelete(table.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    </div>
  );
}

export default Tables;