// Replace with your Firebase config


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHhpVl8Dukxqumwu4bfPVIY1B3Wzcatz4",
    authDomain: "stress-e7dae.firebaseapp.com",
    projectId: "stress-e7dae",
    storageBucket: "stress-e7dae.firebasestorage.app",
    messagingSenderId: "160716899707",
    appId: "1:160716899707:web:4054cf2c7290e63ff4e9de"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


document.getElementById("refresh").addEventListener("click", async () => {
  loadEntries();
  console.log("refreshed!");
});

// Function to save journal entry
document.getElementById("submitEntry").addEventListener("click", async () => {
    const entryText = document.getElementById("journalEntry").value;
    const nickname = document.getElementById("nickname").value;
    if (entryText.trim() !== "") {
      if (nickname.trim() !== "") {
        await addDoc(collection(db, "journalEntries"), {
            content: entryText,
            name: nickname,
            timestamp: new Date()
        });
        document.getElementById("journalEntry").value = ""; // Clear input
        loadEntries(); // Refresh the list
      }
      else {
        await addDoc(collection(db, "journalEntries"), {
            content: entryText,
            name: "anonymous",
            timestamp: new Date()
        });
        document.getElementById("journalEntry").value = ""; // Clear input
        loadEntries(); // Refresh the list
      }
    }
});

// Function to load and display entries
async function loadEntries() {
    const entriesDiv = document.getElementById("entries");
    entriesDiv.innerHTML = ""; // Clear previous entries

    const q = query(collection(db, "journalEntries"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const entryData = doc.data();
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        //console.log(entryData.name);
        entryDiv.innerHTML = `<p>${entryData.content}</p><h3 style = "font-family: 'indie flower', serif;">${entryData.name}</h3><small>${new Date(entryData.timestamp.toDate()).toLocaleString()}</small>`;
        entriesDiv.appendChild(entryDiv);
    });
}

// Load entries on page load
window.onload = loadEntries;

console.log(("b" + "a" + +"a" + "a").toLowerCase());
