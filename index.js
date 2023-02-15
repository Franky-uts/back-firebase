const express = require("express")
const bcrypt = require("bcrypt")
const { initializeApp } = require("firebase/app")
const {getFirestore} = require("firebase/firestore")
require ("dotenv/config")

const firebaseConfig = {
    apiKey: "AIzaSyA0K10QXW1JEE8otyC18ynBqOrKFJmGAh4",
    authDomain: "back-firebase-497ca.firebaseapp.com",
    projectId: "back-firebase-497ca",
    storageBucket: "back-firebase-497ca.appspot.com",
    messagingSenderId: "360032025441",
    appId: "1:360032025441:web:d7df411685c87410eb6320"
  };
//Inicializar BD con firebase
const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

//inicializar el servidor
const app = express()

const PORT = process.env.PORT || 19000

//ejecutar el servidor
app.listen(PORT,() =>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})
