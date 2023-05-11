function fetchUser() {
  showSpinner();
  fetch('https://randomuser.me/api')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Sorry! But the api you are trying to use is not available right now.');
      }

      return res.json();
    })
    .then((data) => {
      hideSpinner();
      displayUser(data.results[0]);
    })
    .catch((Error) => {
      hideSpinner();
      document.querySelector('#user').innerHTML = `
      <p class="text-xl text-center text-red-500 mb-5">
      ${Error}</p>`;
    });
}

function displayUser(user) {
  const userDisplay = document.querySelector('#user');

  if (user.gender === 'male') {
    document.body.style.backgroundColor = '#160e5c';
  } else {
    document.body.style.backgroundColor = '#ff00ff';
  }

  userDisplay.innerHTML = `
  <div class="flex justify-between"> 
  <div class="flex">
    <img
      class="w-48 h-48 rounded-full mr-8"
      src="${user.picture.large}"
    />
    <div class="space-y-3">
      <p class="text-xl">
        <span class="font-bold">Name: </span>${user.name.first} ${user.name.last}
      </p>
      <p class="text-xl">
        <span class="font-bold">Email: </span> ${user.email}
      </p>
      <p class="text-xl">
        <span class="font-bold">Phone: </span> ${user.phone}
      </p>
      <p class="text-xl">
        <span class="font-bold">Location: </span> ${user.location.city} ${user.location.country}
      </p>
      <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
      <p class="text-xl"><span class="font-bold">Date Registered: </span> ${user.registered.date}</p>

    </div>
  </div>
</div>
  `;

  console.log(user.picture.large);
}

function showSpinner() {
  document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
  document.querySelector('.spinner').style.display = 'none';
}

document.querySelector('#generate').addEventListener('click', fetchUser);

fetchUser();
