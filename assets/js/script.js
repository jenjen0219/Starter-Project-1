



//in this function we are going to fetch the api response that we will use to give a weather forecast for each city
function cityWeather (event) {

    event.preventDefault();

    var departDate = document.getElementById("departure-date").value;

    //this is rearranging our date to the format accepetted by the weather api

    //i think we might have to do some work to translate the date variable into either UNIX time (that is, seconds since midnight GMT on 1 Jan 1970) or a string formatted as follows: [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone].
    // var lengthOfStay = document.getElementById("");
    var date = departDate + 'T12:00:00';

    var APIKey = '30f72d6795msh68cc89a67fcb9e7p1c5c49jsn45bfacd7bd58';

    var lonCoord = -122.335167;
    var latCoord = 47.608013;
    var tempMin;
    var tempMax;

    var humidity;
    var windSpeed;


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '30f72d6795msh68cc89a67fcb9e7p1c5c49jsn45bfacd7bd58',
            'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
        }
    };


    fetch('https://dark-sky.p.rapidapi.com/' + latCoord + ',' + lonCoord + ',' + date + '?units=uk2', options)
        .then(response => response.json())
        .then(data => {
            tempMin = data.daily.data[0].temperatureMin;
            tempMax = data.daily.data[0].temperatureMax;
            humidity = data.daily.data[0].humidity;
            windSpeed = data.daily.data[0].windSpeed;

            console.log(tempMin, tempMax, humidity, windSpeed);

        })
        .catch(err => console.error(err));



}

// test.addEventListener('click', cityWeather);


// Save reference to important DOM elements.
const formEl = document.querySelector("form");
const buttonContainer = document.querySelector("#btn-container");
const addStopBtn = document.querySelector("#add-stop-btn");
const resetBtn = document.querySelector("#reset-btn");
const saveBtn = document.querySelector("#save-btn");

// Populate the list of autocomplete options in the city input box.
document.addEventListener('DOMContentLoaded', function () {
    const options = {
        data: {
            "Boston": null,
            "Seattle": null,
            "New York": null
        },
        limit: 5,
        minLength: 1
    }
    const cityInputEl = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(cityInputEl, options);
});

// Create and render the select options for state.
const handleStateOptions = function () {
    const stateSelectEl = document.querySelectorAll("select");

    const states = [
        "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ]

    for (let i = 0; i < stateSelectEl.length; i++) {
        const currentSelectEl = stateSelectEl[i];
        for (let j = 0; j < states.length; j++) {
            const currentState = states[j];
            const option = document.createElement("option");
            option.setAttribute("value", currentState);
            option.textContent = currentState;
            currentSelectEl.append(option);
        };
    }
    M.FormSelect.init(stateSelectEl);
};

// The insertInputRow function creates a new input row in the form.
const insertInputRow = function (event) {
    event.preventDefault();

    const inputRowEl = document.querySelectorAll("#input-row");

    const lastStopNum = parseInt(inputRowEl[inputRowEl.length - 1].children[0].innerText.substring(5));
    const newStopNum = lastStopNum + 1;

    const newInputRow = document.createElement("div");
    newInputRow.classList = "row";
    newInputRow.id = "input-row";
    newInputRow.innerHTML =
        `
<p>Stop ${newStopNum}</p>
<div class="input-field col s4">
    <label class="active" for="city-${newStopNum}">
        City:
    </label>
    <input class="autocomplete" type="text" name="city-${newStopNum}" placeholder="Enter city">
</div>
<div class="input-field col s4">
    <label class="active" for="state-${newStopNum}">
        State:
    </label>
    <select>
        <option value="" disabled selected>Choose state</option>
    </select>
</div>
<div class="input-field col s4">
    <label class="active" for="state-${newStopNum}">
        Length of Stay (day):
    </label>
    <input type="number" min="0" name="days-${newStopNum}" placeholder="How many days">
</div>
`
    formEl.insertBefore(newInputRow, buttonContainer);
}

// The resetForm function resets the form to its default format.
const resetForm = function (event) {
    event.preventDefault();

    formEl.innerHTML = "";
    formEl.innerHTML =
        `
<div class="row" id="input-row">
    <p>Depareture Date</p>
    <div class="input-field col s12">
        <input id="departure-date" type="date" name="departure-date" class="validate">
    </div>
</div>

<div class="row" id="input-row">
    <p>Starting Point</p>
    <div class="input-field col s4">
        <label class="active" for="city-0">
            City:
        </label>
        <input class="autocomplete" type="text" name="city-0" placeholder="Enter city">
    </div>
    <div class="input-field col s4">
        <label class="active" for="state-0">
            State:
        </label>
        <select>
            <option value="" disabled selected>Choose state</option>
        </select>
    </div>
    <div class="input-field col s4">
        <label class="active" for="day-0">
            Length of Stay (day):
        </label>
        <input type="number" min="0" name="day-0" placeholder="How many days">
    </div>
</div>

<div class="row" id="input-row">
    <p>Stop 1</p>
    <div class="input-field col s4">
        <label class="active" for="city-1">
            City:
        </label>
        <input class="autocomplete" type="text" name="city-1" placeholder="Enter city">
    </div>
    <div class="input-field col s4">
        <label class="active" for="state-1">
            State:
        </label>
        <select>
            <option value="" disabled selected>Choose state</option>
        </select>
    </div>
    <div class="input-field col s4">
        <label class="active" for="state-1">
            Length of Stay (day):
        </label>
        <input type="number" min="0" name="days-1" placeholder="How many days">
    </div>
</div>

<div class="row" id="btn-container">
    <button class="button" id="add-stop-btn">+ Add Stop</button>
    <button class="button" id="reset-btn">Reset Form</button>
    <button class="button" id="save-btn" type="submit">Save</button>
</div>`
};


// The insertInputRow function is called when the add stop button is clicked.
addStopBtn.addEventListener("click", function (event) {
    insertInputRow(event);
    handleStateOptions();
});
// The resetForm function is called when the reset form button is clicked.
resetBtn.addEventListener("click", function (event) {
    resetForm(event);
    handleStateOptions();
});

handleStateOptions();

// Save input values.
// const handleSubmit = function (event) {
//     event.preventDefault();

//     const inputRowEl = document.getElementById("formEntryContainer");
//     const departureDate = document.getElementById("departure-date").value;

//     // i forgot to mention we will also need to grab the date variable and i noticed that when i did it caused some issues 
//     //s
//     for (let i = 0; i < inputRowEl.childElementCount - 1; i++) {
//         // const currentInputRow = inputRowEl[i];
//         const city = document.getElementById("cityName" + [i]).value;
//         const state = document.getElementById("state" + [i]);
//         // const departDate = currentInputRow.getElementsByTagName("input")[3].value;

//         console.log(city, state);
//     };
// }
var origins = [];

const handleSubmit = function (event) {
    event.preventDefault();

    const inputRowEl = document.querySelectorAll("#input-row");
    const departureDate = document.getElementById("departure-date").value;

    for (let i = 1; i < inputRowEl.length; i++) {
        const currentInputRow = inputRowEl[i];
        const city = currentInputRow.getElementsByTagName("input")[0].value;
        const state = currentInputRow.getElementsByTagName("input")[1].value;
        const day = currentInputRow.getElementsByTagName("input")[2].value;

        // everytime we run this we need to coordinates to go back to zero 
        var lonCoord = 0;
        var latCoord = 0;

        var queryURLCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',US&appid=4ef3772979be6dce53798914fca77969';

        fetch(queryURLCoordinates)
            .then(response => response.json())

            .then(data => {
                lonCoord = data[0].lon;
                latCoord = data[0].lat;
                var coordinates = latCoord + ',' + lonCoord;
                origins.push(coordinates);
                console.log(origins);

            })

            .catch(function (error) {
                console.error(error);
            });








    };
}

saveBtn.addEventListener("click", handleSubmit);