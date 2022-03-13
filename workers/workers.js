const cron = require('node-cron');
const axios = require('axios');

const task = cron.schedule("*/12 * * * *", async () => {
  try {
    const res = await axios.get('https://aunsh.com')
    const res2 = await axios.get("https://fun-with-reddit.herokuapp.com/");
  } catch (error) {
    console.log(error)
  }
});

module.exports = {
  task,
};