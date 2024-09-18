import React from 'react';
// import EmailIcon from '@mui/icons-material/Email';
import Filter from '../components/Filter';
import NoteCard from '../components/noteCards';

function HomePage() {
  return (
    <div style={{ backgroundColor: "#c0c0c0", minHeight: "100vh", padding: "6rem" }}> 
      <Filter />
      <NoteCard />
    </div>
  );
}

export default HomePage;
