const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "Страна" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "Режиссер" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "Продолжительность" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "Год" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "Описание" должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле "Постер" должно быть заполнено'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неправильный формат ссылки',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле "Трэйлер" должно быть заполнено'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неправильный формат ссылки',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "Постер к трейлеру" должно быть заполнено'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неправильный формат ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "Номер Фильма" должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "Название на русском" должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "Название на английском" должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
