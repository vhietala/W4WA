'use strict';

const modal = document.getElementById('modal');
const span = document.getElementById('close');
const closeButton = document.getElementById('close-button');

const openmodal = (id) => {
  //console.log(id);
  const url = '/files/' + id;
  fetch(url, {
    method: 'get',
  }).then(resp => {
    return resp.json();
  }).then(json => {
    console.log(json);
    const item = json[0];
    document.getElementById('modal-image').setAttribute('src', item.image);
    document.getElementById('modal-header').innerHTML = item.title;
    initMap(item);
    document.getElementById('modal').style.display = 'block';
  });
};

const deleteFile = (id) => {
  const url = '/files/' + id;
  fetch(url, {
    method: 'delete',

  }).then(()=>{
    update();
  });
};

const initMap = item => {
  const myLatLng = {lat: item.coordinates.lat, lng: item.coordinates.lng};

  const map = new google.maps.Map(document.getElementById('modal-map'), {
    center: myLatLng,
    zoom: 10,
  });
  const marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: item.title,
  });
};

const update = () => {
  window.location.reload(false);
};

span.onclick = () => {
  modal.style.display = 'none';
};

closeButton.onclick = () => {
  modal.style.display = 'none';
};
//
window.onclick = event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }

};

document.querySelector('#picForm').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  const fileElement = evt.target.querySelector('input[type=file]');
  const file = fileElement.files[0];

  data.append('file', file);

  const url = '/files/';

  fetch(url, {
    method: 'post',
    body: data,
  }).then((resp) => {
    //return resp.json();
  }).then((json) => {
    console.log(json);
    update();
    // document.getElementById('defaultOpen').click();
    // window.location.reload(false);
    // }).then((resp) => {
    //
  });

});

const changeTab = (tabName) => {
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(tabName).style.display = 'block';
};

document.getElementById('defaultOpen').click();
