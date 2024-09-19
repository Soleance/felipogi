import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBq1OJILERIJsiWN0IxIqY5epNCxMqrllo",
    authDomain: "aldoussy-9244a.firebaseapp.com",
    databaseURL: "https://aldoussy-9244a-default-rtdb.firebaseio.com",
    projectId: "aldoussy-9244a",
    storageBucket: "aldoussy-9244a.appspot.com",
    messagingSenderId: "843475244396",
    appId: "1:843475244396:web:a55c305c615630c2d14f49",
    measurementId: "G-Q3LLR68109"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Save user data to Firebase Realtime Database
    set(ref(database, 'users/' + username), {
        username: username,
        email: email
    })
    .then(() => {
        showPopup('Data saved successfully!');
        // Reset the input fields
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    })
    .catch((error) => {
        const errorMessage = error.message;
        document.getElementById('message').textContent = errorMessage;
    });
});

// Function to show pop-up
function showPopup(message) {
    const messageElement = document.getElementById('message');
    messageElement.className = 'popup'; // Add the popup class
    messageElement.textContent = message;
    messageElement.style.display = 'block'; // Show the message

    // Automatically hide the pop-up after 3 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

// Live user list
const userList = document.getElementById('userList');

// Listen for changes in the users in the database
onValue(ref(database, 'users'), (snapshot) => {
    userList.innerHTML = ''; // Clear the current list
    snapshot.forEach(childSnapshot => {
        const username = childSnapshot.val().username;
        const li = document.createElement('li');
        li.textContent = username;
        userList.appendChild(li);
    });
});