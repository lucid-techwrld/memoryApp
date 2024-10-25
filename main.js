import {momentsData, removeMoment} from './momentsData.js'

function renderMoments() {
  let momentsHTML = '';
  momentsData.forEach((moment) => {
     momentsHTML += `
    <div class="content js-conatiner-${moment.id}">
    <div class="image-container">
    <button class="removeMoment" data-moment-id = "${moment.id}"> Delete </button>
      <img src="${moment.file}" alt="image.jpg" class="inputImage">
      </div>
      <div class="info">
        <p class="category">Category: <b>${moment.category + ' ' +'Moment'}</b></p>
        <p class="desc">${moment.desc}</p>
        <p class="date"> ${moment.date}</p>
      </div>
    </div>
  `;
  //console.log(moment.file);
  })
   
  
  document.querySelector('.content-wrapper').innerHTML = momentsHTML;
  
  document.querySelectorAll('.removeMoment').forEach((btn) => {
    btn.addEventListener('click', () => {
      const momentId = Number(btn.dataset.momentId);
      removeMoment(momentId);
      const momentConatiner = document.querySelector(`.js-container-${momentId}`)
      if (momentConatiner) {
        momentConatiner.remove();
      }
      renderMoments();
    });
  });
  
  document.querySelector('.js-add-btn').addEventListener('click', () => {
    window.location.href = "addMoments.html"
  })
  
}


renderMoments();