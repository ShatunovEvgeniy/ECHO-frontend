export const magicCollege = {
  id: 'magic_college',
  title: 'Первый день в Академии',
  genres: ['Фэнтези', 'Романтика'],
  premium: false,
  scenes: [
    {
      id: 'tour_start',
      background: require('../../assets/images/bg/university.png'),
      characters: [
        { name: 'Элиас', image: require('../../assets/images/ch/elias_avatar.webp'), position: 'left' }
      ],
      dialogue: { 
        speaker: 'Элиас', 
        text: 'Привет! Я Элиас. Давай я проведу тебе экскурсию по нашему магическому колледжу? Здесь столько интересного!' 
      },
      choices: [
        { text: 'С радостью!', nextScene: 'tour_agree', cost: 0 },
        { text: 'Я лучше пройдусь одна.', nextScene: 'tour_alone', cost: 0 }
      ]
    },
    {
      id: 'tour_agree',
      background: require('../../assets/images/bg/university.png'),
      characters: [
        { name: 'Элиас', image: require('../../assets/images/ch/elias_avatar.webp'), position: 'center' }
      ],
      dialogue: { 
        speaker: 'Элиас', 
        text: 'Отлично! Тогда начнём с главного зала. Здесь проходят все важные церемонии и балы.' 
      },
      nextScene: null
    },
    {
      id: 'tour_alone',
      background: require('../../assets/images/bg/university.png'),
      characters: [],
      dialogue: { 
        speaker: 'Рассказчик', 
        text: 'Вы киваете Элиасу и решаете исследовать колледж самостоятельно. Впереди столько неизведанного!' 
      },
      nextScene: null
    }
  ]
};