# "The universe and beyond" app: Discover the Star Wars planets and create your own

In this application, you can discover the Star Wars API planets and you can add your own.

## Introduction

This React application fetches data from an external API (SWAPI) and displays it in the app. You can also create your own planets. It includes multiple components, such as Home, PlanetsAPI, PlanetDetails, AddPlanet and Navbar. 

The App component fetches planet data from the Star Wars API and stores it. The PlanetsAPI component then uses this data to display a list of planets, along with their details, such as climate, terrain, and population. The component also includes a search bar that allows users to filter the planets based on their name, climate, or terrain. The PlanetsAPI component also includes functionality that allows users to navigate between pages of the planet data with next and Previous buttons. It is also possible to edit and remove a planet locally.

Finally, the application includes an AddPlanet component, where the user can create their own planet, which will be stored and displayed locally.


<br>
Below you can find some screenshots of how the app looks like.
<br>

The homepage:
<img src="./src/assets/images/homepage.png">

The Star Wars planets:
<img src="./src/assets/images/planetsSWAPI.png">


The Star Wars planet details:
<img src="./src/assets/images/planetdetails.png">


The create-your-own-planet page:
<img src="./src/assets/images/addplanet.png">


## Instructions

Please read the instructions below for a smooth set-up:

### `Set-up`

1) Download or clone this repository
2) run  `npm install`
3) run  `npm start`

    This will un the app in the development mode.

    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

    The page will reload when you make changes.\
    You may also see any lint errors in the console.

### `Testing`

To test the app, run `npm test` in the terminal.

### `Technologies used`

This app is running on HTML, CSS and Javascript (ReactJS).

### `Credits and licenses`

For this project, the Star Wars API (SWAPI) is used. The SWAPI is an open-source API that grants access to information regarding the Star Wars universe. It was developed and is currently managed by Paul Hallett and a team of collaborators. Further details regarding the SWAPI and its contributors can be found on the official website at https://swapi.dev/about.

### `About the author`

For any questions, inquiries or suggestions related to this app, please contact Eveline Coenegrachts at evelinecoenegrachts@gmail.com.


