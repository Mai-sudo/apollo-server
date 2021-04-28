const { ApolloServer, gql } = require('apollo-server');

// Схема - це набір визначень типів (отже, "typeDefs")
// які разом визначають "форму" запитів, що виконуються
// ваші дані.

const typeDefs = gql`

 
  type Type {
    name: String
    age: String
    height: String
    phrases: String
    value: String
    city: String
    degree: String
    state: String
  }


  type Query {
    gachi: [Type]
    text: [Type]
    weather: [Type]
  }
`;


// Коментарі в рядках GraphQL (наприклад, цей) починаються з символу хешу (#).
// Цей тип "gachi" визначає поля для запитів для кожної Type в нашому джерелі даних.

const gachi = [
    {
      name: 'Билли Херрингтон (умер в ДТП)',
      age: '48 лет',
      height: '185 см'
    },
    {
      name: 'Ван Даркхолм',
      age: '48 лет',
      height: '183 см'
    },
    {
      name: 'Рикардо Милос',
      age: '43 лет',
      height: '173 см'
    },
  ];

  const text = [
    {
      phrases: '♂ three hundred bucks ♂',
      value: '300 баксов (долларов)'
    },
    {
      phrases: '♂ boy next door ♂',
      value: 'мальчик по соседству'
    },
    {
      phrases: '♂ boy out door ♂',
      value: 'мальчик на улице'
    },
    {
      phrases: '♂ dungeon master ♂',
      value: 'подвальный мастер'
    },
    {
      phrases: '♂ boss of this gym ♂',
      value: 'босс этой качалки'
    },
    {
      phrases: '♂ oh shit im sorry ♂',
      value: 'ох срань я извиняюсь'
    },
    {
      phrases: '♂ deep dark fantasy ♂',
      value: 'глубокая темная фантазия'
    },
    {
      phrases: '♂ finger ♂',
      value: 'палец'
    },
    {
      phrases: '♂ sorry for what? ♂',
      value: 'извиняюсь за что?'
    },
  ];

  const weather = [
    {
      city: 'Позняки',
      degree: '5°C',
      state: 'облачное'
    },
    {
      city: 'Шепетовка',
      degree: '9°C',
      state: 'солнечное'
    },
    {
      city: 'Мариуполь',
      degree: '10°C',
      state: 'солнечное'
    },
    {
      city: 'Киев',
      degree: '11°C',
      state: 'солнечное'
    },
    {
      city: 'Одесса',
      degree: '7°C',
      state: 'малооблачное'
    },
    {
      city: 'Володимир Волинський',
      degree: '11°C',
      state: 'солнечное'
    },
  ];


const resolvers = {
    Query: {
      gachi: () => gachi,
      text: () => text,
      weather: () => weather,
    },
  };  

// Конструктор ApolloServer вимагає двох параметрів: вашої схеми
// визначення та ваш набір вирішувачів.

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

  