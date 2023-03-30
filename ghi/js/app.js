function createCard(name, description, pictureUrl, starts, ends, location) {
    return `

        <div class="col" >
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <div class="card">
                    <img src="${pictureUrl}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                    <p class="card-text">${description}</p>
                    </div>
                    <div class="card-footer">
                        ${new Date(starts).toLocaleDateString()} -
                        ${new Date(ends).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>

    `;
  }

  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log("something went wrong")
      } else {
        const data = await response.json();


        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const starts = details.conference.starts;
            const ends = details.conference.ends;
            const location = details.conference.location.name;
            const html = createCard(title, description, pictureUrl, starts,ends, location);
            const column = document.querySelector('.row');
            column.innerHTML += html;
          }
        }

      }
    } catch (e) {
        console.log("There was an error" + e)
    }

  });
