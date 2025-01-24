import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MigrationDashboard() {
  const [migrations, setMigrations] = useState([]);

  useEffect(() => {
    axios.get('api/migration')
      .then(Response => setMigrations(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const startMigration = (tableName) => {
    axios.post('api/migration', { tableName })
      .then(response => {
        setMigrations([...migrations, response.dta]);
      })
      .catch(error => console.error('Error: ', error))
  };

  return (
    <div>
      <h1>Migration Dashboard</h1>
      <button onClick={() => startMigration('SampleTable')}>
        Start Migration
      </button>
      <div>
        {migrations.map(job => (
          <div key={job.id}>
            <h3>{job.tableName}</h3>
            <p>Status: {job.status}</p>
            <p>Progress: {job.processedRecords}/{job.totalRecords}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MigrationDashboard;