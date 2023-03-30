import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
async function loadAttendees(){
  const response = await fetch('http://localhost:8001/api/attendees/');
  if(response.ok){
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App attendees={data.attendees} />
      </React.StrictMode>
    );
  }else{
    console.error(response)
  }
  console.log(response);
}
loadAttendees();
