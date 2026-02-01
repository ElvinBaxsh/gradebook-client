// src/utils/dateHelpers.js

const months = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
  "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
];

const weekdays = [
  "Bazar", "Bazar ertəsi", "Çərşənbə axşamı", 
  "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"
];

export const getFormattedDate = () => {
  const date = new Date();
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const getWeekday = () => {
  return weekdays[new Date().getDay()];
};