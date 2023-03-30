document.addEventListener('DOMContentLoaded', function() {
window.addEventListener('DOMContentLoaded', async () => {
  const selectTag = document.getElementById('conference');

  const url = 'http://localhost:8000/api/conferences/';
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();

    for (let conference of data.conferences) {
      const option = document.createElement('option');
      option.value = conference.href;
      option.innerHTML = conference.name;
      selectTag.appendChild(option);
    }

    const loadingSpinner = document.getElementById('loading-conference-spinner');
    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }
    if (selectTag) {
      selectTag.classList.remove('d-none');
    }

    const form = document.getElementById('attendee-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const response = await fetch('http://localhost:8001/api/attendees/', options);
        if (response.ok) {
            console.log('Attendee successfully added');
            form.classList.add('d-none');
            const successAlert = document.getElementById('success-message');
            successAlert.classList.remove('d-none');
        } else {
            console.error('Error adding attendee');
        }
    });
  }
});
});