export const getHoursMinutesDate = (date: string) => {
    // Преобразование строки в объект даты
    const dateObject = new Date(date);
// Получение смещения часового пояса в минутах
    const timezoneOffset = dateObject.getTimezoneOffset();
// Вычитание 3 часов и учет смещения часового пояса
    dateObject.setHours(dateObject.getHours() - (timezoneOffset / 60));
// Получение часов и минут
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
// Форматирование часов и минут, чтобы было двузначное число
    const formattedHours = ("0" + hours).slice(-2);
    const formattedMinutes = ("0" + minutes).slice(-2);
// Получение итоговой строки с часами и минутами
    return  formattedHours + ":" + formattedMinutes;
}