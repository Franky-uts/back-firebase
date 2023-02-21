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

app.get('/usuarios', async(req, res) =>{
  const colRef = collection(db,'users')
  const docsSnap = await getDoc(colRef)
  let data = []
  docsSnap.forEach(doc=>{
    data.push(doc.data())
  })
  res.json({
    'alert':'Seccess',
    data
  })
})

app.post('/login',(req,res)=>{
  let {email,password}=req.body

  if (!email.length || !password.length){
    return res.json({
      'alert':'no se han recibido los datos correctamente'
    })
  }
  const users = collection(db, 'users')
  getDoc(doc(users,email))
  .then( user=>{
    if (!user.exists) {
      return res.json({
        'alert': 'correo no registrado'
      })
    }else{
      bcrypt.compare(password, user.data().password, (error, result) =>{
        let data = user.data()
        if (result) {
            res.json({
            'alert':'Seccess',
            name:data.name,
            email:data.email,
          })          
        }else{
          return res.json({
            'alert':'Contraseña incorrecta'
          })
        }
      })
    }
  })
})

const PORT = process.env.PORT || 19000

//ejecutar el servidor
app.listen(PORT,() =>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})
