console.log("Welcome to the Community Portal");

window.onload = function () {
    alert("Page Loaded Successfully");
};

let events = [
    {
        name: "Music Night",
        category: "Music",
        seats: 20
    },
    {
        name: "Baking Workshop",
        category: "Workshop",
        seats: 15
    },
    {
        name: "Football Match",
        category: "Sports",
        seats: 10
    }
];

let container = document.getElementById("eventContainer");

function displayEvents(eventList) {

    container.innerHTML = "";

    eventList.forEach(function (event) {

        let card = document.createElement("div");
        card.className = "eventCard";

        card.innerHTML =
            "<h3>" + event.name + "</h3>" +
            "<p>Category : " + event.category + "</p>" +
            "<p>Available Seats : " + event.seats + "</p>" +
            "<button onclick=\"registerUser('" + event.name + "')\">Register</button>";

        container.appendChild(card);
    });
}

displayEvents(events);

function registerUser(eventName) {

    try {

        alert("Successfully Registered for " + eventName);

    }
    catch (error) {

        console.log(error);

    }
}

document.getElementById("eventCategory").onchange = function () {

    let category = this.value;

    if (category == "Music") {
        document.getElementById("eventFee").innerHTML = "Fee : ₹200";
    }
    else if (category == "Workshop") {
        document.getElementById("eventFee").innerHTML = "Fee : ₹500";
    }
    else if (category == "Sports") {
        document.getElementById("eventFee").innerHTML = "Fee : ₹300";
    }
    else {
        document.getElementById("eventFee").innerHTML = "";
    }

    if (category == "All") {
        displayEvents(events);
    }
    else {

        let filteredEvents = events.filter(function (event) {
            return event.category == category;
        });

        displayEvents(filteredEvents);
    }
};

function validatePhone() {

    let phone = document.getElementById("phone").value;

    if (phone.length != 10) {
        alert("Enter Valid Phone Number");
    }
}

document.getElementById("feedback").addEventListener("keyup", function () {

    let count = this.value.length;

    document.getElementById("charCount").innerHTML = count;
});

function enlargeImage(img) {

    if (img.style.transform == "scale(1.5)") {
        img.style.transform = "scale(1)";
    }
    else {
        img.style.transform = "scale(1.5)";
    }
}

document.getElementById("registrationForm").addEventListener("submit", function (event) {

    event.preventDefault();

    let name = this.elements["name"].value;
    let email = this.elements["email"].value;
    let selectedEvent = document.getElementById("eventType").value;

    if (name == "" || email == "" || selectedEvent == "") {

        alert("Please Fill All Fields");
        return;
    }

    document.getElementById("outputMessage").value =
        "Registration Successful";

    localStorage.setItem("preferredEvent", selectedEvent);

    sendRegistration(name, email, selectedEvent);
});

window.addEventListener("load", function () {

    let savedEvent =
        localStorage.getItem("preferredEvent");

    if (savedEvent) {

        document.getElementById("eventType").value =
            savedEvent;
    }
});

function clearPreferences() {

    localStorage.clear();
    sessionStorage.clear();

    alert("Preferences Cleared");
}

function videoReady() {

    document.getElementById("videoStatus").innerHTML =
        "Video Ready To Play";
}

function findLocation() {

    navigator.geolocation.getCurrentPosition(

        function (position) {

            document.getElementById("locationResult").innerHTML =
                "Latitude : " +
                position.coords.latitude +
                "<br>Longitude : " +
                position.coords.longitude;
        },

        function (error) {

            alert(error.message);
        },

        {
            enableHighAccuracy: true,
            timeout: 10000
        }
    );
}

function sendRegistration(name, email, eventName) {

    let userData = {
        name: name,
        email: email,
        event: eventName
    };

    setTimeout(function () {

        fetch("https://jsonplaceholder.typicode.com/posts", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)

        })
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {

            console.log(data);

            alert("Registration Submitted Successfully");
        })
        .catch(function (error) {

            console.log(error);
        });

    }, 2000);
}

$("#registerBtn").click(function () {

    $(".eventCard").fadeIn();
});

$("#searchEvent").keydown(function () {

    let text = $(this).val().toLowerCase();

    let filtered = events.filter(function (event) {

        return event.name.toLowerCase().includes(text);
    });

    displayEvents(filtered);
});