import { useState, useEffect, useCallback } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { searchGithub, searchGithubUser } from '../api/API.tsx';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);

      try {
        // 🔥 Fetch a list of candidates
        const data = await searchGithub();
        setCandidates(data);

        // ✅ Fetch additional details for the first candidate
        if (data.length > 0) {
          const userDetails = await searchGithubUser(data[0].login);
          setSelectedCandidate(userDetails);
        }
      } catch (err) {
        setError('Failed to load candidates. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const acceptCandidate = useCallback(() => {
    if (!candidates[currentIndex]) return;

    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    saved.push(candidates[currentIndex]);
    localStorage.setItem('savedCandidates', JSON.stringify(saved));

    setCurrentIndex((prev) => prev + 1);
  }, [candidates, currentIndex]);

  const rejectCandidate = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (currentIndex >= candidates.length) return <p>No more candidates available.</p>;

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} width={100} />
          <p>Name:{selectedCandidate?.name || "N/A"}</p>
          <p>Username:{currentCandidate.login || "N/A"}</p>
          <p>Company:{selectedCandidate?.company || "N/A"}</p>
          <p>Location:{selectedCandidate?.location || "N/A"}</p>
          <p>Email:{selectedCandidate?.email || "N/A"}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
          <br />
          <button onClick={rejectCandidate} style={{ marginRight: '10px' }}>- Reject</button>
          <button onClick={acceptCandidate}>+ Accept</button>
        </>
      )}
    </div>
  );
};

export default CandidateSearch;
