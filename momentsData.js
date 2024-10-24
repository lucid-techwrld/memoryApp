export let momentsData = JSON.parse(localStorage.getItem('moment'));

if (!momentsData) {
  momentsData = [
    {
      id: 1,
      file: 'images/happy.jpeg',
      category: 'Happy',
      desc: 'Im so Happy'
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