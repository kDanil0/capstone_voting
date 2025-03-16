import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ElectionCard = ({ id, title, year, status }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to election details page with the election ID
    navigate(`/election/${id}`);
  };

  return (
    <div 
      className="justify-right transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="bg-[#3F4B8C] rounded-xl overflow-hidden shadow-lg">
        <div className="p-6">
          <h3 className="text-white font-climate text-2xl tracking-wider text-left">{title} {year}</h3>
          <p className="text-white font-climate text-xl mt-2"></p>
        </div>
        <div className="bg-[#FFCC00] py-1 text-center">
          <p className="font-bebas text-2xl tracking-wider">{status}</p>
        </div>
        <div className="bg-[#3F4B8C] h-10"></div>
      </div>
    </div>
  );
};

const ElectionSection = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [elections, setElections] = useState({
    ongoing: [
      { id: 1, title: 'SUPREME STUDENT COUNCIL ELECTION', year: '2023', status: 'ONGOING' },
      { id: 2, title: 'CCIS STUDENT COUNCIL ELECTION', year: '2023', status: 'ONGOING' },
      { id: 3, title: 'CON STUDENT COUNCIL ELECTION', year: '2023', status: 'ONGOING' },
      { id: 4, title: 'COC STUDENT COUNCIL ELECTION', year: '2023', status: 'ONGOING' },
    ],
    upcoming: [
      { id: 5, title: 'SSC STUDENT COUNCIL ELECTION', year: '2024', status: 'UPCOMING' },
      { id: 6, title: 'CASSED STUDENT COUNCIL ELECTION', year: '2024', status: 'UPCOMING' },
    ]
  });

  // Function to fetch elections from API
  const fetchElections = async () => {
    try {
      // Example API call - replace with your actual API endpoint
      // const response = await fetch('https://your-api-url/elections');
      // const data = await response.json();
      
      // setElections({
      //   ongoing: data.filter(election => election.status === 'ONGOING'),
      //   upcoming: data.filter(election => election.status === 'UPCOMING')
      // });
      
      // For now, we're using the static data defined above
    } catch (error) {
      console.error('Error fetching elections:', error);
    }
  };

  // Uncomment to fetch data when component mounts
  // useEffect(() => {
  //   fetchElections();
  // }, []);

  return (
    <div className="w-full">
      {/* Section Headers as Tabs - positioned outside with negative margins */}
      <div className="grid grid-cols-2 gap-4 -mx-8 -mt-8 px-8 pt-10 bg-gray-200 py-4 mb-8">
        <div 
          className="col-span-1 cursor-pointer"
          onClick={() => setActiveTab('ongoing')}
        >
          <h2 className={`text-[#3F4B8C] font-climate text-3xl text-center tracking-wider border-b-4 ${activeTab === 'ongoing' ? 'border-[#3F4B8C]' : 'border-transparent'} pb-2 transition-colors duration-300 hover:text-[#2F6B7E]`}>
            ONGOING ELECTION
          </h2>
        </div>
        <div 
          className="col-span-1 cursor-pointer"
          onClick={() => setActiveTab('upcoming')}
        >
          <h2 className={`text-[#3F4B8C] font-climate text-3xl text-center tracking-wider border-b-4 ${activeTab === 'upcoming' ? 'border-[#3F4B8C]' : 'border-transparent'} pb-2 transition-colors duration-300 hover:text-[#2F6B7E]`}>
            UPCOMING ELECTION
          </h2>
        </div>
      </div>

      {/* Election Cards */}
      <div className="grid grid-cols-1 gap-8">
        {/* Show only active tab content */}
        {activeTab === 'ongoing' && (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {elections.ongoing.map((election) => (
              <ElectionCard 
                key={election.id}
                id={election.id}
                title={election.title}
                year={election.year}
                status={election.status}
              />
            ))}
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {elections.upcoming.map((election) => (
              <ElectionCard 
                key={election.id}
                id={election.id}
                title={election.title}
                year={election.year}
                status={election.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectionSection; 