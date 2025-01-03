import { momentsData, removeMoment, searchCategory } from './momentsData.js';

function renderMoments(moments) {
  let momentsHTML = '';
  moments.forEach((moment) => {
    momentsHTML += `
    <div class="content js-container-${moment.id}">
      <div class="image-container">
        <button class="removeMoment" data-moment-id="${moment.id}"> Delete </button>
        <img src="${moment.file}" alt="image.jpg" class="inputImage">
      </div>
      <div class="info">
        <p class="category">Category: <b>${moment.category + ' ' + 'Moment'}</b></p>
        <p class="desc">${moment.desc}</p>
        <p class="date">${moment.date}</p>
      </div>
    </div>
  `;
  });

  document.querySelector('.content-wrapper').innerHTML = momentsHTML;
}

function setupEventListeners() {
  document.querySelectorAll('.removeMoment').forEach((btn) => {
    btn.addEventListener('click', () => {
      const momentId = Number(btn.dataset.momentId);
      removeMoment(momentId);
      const momentContainer = document.querySelector(`.js-container-${momentId}`);
      if (momentContainer) {
        momentContainer.remove();
      }
      renderMoments(momentsData);
    });
  });

  document.querySelector('.js-add-btn').addEventListener('click', () => {
    window.location.href = "addMoments.html";
  });

  const search = document.getElementById('searchBar');
  search.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      let searchInput = search.value.toUpperCase().trim();
      let newSearch = searchCategory(searchInput);
      console.log(newSearch);
      if (typeof newSearch === 'string') {
        renderSearchMessage(newSearch);
      } else {
        renderMoments(newSearch);
      }
      search.value = '';
    }
  });
}

function renderSearchMessage(newSearch) {
  document.querySelector('.content-wrapper').innerHTML = newSearch;
}

// Initial render and setup
renderMoments(momentsData);
setupEventListeners();