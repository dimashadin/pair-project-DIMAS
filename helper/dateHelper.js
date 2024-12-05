const dayjs = require('dayjs');

// Helper untuk format tanggal
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD'); 
};

module.exports = formatDate;


// instal duluu package jangan lupa
// npm i dayjs