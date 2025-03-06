import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(stored);
  }, []);

  const removeCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter((c) => c.login !== username);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img src={candidate.avatar_url} alt={candidate.login} width={50} />
              <p>name: {candidate.name || "null"}</p>
              <p>username:{candidate.login || "null"} </p>
              <p>Location: {candidate.location || "null"}</p>
              <p>Company: {candidate.company || "null"}</p>
              <p>Email: {candidate.email || "null"}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
              <button onClick={() => removeCandidate(candidate.login)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
