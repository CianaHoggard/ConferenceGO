import React, { useEffect, useState} from 'react';

function ConferenceForm () {

    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [maxPresentations, setMaxPresentations] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleStartsChange = (event) => {
        setStarts(event.target.value);
    }

    const handleEndsChange = (event) => {
        setEnds(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleMaxPresentationsChange = (event) => {
        setMaxPresentations(event.target.value);
    }

    const handleMaxAttendeesChange = (event) => {
        setMaxAttendees(event.target.value);
    }

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = selectedLocation;

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);
            setName('');
            setStarts('');
            setEnds('');
            setDescription('')
            setMaxPresentations('')
            setMaxAttendees('')
            setSelectedLocation('')
        }
      }
    const fetchLocations = async () => {
        const url = 'http://localhost:8000/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setLocations(data.locations);
        }
      }

      useEffect(() => {
        fetchLocations();
      }, []);
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value ={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStartsChange} value ={starts}placeholder="Starts" required type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEndsChange} value ={ends}placeholder="Ends" required type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label onChange = {handleDescriptionChange} value ={description} htmlFor="description">Description</label>
                <textarea className="form-control" id="description" rows="3" name="description"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleMaxPresentationsChange}value ={maxPresentations} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleMaxAttendeesChange} value ={maxAttendees}placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="location">Location</label>
                <select
                    value ={selectedLocation}
                    className="form-control"
                    id="location"
                    name="location"
                    onChange={handleLocationChange}
                    required
                >
                    <option value="" disabled >Select a location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                </select>
            </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      );
    }
export default ConferenceForm;