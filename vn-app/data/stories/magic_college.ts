export const magicCollege = {
  id: 'magic_college',
  title: 'Тайна седьмой башни',
  genres: ['Фэнтези', 'Романтика'],
  premium: false,
  scenes: [
    {
      id: 'tour_start',
      background: require('../../assets/images/bg/university.png'),
      characters: [
        { name: 'Ася', image: require('../../assets/images/ch/Aiko_formal_smile.png'), position: 'right' }
      ],
      dialogue: { 
        speaker: 'Ася', 
        text: 'Привет! Я Ася. Давай я проведу тебе экскурсию по нашему колледжу? Здесь столько интересного!' 
      },
      choices: [
        { text: 'С радостью!', nextScene: 'tour_agree' },
        { text: 'Я лучше пройдусь один.', nextScene: 'tour_alone' }
      ]
    },
    {
      id: 'tour_agree',
      background: require('../../assets/images/bg/university.png'),
      characters: [
        { name: 'Элиас', image: require('../../assets/images/ch/Aiko_formal_smile.png'), position: 'center' }
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