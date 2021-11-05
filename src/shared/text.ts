export default {
  game: {
    title: 'Играть',
    playButton: 'Играть',
    playMoreButton: 'Могу лучше!',
    retryButton: 'Ещё раз!',
    lossText: 'Потрачено',
    winText: 'Победа!',
    gamepadConfiguration: 'Обнаружен геймпад! Нажмите ОК, затем кнопку на геймпаде, соответствующую действию:',
    pointsOnFirstLevel: 'Для попадания в таблицу лидеров необходимо пройти хотя бы один уровень',
    pointsOnWin: 'Вы прошли все %levelNumber% уровня за %time%. Это %points% очков. Поздравляем!',
    pointsOnLoss: 'Вы прошли %levelNumber% уровня за %time%. Это %points% очков. Попробуйте пройти все уровни',
    control: {
      left: 'Движение влево',
      right: 'Движение вправо',
      jump: 'Прыжок',
    },
    errors: {
      loadingSprite: 'Не удалось получить спрайт',
      loadingSound: 'Не удалось получить звук',
      loadingGameObject: 'Не удалось получить игровой объект',
      uniqueSprite: 'Идентификатор спрайта должен быть уникальным',
      uniqueSound: 'Идентификатор звука должен быть уникальным',
      uniqueGameObject: 'Идентификатор игрового объекта должен быть уникальным',
      unregisteredSprite: 'Ошибка создания уровня. Не зарегистрирован спрайт',
      unregisteredGameObject: 'Ошибка создания уровня. Не зарегистрирован игровой объект',
    },
  },
};
