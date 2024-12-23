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

dropContainer.addEventListener('click', () => {
  if (inputFile.disabled === true) {
    console.log('not enable')
    showToast()
  }
})

function showToast() {
  const toast = document.querySelector(".toast-btn");
  const toastContainer = document.querySelector(".toast-container");
  toastContainer.style.display = 'flex';
  toast.addEventListener('click', () => {
    toastContainer.style.display = "none"
  })
  setTimeout(() => {
    toastContainer.style.display = "none"
  }, 10000)
}

//showToast()

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
      preview.style.display = "flex"
      saveMomentInfo().then(() => {
        setTimeout(() => {
          preview.style.display = "none"
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
      //console.log('Saving MomentInfo...');
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
      //console.log(momentsData);
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
    alert('File exceeded 1MB, Please select a smaller file size, else it you might face some error');
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