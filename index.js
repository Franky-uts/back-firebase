const express = require("express")
const bcrypt = require("bcrypt")
const { initializeApp } = require("firebase/app")
const {getFirestore,collection, setDoc, doc, getDoc, getDocs} = require("firebase/firestore")
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
app.use(express.json())

//Rutas para las perisiones Endpoint | Api
//Ruta registro
app.post('/registro',(req,res) =>{
  const { name, lastname, email, password, number } = req.body
//Validacion de datos
if(name.length < 3){
  res.json({
    'alert':'El nombre debe ser mayor a 3 caracteres'
  })
}else if(lastname.length < 3){
    res.json({
      'alert':'Debes de ingresar un correo'
    })
}else if(!email.length){
  res.json({
    'alert':'El apellido debe ser mayor a 3 caracteres'
  })
}
else if(password.length < 8 ){
  res.json  ({
    'alert':'Debes de escribir una contraseña maoyr a 8 caracteres'
  })
}else if(!Number(number)||number.length <10 ){
  res.json  ({
    'alert':'Debes de escribir un Numero de telefono correcto'
  })
}else {
  const users = collection(db, 'users')

  getDoc(doc(users,email)).then(user =>{
    if(user.exists()){
      res.json({
        'alert':'EL correo ya existe aqui'
      })
    }else{
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
          req.body.password = hash
          //guardar en la base de datos
          setDoc(doc(users,email),req.body).then(()=>{
            res.json({
              'alert':'Sucess'
            })
          })
        })
      })
    }
  })
}
})

app.get('/usuarios', (req, res) =>{
  const users = collection(db,'users')
  console.log('usuarios',users)
  res.json({
    'alert':'Succes',
    users
  })
})
const PORT = process.env.PORT || 19000

//ejecutar el servidor
app.listen(PORT,() =>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})
