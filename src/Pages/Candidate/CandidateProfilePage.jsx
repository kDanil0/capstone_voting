import React from 'react';
import CandidateProfile from '../../Components/Candidate/CandidateProfile';

const CandidateProfilePage = () => {
  // You could fetch candidate data here from an API
  // const [candidate, setCandidate] = useState(null);
  // useEffect(() => { fetchCandidateData() }, []);
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <CandidateProfile />
    </div>
  );
};

export default CandidateProfilePage; 