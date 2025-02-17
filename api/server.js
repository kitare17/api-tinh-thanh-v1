// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const axios = require('axios');
const cron = require('node-cron'); // Cài đặt cronJob

const server = jsonServer.create()

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))

cron.schedule('*/10 * * * *', () => {
    console.log('Cron job running every 10 minutes');

    // Gửi một request bất kỳ tới server (có thể thay đổi endpoint)
    axios.get('https://api-tinh-thanh-v1.onrender.com/')
        .then(response => {
            console.log('Data received:', response.data);
        })
        .catch(error => {
            console.error('Error during axios request:', error);
        });
});
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
