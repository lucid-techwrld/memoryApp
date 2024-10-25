import { momentsData, saveToStorage, removeMoment } from './momentsData.js';

const addBtn = document.getElementById('addMoment');
const desc = document.getElementById('description');
const category = document.getElementById('Category');
const inputFile = document.getElementById('fileInput');
const preview = document.querySelector('.preview');
const dropContainer = document.getElementById("dropcontainer")

dropContainer.addEventListener("dragover", (e) => {
  // prevent default to allow drop
  e.preventDefault()
}, false)

dropContainer.addEventListener("dragenter", () => {
  dropContainer.classList.add("drag-active")
})

dropContainer.addEventListener("dragleave", () => {
  dropContainer.classList.remove("drag-active")
})

dropContainer.addEventListener("drop", (e) => {
  e.preventDefault()
  dropContainer.classList.remove("drag-active")
  inputFile.files = e.dataTransfer.files
})

let url = '';

function enableInput() {
  // Check if both description and category have values
  if (desc.value !== '' && category.value !== '') {
    inputFile.disabled = false;
  } else {
    inputFile.disabled = true;
  }
}

enableInput();

desc.addEventListener('change', enableInput);
category.addEventListener('change', enableInput);

inputFile.addEventListener('change', (event) => {
  readFile(event.target.files[0]);

});

enableInput();

addBtn.addEventListener('click', () => {
  if (inputFile.files.length > 0 && desc.value !== '' && category.value !== '') {

    try {
      const pElement = document.createElement('p');
      pElement.textContent = 'Loading...'
      preview.appendChild(pElement);
      console.log('Loading...');
      saveMomentInfo().then(() => {
        setTimeout(() => {
          preview.removeChild(pElement)
          window.location.href = "index.html"
        }, 4000)
      }).catch((error) => {
        throw error
      })
    } catch (e) {
      throw e
    }
  }
  else {
    console.log('Enter the right info pls')
  }
});

function saveMomentInfo() {
  return new Promise((resolve, reject) => {
    try {
      console.log('Saving MomentInfo...');
      const id = Date.now();
      const date = new Date();
      date.toUTCString();
      //console.log(id)
      //let fileDataURL = '';
      momentsData.push({
        id,
        file: fileDataURL,
        category: category.value,
        desc: desc.value,
        date
      });
      console.log(momentsData);
      saveToStorage();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}


let fileDataURL = ''; // Variable to hold the dataURL

// Function to read the file

function readFile(file) {
  const maxSize = 1 * 1024 * 1024;
  if (file.size > maxSize) {
    alert('File exceeded 1MB, Please select a smaller file size');
    return;
  }
  const reader = new FileReader();

  reader.onload = function(event) {
    fileDataURL = event.target.result;
    //console.log('Processing image');
    // Save dataURL to variable
    //saveMomentInfo(fileDataURL); // Call another function to use the dataURL
  };

  reader.readAsDataURL(file); // Read the file as data URL
}


//console.log(fileDataURL);