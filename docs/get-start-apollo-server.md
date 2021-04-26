## Початок роботи з Apollo Server

> Це керівництво проведе вас через установку і настройку Apollo Server. 
> Якщо ви тільки починаєте працювати з GraphQL або платформою Apollo, 
> ми рекомендуємо спочатку прочитати <a href="https://github.com/maxmai02/jace-dps-express/blob/master/docs/basic-graphql.md">basic-graphql.md</a>

&#160;&#160;&#160;&#160;У цьому керівництві передбачається, що ви знайомі з командним рядком і JavaScript і у вас встановлена остання версія Node.js

## Створимо новий проект

1. В рекомендуємо вам створіть каталог для нового проекту і `cd` в нього:
<img src="https://i2.paste.pics/00868d0181924edd6fff2000f900f5c2.png" width="631" height="83" alt="Screenshot">

2. Ініціалізуйте новий проект Node.js за допомогою npm (або іншого вподобаного менеджера пакетів, наприклад Yarn):
<img src="https://i2.paste.pics/4f13ddebe4ccab6519788e6ea7e8e626.png" width="635" height="67" alt="Screenshot">

&#160;&#160;&#160;&#160;Тепер ваш каталог проекту містить файл `package.json`.
## Встановити залежності

Програми, які запускають >Apollo Server, потребують двох залежностей верхнього рівня:

- `apollo-server` - це основна бібліотека самого Apollo Server, яка допомагає визначити форму ваших даних та спосіб їх отримання.
- `graphql` - це бібліотека, яка використовується для побудови схеми GraphQL та виконання запитів до неї.

Виконайте таку команду, щоб встановити обидві залежності та зберегти їх у каталозі >node_modules вашого проекту:
<img src="https://i2.paste.pics/e38465fdf5a6f34f729b3df9e6f42569.png" width="651" height="72" alt="Screenshot">

<code class="language-js"><span class="token keyword">const</span> <span class="token punctuation">{</span> ApolloServer<span class="token punctuation">,</span> gql <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'apollo-server'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// A schema is a collection of type definitions (hence "typeDefs")</span>
<span class="token comment">// that together define the "shape" of queries that are executed against</span>
<span class="token comment">// your data.</span>
<span class="token keyword">const</span> typeDefs <span class="token operator">=</span> gql<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span></code>
