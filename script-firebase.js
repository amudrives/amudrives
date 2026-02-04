import { auth } from "./firebase-init.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.getElementById("authForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");
const logoutBtn = document.getElementById("logoutBtn");
const signupBtn = document.getElementById("signupBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    status.innerText = "Login successful ✅";
  } catch (err) {
    status.innerText = err.message;
  }
});

signupBtn.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    status.innerText = "Admin created successfully ✅";
  } catch (err) {
    status.innerText = err.message;
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    logoutBtn.style.display = "block";
    status.innerText = "Logged in as " + user.email;
  } else {
    logoutBtn.style.display = "none";
    status.innerText = "Not logged in";
  }
});
