// select friends button
const friends = document.querySelector('.friends');
const home = document.querySelector('.home');
const contentDiv = document.querySelector('.content');

friends.addEventListener('click', function () {

    resetUI();

    //UI Add/Delete
    home.classList.remove('pure-menu-selected')
    friends.classList.add('pure-menu-selected')

    // Create Friends DOM 
    contentDiv.appendChild(createFriendsDom())
    // Fetch
    async function fetchFriends() {
        let res = await fetch('../friends/friends.json')
        let data = await res.json();
        const sortedData = data.sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
        return sortedData;
    }

    fetchFriends()
        .then(data => data.forEach(function (friends) {
            contentDiv.firstChild.lastChild.appendChild(createLiFriends(friends.firstName, friends.lastName, friends.id));
        }))
        .catch(err => console.log(err.message))
})

home.addEventListener('click', function () {

    resetUI();

    //UI Add/Delete
    friends.classList.remove('pure-menu-selected')
    home.classList.add('pure-menu-selected')
})

//////////////////////////////////////
// Display Friends
/////////////////////////////////////

// create Friends Div Function
function createFriendsDom() {
    const createDiv = document.createElement('div');
    const createSpan = document.createElement('span');
    const createUl = document.createElement('ul');
    const createSpanTitle = document.createTextNode('Friends')

    createDiv.classList.add('pure-menu', 'custom-restricted-width');
    createSpan.classList.add('pure-menu-heading');
    createUl.classList.add('pure-menu-list');

    createSpan.appendChild(createSpanTitle)
    createDiv.appendChild(createSpan);
    createDiv.appendChild(createUl);

    return createDiv;

}

function createLiFriends(firstName, lastName, id) {

    // Create LIstitem
    const createLi = document.createElement('li')
    createLi.classList.add('pure-menu-item')

    // Create A Tag
    const createA = document.createElement('a');
    createA.href = '#';
    createA.classList.add('pure-menu-link')
    createA.setAttribute('data-id', id);

    // Create text node 
    const aTextNode = document.createTextNode(`${firstName} ${lastName}`);

    // append all elements
    createA.appendChild(aTextNode);
    createLi.appendChild(createA)

    return createLi
}

// Reset UI
function resetUI() {
    if (contentDiv.firstChild != null) {
        contentDiv.removeChild(contentDiv.firstChild);
    }
}


//////////////////////////////////////
// Display individual Friend
/////////////////////////////////////

contentDiv.addEventListener('click', function (e) {

    resetUI()

    async function fetchFriend() {
        let res = await fetch(`../friends/${e.toElement.dataset.id}.json`)
        let data = await res.json();
        return data;
    }

    fetchFriend()
        .then(data => contentDiv.appendChild(createFriendDOM(data)))
        .catch(err => console.log(err.message))

})

// create Friend DOM
function createFriendDOM(data) {

    // Create all elements
    const container = document.createElement('div');
    const identityDiv = document.createElement('div');
    const avatarImg = document.createElement('img');
    const h2 = document.createElement('h2');
    const ul = document.createElement('ul');
    const emailLi = document.createElement('li');
    const hometownLi = document.createElement('li');
    const bioP = document.createElement('p');

    // Add Classes
    container.classList.add('friend')
    identityDiv.classList.add('identity')
    avatarImg.classList.add('photo')
    h2.classList.add('name')
    emailLi.classList.add('label')
    hometownLi.classList.add('label')
    bioP.classList.add('bio')

    // Create Text nodes
    const h2Text = document.createTextNode(`${data.firstName} ${data.lastName}`);
    avatarImg.src = `../img/${data.avatar}`;
    const emailText = document.createTextNode(data.email);
    const hometownText = document.createTextNode(data.hometown);
    const bioText = document.createTextNode(data.bio);

    // append text nodes
    h2.appendChild(h2Text);
    emailLi.appendChild(emailText);
    hometownLi.appendChild(hometownText);
    bioP.appendChild(bioText);

    // create DOM Tree
    ul.appendChild(emailLi);
    ul.appendChild(hometownLi);

    identityDiv.appendChild(avatarImg);
    identityDiv.appendChild(h2);
    identityDiv.appendChild(ul);

    container.appendChild(identityDiv);
    container.appendChild(bioP);

    return container;
}
