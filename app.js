const express = require('express')
const app = express()
const port = 2021
const session = require('express-session');
app.use(express.static("./public"));

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(session({
  secret: 'mySecretKey', // Kunci untuk mengenkripsi session
  resave: false,         // Jangan menyimpan ulang session jika tidak ada perubahan
  saveUninitialized: false, // Simpan session meskipun belum ada data
  cookie: { 
      secure: false,
      samesite: true ,//untuk secutiry attack
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
      
   } // Untuk HTTPS, ubah menjadi true
}));









app.use('/', require('./routers'))

app.listen(port, () => {
  console.log(`TAHUN ${port}`)
})