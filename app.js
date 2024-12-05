const express = require('express')
const app = express()
const port = 2021
app.use(express.static("./public"));

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.use('/', require('./routers'))

app.listen(port, () => {
  console.log(`TAHUN ${port}`)
})