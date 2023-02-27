const cron = require('node-cron');
const axios = require('axios');

const task = cron.schedule("*/12 * * * *", async () => {
  try {
    const res = await axios.get('https://aunsh.com')

    console.log('Req sent')
  } catch (error) {
    console.log(error)
  }
});

module.exports = {
  task,
};