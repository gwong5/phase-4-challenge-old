const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  response.render('splash')
})

app.get('/home', (request, response) => {
  database.getAlbums((error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      database.getRecentReviews(albums, (reviews) => {
        response.render('index', { albums:albums, reviews: reviews })
      })
      // response.render('index', { albums: albums })
    }
  })
})

app.get('/sign_in', (request, response) => {
  response.render('sign_in')
})

app.get('/sign_up', (request, response) => {
  response.render('sign_up')
})

// app.post('/signing_in', (request, response) => {
//   const { email } = request.body
//   database.checkUser(email, (error, user) => {
//     if (error) {
//       console.log(error)
//     }
//     console.log(user)
//   })
// })

app.post('/signing_up', (request, response) => {
  const { name, email, password} = request.body
  database.addUser(name, email, password, (error) => {
    response.redirect('/sign_up')
  }) 
})

app.get('/new_review/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      response.render('new_review', { album: album })
    }
  })
})

app.get('/user/:id', (request, response) => {
  response.render('profile')
})

app.get('/albums/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      response.render('album', { album: album })
    }
  })
})

app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
