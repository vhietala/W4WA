'use strict';

const modal = document.getElementById('modal');
const span = document.getElementsByClassName('close')[0];
const closeButton = document.getElementById('close-button');
const prevButton = document.getElementById('previous-sort');
const nextButton = document.getElementById('next-sort');
let picArray = [];
const filteredArray = [];

// const fillDiv = itemsArray => {
//   for (const item of itemsArray) {
//     const div = document.createElement('div');
//     const img = document.createElement('img');
//     const title = document.createElement('h1');
//     const details = document.createElement('p');
//     const button = document.createElement('button');
//     const deleteButton = document.createElement('button');
//     const editButton = document.createElement('button');
//     const date = document.createElement('p');
//     img.src = item.thumbnail;
//     div.className = 'kitten';
//     title.textContent = item.title;
//     details.textContent = item.details;
//     button.textContent = 'View';
//     editButton.textContent = 'Edit';
//     deleteButton.textContent = 'Delete';
//     const imgDate = new Date(item.time);
//     date.textContent = imgDate.toLocaleDateString();
//     div.appendChild(img);
//     div.appendChild(title);
//     div.appendChild(details);
//     div.appendChild(date);
//     div.appendChild(button);
//     div.appendChild(editButton);
//     div.appendChild(deleteButton);
//     button.addEventListener('click', evt => {
//       console.log(evt.target);
//       document.querySelector(modalImage).setAttribute('src', item.image);
//       document.getElementById('modal-header').innerHTML = item.title;
//       modal.style.display = 'block';
//       initMap(item);
//       console.log(item.title);
//     });
//     deleteButton.addEventListener('click', evt => {
//       console.log(evt.target);
//       const url = '/delete/' + item._id;
//       fetch(url, {
//         method: 'delete',
//       }).then(resp => {
//         console.log(resp);
//         update();
//       });
//     });
//     editButton.addEventListener('click', evt => {
//       console.log(evt.target);
//       fillEditDiv(item);
//     });
//     document.querySelector(container).appendChild(div);
//   }
// };
//
// const initMap = item => {
//   const myLatLng = {lat: item.coordinates.lat, lng: item.coordinates.lng};
//
//   const map = new google.maps.Map(document.getElementById('modal-map'), {
//     center: myLatLng,
//     zoom: 10,
//   });
//   const marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: item.title,
//   });
// };
//
// const dynamicSort = property => {
//   let sortOrder = 1;
//   if (property[0] === '-') {
//     sortOrder = -1;
//     property = property.substr(1);
//   }
//   return (a, b) => {
//     let result = (a[property] < b[property]) ?
//         -1 :
//         (a[property] > b[property]) ?
//             1 :
//             0;
//     return result * sortOrder;
//   };
// };
//
// const categoryButtonsDiv = '.category-buttons';
//
// const addCategoryButtons = items => {
//   document.querySelector(categoryButtonsDiv).innerHTML = '';
//   const buttonAll = document.createElement('button');
//   buttonAll.textContent = 'All';
//   buttonAll.addEventListener('click', evt => {
//     clearContainer();
//     fillDiv(this.picArray);
//     this.filteredArray = this.picArray;
//   });
//   document.querySelector(categoryButtonsDiv).appendChild(buttonAll);
//
//   const itemCategories = items.map(item => item.category).sort().
//       reduce((accumulator, current) => {
//         const length = accumulator.length;
//         if (length === 0 || accumulator[length - 1] !== current) {
//           accumulator.push(current);
//         }
//         return accumulator;
//       }, []);
//   // console.log('joo'+itemCategories.toString());
//   for (const item of itemCategories) {
//     const button = document.createElement('button');
//     button.textContent = item;
//     button.addEventListener('click', evt => {
//       //console.log(evt.target);
//       clearContainer();
//       //this.filteredArray = this.picArray.filter(c => c.category === item);
//       const url = '/find/' + item +'/category';
//       fetch(url, {
//         method: 'get',
//       }).then(resp => {
//         return resp.json();
//       }).then(json => {
//         console.log(JSON.stringify(json));
//         this.filteredArray = json;
//         fillDiv(json);
//       });
//       //fillDiv(this.filteredArray);
//       console.log(item.title);
//     });
//     document.querySelector(categoryButtonsDiv).appendChild(button);
//   }
// };
//
// const getAllFromDb = () => {
//   const url = '/getdata';
//   fetch(url, {
//     method: 'get',
//   }).then(resp => {
//     return resp.json();
//   }).then(json => {
//     this.picArray = json;
//     clearContainer();
//     fillDiv(json);
//     addCategoryButtons(json);
//     this.filteredArray = this.picArray;
//   });
// };
//
// const update = () => {
//   getAllFromDb();
// };
//
// span.onclick = () => {
//   modal.style.display = 'none';
// };
//
// closeButton.onclick = () => {
//   modal.style.display = 'none';
// };
//
// window.onclick = event => {
//   if (event.target === modal) {
//     modal.style.display = 'none';
//   }
//
// };
//
// let sortIndex = 0;
// //const sorter = ['id', 'category', 'time'];
// const sorter = ['category', 'time', 'id'];
//
// document.getElementById('sort-text').innerHTML = sorter[sortIndex];
//
// const container = '.container';
// const editContainer = '.EditDiv';
// const modalImage = '#modal-image';
//
// const length = sorter.length;
//
// const clearContainer = () => {
//   document.querySelector(container).innerHTML = '';
// };
//
// prevButton.addEventListener('click', () => {
//   if (sortIndex === 0) {
//     sortIndex = length - 1;
//   } else {
//     sortIndex -= 1;
//   }
//   const items = this.filteredArray.sort(dynamicSort(sorter[sortIndex]));
//   clearContainer();
//   document.getElementById('sort-text').innerHTML = sorter[sortIndex];
//   fillDiv(items);
//   console.log(items);
// });
//
// nextButton.addEventListener('click', () => {
//   if (sortIndex === length - 1) {
//     sortIndex = 0;
//   } else {
//     sortIndex += 1;
//   }
//   const items = this.filteredArray.sort(dynamicSort(sorter[sortIndex]));
//   clearContainer();
//   document.getElementById('sort-text').innerHTML = sorter[sortIndex];
//   fillDiv(items);
//   console.log(items);
// });
//
const changeTab = (evt, tabName) => {

  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
};
document.getElementById('defaultOpen').click();
//
// document.querySelector('#picForm').addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const data = new FormData(evt.target);
//   const fileElement = evt.target.querySelector('input[type=file]');
//   const file = fileElement.files[0];
//
//   data.append('file', file);
//
//   const url = '/new';
//
//   fetch(url, {
//     method: 'post',
//     body: data,
//   }).then((resp) => {
//     //return resp.json();
//   }).then((json) => {
//     console.log(json);
//     update();
//     document.getElementById('defaultOpen').click();
//     // }).then((resp) => {
//     //
//   });
//
// });
//
// update();
// // addCategoryButtons(picArray);
//
// const fillEditDiv=(item)=>{
//   const form = document.createElement('form');
//   const title = document.createElement('input');
//   title.placeholder=item.title;
//
//   form.appendChild(title);
//
//   document.querySelector(editContainer).appendChild(form);
//
// };