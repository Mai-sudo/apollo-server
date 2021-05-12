## Початок роботи з Apollo Server

> Це керівництво проведе вас через установку і настройку Apollo Server. 
> Якщо ви тільки починаєте працювати з GraphQL або платформою Apollo, 
> ми рекомендуємо спочатку прочитати <a href="https://github.com/maxmai02/jace-dps-express/blob/master/docs/basic-graphql.md">basic-graphql.md</a>

&#160;&#160;&#160;&#160;У цьому керівництві передбачається, що ви знайомі з командним рядком і JavaScript і у вас встановлена остання версія Node.js

## Створимо новий проект

1. В рекомендуємо вам створіть каталог для нового проекту і `cd` в нього:
```                            
1 mkdir graphql-server-example 
2 cd graphql-server-example    
```                            

2. Ініціалізуйте новий проект Node.js за допомогою npm (або іншого вподобаного менеджера пакетів, наприклад Yarn):
```
1 npm init --yes
```

&#160;&#160;&#160;&#160;Тепер ваш каталог проекту містить файл `package.json`.

## Встановимо залежность

Програми, які запускають >Apollo Server, потребують двох залежностей верхнього рівня:

- `apollo-server` - це основна бібліотека самого Apollo Server, яка допомагає визначити форму ваших даних та спосіб їх отримання.
- `graphql` - це бібліотека, яка використовується для побудови схеми GraphQL та виконання запитів до неї.

&#160;&#160;&#160;&#160;Виконайте таку команду, щоб встановити обидві залежності та зберегти їх у каталозі >node_modules вашого проекту:

&#160;&#160;&#160;&#160;Виконайте таку команду, щоб встановити обидві ці залежності та зберегти їх у каталозі `node_modules` вашого проекту:
```
1 npm install apollo-server graphql
```
&#160;&#160;&#160;&#160;Також створіть порожній файл `index.js` у кореневому каталозі вашого проекту:
```
1 touch index.js
```

&#160;&#160;&#160;&#160;Щоб все було простіше, `index.js` міститиме весь код для цього прикладу програми.

## Визначимо свою схему GraphQL

&#160;&#160;&#160;&#160;Кожен сервер GraphQL (включаючи Apollo Server) використовує схему **schema** для визначення структури даних, які клієнти можуть запитувати. У цьому прикладі ми створимо сервер для запиту колекції `book` за назвою та автором.

Відкрийте `index.js` у бажаному редакторі та вставте в нього наступне:

```js
1 const { ApolloServer, gql } = require('apollo-server');
2 
3 // A schema is a collection of type definitions (hence "typeDefs")
4 // that together define the "shape" of queries that are executed against
5 // your data.
6 const typeDefs = gql`
7    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
8 
9    # This "Book" type defines the queryable fields for every book in our data source.
10   type Book {
11     title: String
12     author: String
13   }
14
15   # The "Query" type is special: it lists all of the available queries that
16   # clients can execute, along with the return type for each. In this
17   # case, the "books" query returns an array of zero or more Books (defined above).
18   type Query {
19     books: [Book]
20   }
21 `;
```

&#160;&#160;&#160;&#160;Цей фрагмент визначає просту, дійсну схему GraphQL. Клієнти зможуть виконати запит із назвою `books`, а наш сервер поверне масив із нуля або більше `books`.

## Визначимо свій набір даних

&#160;&#160;&#160;&#160;Тепер, коли ми визначили структуру наших даних, ми можемо визначити самі дані. Apollo Server може отримувати дані з будь-якого джерела, до якого ви підключаєтесь (включаючи базу даних, REST API, послугу зберігання статичних об’єктів або навіть інший сервер GraphQL). Для цілей цього підручника ми просто приведемо деякі приклади даних.

Додайте наступне внизу `index.js`
```js
1 const books = [
2   {
3     title: 'The Awakening',
4     author: 'Kate Chopin',
5   },
6   {
7     title: 'City of Glass',
8     author: 'Paul Auster',
9   },
10 ];
```

&#160;&#160;&#160;&#160;Цей фрагмент визначає простий набір даних, який клієнти можуть запитувати. Зверніть увагу, що два об’єкти в масиві відповідають структурі типу `Book`, яку ми визначили у нашій схемі.

## Визначимо розподільник

&#160;&#160;&#160;&#160;Ми визначили наш набір даних, але сервер Apollo не знає, що він повинен використовувати цей набір даних під час виконання запиту. Щоб це виправити, ми створюємо **resolver** (вирішувач).

Розробники повідомляють Apollo Server, як отримати дані, пов’язані з певним типом. Оскільки наш масив `Book` є жорстко закодованим, відповідний вирішувач є простим. 

Додайте внизу `index.js` наступне:
```js
1 // Resolvers define the technique for fetching the types defined in the
2 // schema. This resolver retrieves books from the "books" array above.
3 const resolvers = {
4   Query: {
5     books: () => books,
6   },
7 };
```
## Створимо екземпляр `ApolloServer`

Ми визначили нашу схему, набір даних та вирішувач. Тепер нам просто потрібно надати цю інформацію серверу Apollo, коли ми її ініціалізуємо.

Додайте внизу 'index.js' наступне:

```js
1 // The ApolloServer constructor requires two parameters: your schema
2 // definition and your set of resolvers.
3 const server = new ApolloServer({ typeDefs, resolvers });
4
5 // The `listen` method launches a web server.
6 server.listen().then(({ url }) => {
7   console.log(`🚀  Server ready at ${url}`);
8 });
```

## Запустіть сервер

Ми готові запустити наш сервер! Запустіть наступне з кореневого каталогу вашого проекту:
```
node index.js
```
Ви повинні побачити такий результат:
```
🚀 Server ready at `http://localhost:4000`
```
Готово!

## Виконайте свій перший запит (query)

&#160;&#160;&#160;&#160;Тепер ми можемо виконувати запити GraphQL на нашому сервері. Для виконання нашого першого запиту ми можемо використовувати інструмент під назвою **GraphQL Playground**.

&#160;&#160;&#160;&#160;Коли ваш сервер все ще працює, відвідайте веб-сторінку `http://localhost:4000`, щоб відкрити GraphQL Playground. (Сервер Apollo розміщує GraphQL Playground автоматично, коли ви запускаєте його в невиробничому середовищі.)

<img src="https://www.apollographql.com/docs/apollo-server/d979d0a9c458aad3861ad0dba48da064/graphql-playground.png" width="900" height="500" alt="Screenshot">

Інтерфейс інтерфейсу GraphQL Playground включає:

- Область тексту (ліворуч) для написання запитів
- Кнопка відтворення (кнопка трикутника посередині) для виконання запитів
- Область тексту (праворуч) для перегляду результатів запиту
- Перегляди для перевірки схеми та створеної документації (через вкладки праворуч)

Наш сервер підтримує один запит із назвою `books`. Давайте його виконаємо!

Ось рядок запиту GraphQL **query string** для виконання запиту `books`:

```js
1 {
2  books {
3    title
4    author
5  }
6 }
```

&#160;&#160;&#160;&#160;Вставте цей рядок у ліву область тексту та натисніть кнопку Відтворити. Результати (з нашого твердокодованого набору даних) з’являються праворуч:

<img src="https://www.apollographql.com/docs/apollo-server/d4e78b6ac058ff46317e52c4e6ea985d/graphql-playground-response.png" width="900" height="450" alt="Screenshot">

&#160;&#160;&#160;&#160;Однією з найважливіших концепцій GraphQL є те, що клієнти можуть вибрати запит лише для полів, які їм потрібні. Видаліть `author` із рядка запиту та виконайте його знову. Відповідь оновлюється, включаючи лише поле `title` для кожної `books`!

<a href="https://github.com/maxmai02/jace-dps-express">Посилання на репозиторий</a>
