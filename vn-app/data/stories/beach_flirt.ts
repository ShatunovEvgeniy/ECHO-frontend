export const beachFlirt = {
  id: 'beach_flirt',
  title: 'Небо, горящее над морем',
  genres: ['Романтика', 'Повседневность'],
  premium: false,
  scenes: [
    {
      id: 'beach_intro',
      background: require('../../assets/images/bg/beach.jpg'),
      characters: [
        { name: 'Элиас', image: require('../../assets/images/ch/elias_avatar.webp'), position: 'center' }
      ],
      dialogue: { 
        speaker: 'Элиас', 
        text: 'Какой прекрасный закат... Ты не находишь, что это идеальное место для разговора по душам?' 
      },
      choices: [
        { text: '💋 Поцеловать', nextScene: 'kiss', cost: 40 },
        { text: '🤗 Обнять', nextScene: 'hug', cost: 10 },
        { text: '💬 Перестать общаться', nextScene: 'leave', cost: 0 }
      ]
    },
    {
      id: 'kiss',
      background: require('../../assets/images/bg/beach.jpg'),
      characters: [
        { name: 'Элиас', image: require('../../assets/images/ch/elias_avatar.webp'), position: 'center' }
      ],
      dialogue: { 
        speaker: 'Элиас', 
        text: 'Вау... Это было неожиданно, но приятно. Ты особенная. 💎 -40' 
      },
      nextScene: null
    },
    {
      id: 'hug',
      background: require('../../assets/images/bg/beach.jpg'),
      characters: [
        { name: 'Элиас', image: require('../../assets/images/ch/elias_avatar.webp'), position: 'center' }
      ],
      dialogue: { 
        speaker: 'Элиас', 
        text: 'Мне нравится быть рядом с тобой. Так тепло и уютно... 💎 -10' 
      },
      nextScene: null
    },
    {
      id: 'leave',
      background: require('../../assets/images/bg/beach.jpg'),
      characters: [],
      dialogue: { 
        speaker: 'Рассказчик', 
        text: 'Вы отступаете и уходите по берегу. Элиас смотрит вслед с лёгкой грустью. Бесплатно.' 
      },
      nextScene: null
    }
  ]
};