export const secretChat = {
  id: 'secret_chat',
  title: 'Тени у ворот тории',
  genres: ['Романтика', 'Драма'],
  premium: true,
  scenes: [
    {
      id: 'chat_locked',
      background: require('../../assets/images/bg/japan.jpg'),
      characters: [],
      dialogue: { 
        speaker: '🔒 Premium', 
        text: 'Этот чат доступен только подписчикам. Разблокируйте премиум за 299₽/месяц.' 
      },
      choices: [
        { text: '🔓 Подписаться', nextScene: 'chat_unlocked', cost: 299 },
        { text: '↩ Назад', nextScene: null, cost: 0 }
      ]
    },
    {
      id: 'chat_unlocked',
      background: require('../../assets/images/bg/japan.jpg'),
      characters: [
        { name: 'Элиас', image: require('../../assets/images/ch/elias_avatar.webp'), position: 'center' }
      ],
      dialogue: { 
        speaker: 'Элиас', 
        text: 'Я не могу перестать думать о тебе... Сегодня видел тебя в библиотеке. Ты была прекрасна.' 
      },
      choices: [
        { text: '💬 Ответить: "Ты меня подглядываешь?"', nextScene: 'msg1', cost: 0 }
      ]
    },
    {
      id: 'msg1',
      background: require('../../assets/images/bg/japan.jpg'),
      characters: [],
      dialogue: { 
        speaker: 'Элиас', 
        text: 'Подглядываю? Скорее... любуюсь. Приходи завтра в кофейню. Буду ждать. 💌' 
      },
      nextScene: null
    }
  ]
};