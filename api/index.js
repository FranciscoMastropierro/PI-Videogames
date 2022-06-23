//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
require('dotenv').config();
const URL =`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`;
const { Genre } = conn.models;



// Code here! It works!
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    try {
      const {data} = await axios.get(URL);
      const result = [];
     for (let i = 0; i < data.results.length; i++) {
      const name = data.results[i].name;
      // console.log(name);
      // Create a new genre
      result.push({name});
     }
     
     await Genre.bulkCreate(result);
      
    } catch (error) {
      console.error(error);
    }
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
