const daysOfWeek = {
  ru: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ],
  eng: ['Sun', 'Mon', 'Tues', 'Wed', 'thurs', 'Fri', 'Sat']
};

const months = {
  ru: [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ],
  eng: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
};

export interface FormattedDate {
  time: string;
  dateRU: string;
  dateENG: string;
}

export function getFormattedDates(): FormattedDate {
  const dateRef = new Date();

  const dayOfWeekRU = daysOfWeek.ru[dateRef.getDay()];
  const dayOfWeekENG = daysOfWeek.eng[dateRef.getDay()];
  const day = dateRef.getDate().toString();
  const year = dateRef.getFullYear().toString();
  const monthRU = months.ru[dateRef.getMonth()];
  const monthENG = months.eng[dateRef.getMonth()];

  let hours: string = dateRef.getHours().toString();
  if (dateRef.getHours() < 10) {
    hours = '0' + hours.toString();
  }

  let minutes: string = dateRef.getMinutes().toString();
  if (dateRef.getMinutes() < 10) {
    minutes = '0' + minutes.toString();
  }

  const time = `${hours}:${minutes}`;
  const dateRU = `${dayOfWeekRU}, ${day} ${monthRU} ${year} года`;
  const dateENG = `${dayOfWeekENG}, the ${day} of ${monthENG}, ${year}`;

  return { time, dateRU, dateENG };
}
