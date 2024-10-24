import {momentsData, removeMoment} from './momentsData.js'


function renderMoments() {
  let momentsHTML = '';
  momentsData.forEach((moment) => {
     momentsHTML += `
    <div class="content js-conatiner-${moment.id}">
    <button class="removeMoment" data-moment-id = "${moment.id}"> Remove </button>
      <img src="${moment.file}" alt="image.jpg" width="100px" height="100px">
      <div class="info">
        <p>Category: <b>${moment.category}</b></p>
        <p>${moment.desc}</p>
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
  
}


renderMoments();