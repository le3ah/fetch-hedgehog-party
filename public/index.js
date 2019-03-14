const getHedgehogs = () => {
  $('#hedgehog-info').html('');

  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
  //fetch request takes two arguments, the first is required and in the above example,
  // is a URL (can also be an API endpoint).  The second is not required, but could
  // include an object of configuration settings for the request
    .then(response => response.json())
    /* .then() is the first of two methods we receive from the promise; once the response object
    is available, the first .then() block will fire and in this instance converts the body into
    a JSON data structure and returns another Promise, which is why we can chain another .then()*/
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    /* adding this second .then() is promise chaining. We are calling the appendHedgehogs method
    from below, which takes hedgehogs as an argument */
    .catch(error => console.error({ error }));
    /* if the request block fails, the .catch() block will run and we will log the error to the console*/
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const addNewHedgehog = () => {
  event.preventDefault();
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      "name": $("#name").val(),
      "hoglets": $("#hoglets").val(),
      "allergies": $("#allergies").val()
    })
  })
  .then((response) => response.json())
  .catch((error) => console.error({error}))
  console.log("we are in the addNewHedgehog function")
};

const unInviteHedgehog = () => {
  event.preventDefault();
  var id = event.target.id
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites/${id}`, {
    method: 'DELETE',
    headers: { 'Access-Control-Allow-Methods': "DELETE" },
    })
  console.log("we are in the unInviteHedgehog function");
};

getHedgehogs();

$('#invite-btn').on('click', addNewHedgehog);

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
