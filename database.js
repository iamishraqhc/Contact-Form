import mysql from 'mysql'

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact_form'
})

conn.connect((err) => {
    if (err) throw err
    console.log('Database is connected successfully!')
})

export default conn
