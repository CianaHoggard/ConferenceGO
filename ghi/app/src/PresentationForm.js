import React, { useState, useEffect } from 'react';

function PresentationForm() {
  const [conferences, setConferences] = useState([]);
  const [formData, setFormData] = useState({
    presenter_name: '',
    presenter_email: '',
    company_name: '',
    title: '',
    synopsis: '',
    conference: ''
  });

  useEffect(() => {
    async function fetchConferences() {
      const response = await fetch('http://localhost:8000/api/conferences/');
      if (response.ok) {
        const data = await response.json();
        setConferences(data.conferences);
      }
    }
    fetchConferences();
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const conferenceId = formData.conference;
    const locationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        presenter_name: '',
        presenter_email: '',
        company_name: '',
        title: '',
        synopsis: '',
        conference: ''
      });
      const newPresentation = await response.json();
      console.log(newPresentation);
    }
  }

  return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form id="create-presentation-form" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" onChange={handleInputChange}/>
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" onChange={handleInputChange}/>
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" onChange={handleInputChange}/>
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Title" required type="text" name="title" id="title" className="form-control" onChange={handleInputChange}/>
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea className="form-control" id="synopsis" rows="3" name="synopsis" onChange={handleInputChange}></textarea>
              </div>
              <div className="mb-3">
              <select required name="conference" id="conference" className="form-select" onChange={handleInputChange}>
                <option  value="">Choose a conference</option>
                {conferences.map(conf => (
                  <option key={conf.id} value={conf.id}>
                    {conf.name}
                  </option>
                ))}
              </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
  )}

export default PresentationForm;