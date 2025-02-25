import React, { useState } from 'react';

const Job_Recommedation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery) {
      alert('Please enter a job title!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/recommend-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search_query: searchQuery }),
      });

      const data = await response.json();

      if (response.ok) {
        setJobs(data); // Set the job results
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      alert('Failed to connect to server');
    }
  };

  return (
    <div>
      <h2>Job Search</h2>
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {jobs.length > 0 && (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                View Job
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Job_Recommedation;
