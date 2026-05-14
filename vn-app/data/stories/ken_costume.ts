export const kenCostume = {
  id: 'bedroom_scene',
  title: 'Утро в спальне',
  genres: ['Романтика', 'Повседневность'],
  premium: false,
  scenes: [
    {
      id: 'morning_intro',
      background: require('../../assets/images/bg/bedroom.jpg'),
      characters: [
        { name: 'Сера', image: require('../../assets/images/ch/sera_avatar.webp'), position: 'left' },
        { name: 'Элиас', image: require('../../assets/images/ch/elias_avatar.webp'), position: 'right' }
      ],
      dialogue: { 
        speaker: 'Сера', 
        text: 'Доброе утро... Ты уже проснулся? Я приготовила кофе.' 
      },
      choices: [
        { text: '☕ Выпить кофе вместе', nextScene: 'coffee', cost: 0 },
        { text: '💤 Ещё пять минут...', nextScene: 'sleep', cost: 0 }
      ]
    },
    {
      id: 'coffee',
      background: require('../../assets/images/bg/bedroom.jpg'),
      characters: [
        { name: 'Сера', image: require('../../assets/images/ch/sera_avatar.webp'), position: 'center' }
      ],
      dialogue: { 
        speaker: 'Сера', 
        text: 'Держи, твой кофе. Я знаю, что ты любишь без сахара. Заботливая, правда?' 
      },
      nextScene: null
    },
    {
      id: 'sleep',
      background: require('../../assets/images/bg/bedroom.jpg'),
      characters: [],
      dialogue: { 
        speaker: 'Рассказчик', 
        text: 'Вы закрываете глаза и засыпаете ещё на пару часов. Идеальное утро...' 
      },
      nextScene: null
    }
  ]
};