const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const connection = require('./config/db')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/foods', async (req, res) => {
    const [results, feild] = await connection.promise().execute('SELECT * FROM tblfood')
    return res.send(results)
})

app.get('/foods/:slug', async (req, res) => {
    const { slug } = req.params
    const [results, feild] = await connection.promise().execute(`SELECT * FROM tblfood WHERE item_slug = '${slug}'`)
    return res.send(results)
})

app.get('/foods/price/:price', async (req, res) => {
    const { price } = req.params
    const [results, feild] = await connection.promise().execute(`SELECT * FROM tblfood WHERE item_price < '${price}'`)
    return res.send(results)
})

app.get('/foods/rating/:rate', async (req, res) => {
    const { rate } = req.params
    const [results, feild] = await connection.promise().execute(`SELECT * FROM tblfood WHERE item_rating = '${rate}'`)
    return res.send(results)
})

app.get('/foods/category/:cat', async (req, res) => {
    const { cat } = req.params
    const [results, feild] = await connection.promise().execute(`SELECT * FROM tblfood WHERE item_category = '${cat}'`)
    return res.send(results)
})

app.post('/foods/add', async (req, res) => {
    const data = [req.body.item_name, req.body.item_slug, req.body.item_price, req.body.item_rating, req.body.item_category]

    connection.query('INSERT INTO`tblfood`(`item_name`, `item_slug`, `item_price`, `item_rating`, `item_category`) VALUES(?)', [data], (error, results) => {
        if (error) throw error;
        else {
            return res.send('data added succesfully')
        }
    })
})


app.listen(4000)