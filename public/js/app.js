const todaySphereForm = document.querySelector('form');
const search = document.querySelector('input');
const locationMessage = document.querySelector('#message-1');
const weatherMessage = document.querySelector('#message-2');
const newsMessage = document.querySelector('#message-3');
const dynamicList = document.querySelector('#dynamic-list');
const nasaMessage = document.querySelector('#message-4');
const nasaImage = document.querySelector('#nasa-image');
const boredActivityMessage = document.querySelector('#message-5');
const boredTypeMessage = document.querySelector('#message-6');
const boredParticipantsMessage = document.querySelector('#message-7');

todaySphereForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;

    const loadingMessage = 'Loading... Please Wait';

    locationMessage.textContent = loadingMessage;
    weatherMessage.textContent = loadingMessage;
    newsMessage.textContent = loadingMessage;
    nasaMessage.textContent = loadingMessage;
    boredActivityMessage.textContent = loadingMessage;

    fetch('/home?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMessage.textContent = data.error + ". Please try again.";
                weatherMessage.textContent = "Unable to fetch weather. Please try again.";
                newsMessage.textContent = "Unable to fetch news. Please try again.";
                boredActivityMessage.textContent = "Unable to fetch activity of the day. Please try again."
                nasaMessage.textContent = "Unable to fetch astronomy picture of the day. Please try again."
                
            } else {
                locationMessage.textContent = data.location;
                weatherMessage.textContent = data.forecast;

                            
               boredActivityMessage.textContent = "Activity - " + data.boredActivity;
               boredTypeMessage.textContent = "Type - " + data.boredType.charAt(0).toUpperCase() + data.boredType.slice(1);
               boredParticipantsMessage.textContent = "Participants - " + data.boredParticipants ;
            
               nasaMessage.textContent = "Title - " + data.nasaImageTitle;
               nasaImage.src = data.nasaImageUrl;

                // Clear existing list items
                dynamicList.innerHTML = '';

                // Create and append list items with title, description, and URL
                data.articles.forEach((article) => {
                    const listItem = document.createElement('li');
                    const titleElement = document.createElement('h3');
                    const descriptionElement = document.createElement('p');
                    const urlElement = document.createElement('a');

                    titleElement.textContent = article.title;
                    descriptionElement.textContent = article.description;
                    urlElement.textContent = 'Read More';
                    urlElement.href = article.url;

                    listItem.appendChild(titleElement);
                    listItem.appendChild(descriptionElement);
                    listItem.appendChild(urlElement);

                    newsMessage.textContent = '';
                    dynamicList.appendChild(listItem);
                });


            }


        });
    });

});