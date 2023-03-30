window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const selectTag = document.getElementById('state');
      for (let state of data.states) {
        const option = document.createElement('option');
        option.value = state.abbreviation;
        option.innerHTML = state.name;
        selectTag.appendChild(option);
      }

      const formTag = document.getElementById('create-location-form')
      formTag.addEventListener('submit', async event => {
        event.preventDefault()
        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData))
        console.log(json)
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
              'Content-Type': 'application/json',
            },
          };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
            console.log(newLocation);
    }})
    } catch (error) {
      console.error(`Fetch Error: ${error}`);
    }
  });
