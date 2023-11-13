# Weather App

<img width="499" alt="Screenshot 2023-11-13 at 22 57 04" src="https://github.com/NotMash/weather-react-api/assets/75740933/9d88de4a-d0c0-4746-b488-74d12fe193d6">


<img width="466" alt="Screenshot 2023-11-13 at 22 57 36" src="https://github.com/NotMash/weather-react-api/assets/75740933/57feba02-567c-47af-9287-d4e8a0ded640">


<img width="470" alt="Screenshot 2023-11-13 at 22 57 55" src="https://github.com/NotMash/weather-react-api/assets/75740933/b8b212a4-a1cf-4d5f-844e-5f5a9de9709b">



# Description

This is a simple weather app built with React that allows users to check the current weather and a 5-day weather forecast for a city. It uses the OpenWeatherMap API to fetch weather data based on user input or geolocation.

# Features

Get current weather information for a city by searching for it.
Display a 5-day weather forecast with data available every 3 hours.
Toggle between temperature units (metric, imperial, or standard).
Use geolocation to automatically detect the user's location and provide weather information.
Dynamic background image based on weather conditions (cloudy, rainy, clear, sunny).
Installation

Clone the repository to your local machine:
bash
Copy code
git clone https://github.com/your-username/weather-app.git
Change your current directory to the project folder:
bash
Copy code
cd weather-app
Install the required dependencies using npm or yarn:
bash
Copy code
npm install
# or
yarn install
Create an OpenWeatherMap API key by signing up on their website (https://openweathermap.org/api) and replace the API key in the App.js file:
javascript
Copy code
const api = {
  key: "YOUR_API_KEY_HERE",
  base: "https://api.openweathermap.org/data/2.5/"
}
Start the development server:
bash
Copy code
npm start
# or
yarn start
Open your web browser and access the app at http://localhost:3000.
Usage

Enter the name of a city in the search bar and press "Enter" to fetch the current weather and forecast.
Click the "Use My Location" button to get weather information for your current location.
Temperature units can be changed by modifying the unit state in App.js.
Click on a date in the forecast to view detailed weather information for that day.
Enjoy the dynamic background image that changes based on the weather conditions.
Built With

React - JavaScript library for building user interfaces.
OpenWeatherMap API - Provides weather data for cities around the world.
React Icons - Library for adding weather icons to the UI.
Credits

This project was created by Mohammed Ibrahim Miah as a personal project to learn and showcase React development skills.

License

This project is open-source and available under the MIT License (LICENSE.md).

