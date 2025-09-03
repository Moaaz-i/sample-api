let searchInput = document.getElementById('search');
let data = {};

let error = document.createElement('p');
error.className = 'text-danger';
document.getElementById('searchContainer')?.appendChild(error);

function getMeal(name = 'pizza') {
  let Http = new XMLHttpRequest();
  Http.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${name}`);
  Http.responseType = 'json';

  Http.onload = () => {
    try {
      data = Http.response.recipes;

      if (!data || data.length === 0) {
        error.innerHTML = `No results found for "<strong>${name}</strong>". Showing "pizza" instead.`;
        return;
      } else {
        error.innerHTML = '';
      }

      displayMeals();
    } catch (err) {
      error.innerHTML = `Error processing data: ${err.message}`;
      if (name !== 'pizza') {
        getMeal('pizza');
      }
    }
  };

  Http.onerror = () => {
    error.innerHTML = `Failed to connect to server.`;
  };

  Http.send();
}

function displayMeals() {
  const container = document.getElementById('row');
  container.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    let col = document.createElement('div');
    col.className = 'col-md-3 mb-4';

    let card = document.createElement('div');
    card.className = 'card h-100';

    let img = document.createElement('img');
    img.src = data[i].image_url;
    img.alt = 'Meal Image';
    img.className = 'card-img-top';
    img.style.width = '100%';
    img.style.height = '200px';
    img.style.objectFit = 'cover';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = data[i].title.split(' ', 2).join(' ');

    cardBody.appendChild(title);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    container.appendChild(col);
  }
}

getMeal();

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();

  if (query.length >= 2) {
    getMeal(query);
  } else {
    getMeal();
  }
});
