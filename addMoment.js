import { momentsData, saveToStorage, removeMoment } from './momentsData.js';

const addBtn = document.getElementById('addMoment');
const desc = document.getElementById('description');
const category = document.getElementById('Category');
const inputFile = document.getElementById('fileInput');
const preview = document.querySelector('.preview');

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
    saveMomentInfo();
    setTimeout(() => {
      preview.removeChild(pElement)
    }, 3000)
    
  } catch (e) {
    throw e
  }
}
else {
  console.log('Enter the right info pls')
}
});

function saveMomentInfo() {
  try {
    //console.log('Saving MomentInfo...');
    const id = Date.now();
    //console.log(id)
    momentsData.push({
      id,
      file: fileDataURL,
      category: category.value,
      desc: desc.value
    });

    //console.log(momentsData);

    saveToStorage()
  } catch (e) {
    throw e
  }

}


let fileDataURL = ''; // Variable to hold the dataURL

// Function to read the file

function readFile(file) {
  if (!file) {
    console.error('No file Selected');
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
