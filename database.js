const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

// Query helper function
const query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
  })
}

const addUser = function(name, email, password, callback) {
  query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, password], callback)
}

const checkUser = function(email, callback) {
  query("SELECT * FROM users WHERE email ~* $1", [email])
}

const addReview = function(albumID, body, callback) {
  query("INSERT INTO reviews (album_id, body) VALUES ($1, $2)", [albumID, body], callback)
}

const getRecentReviews = function(callback) {
  query("SELECT * FROM reviews ORDER BY date_ DESC LIMIT 3", [], callback)
}

const getAlbumReviews = function(albumID, callback) {
  query("SELECT * FROM reviews ORDER BY date_ DESC WHERE album_id = $1", [albumID], callback)
}

const getAlbums = function(callback) {
  query("SELECT * FROM albums", [], callback)
}

const getAlbumsByID = function(albumID, callback) {
  query("SELECT * FROM albums WHERE id = $1", [albumID], callback)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  addUser,
  addReview,
  getRecentReviews,
  getAlbumReviews,
  checkUser
}
