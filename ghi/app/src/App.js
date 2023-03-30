import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './Nav';
import React from 'react';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm.js';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Route path="/presentations/new" component={PresentationForm}/>
        <Route path="/conferences/new" component={ConferenceForm} />
        <Route path="/attendees/new" component={AttendConferenceForm} />
        <Route path="/locations/new" component={LocationForm} />
        <Route path="/attendees" component={AttendeesList} />
        <Route path="/main" component={MainPage} index element={<MainPage />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
