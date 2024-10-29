export let momentsData = JSON.parse(localStorage.getItem('moment'));

if (!momentsData) {
  momentsData = [
    {
      id: 1,
      file: 'images/happy.jpeg',
      category: 'Lovely',
      desc: "Sunday Mourning with my Sister🥰",
      date: 'October 21, 2024'
    }
  ]
}


export function saveToStorage() {
  try {
    console.log('Saving Moment....');
    localStorage.setItem('moment', JSON.stringify(momentsData));
    console.log('Saved to localStorage successfull!!!');
  } catch (e) {
    console.error('Error saving:',
      e);
    alert('An error occurred while saving your moment. Please try again later.');
  }

}

export function removeMoment(mId) {
  let newMoment = [];
  momentsData.forEach((moments) => {
    if (moments.id !== mId) {
      newMoment.push(moments);
      console.log(newMoment);
      console.log('Deleted Succesfully!!')
    }
  });

  momentsData = newMoment;
  saveToStorage();
}

export function searchCategory(searchInput) {
  let matchingCategory = momentsData.filter((moment) => {
   return moment.category === searchInput
  });
  if (matchingCategory.length === 0) {
    return 'No Matching Category'
  } else {
    return matchingCategory;
  }
}