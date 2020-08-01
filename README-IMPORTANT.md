[slide]
# DO NOT FORGET !
Dont' forget to run "npm install", because this app depending on bootstrap and jquery!
- bootstrap
- jquery
- npm i -E sammy
- npm i -E handlebars

And to add all the libraries in the .html file:
``` html
<head>
    <script src="./node_modules/jquery/dist/jquery.js"></script>
    <script src="./node_modules/bootstrap/dist/js/bootstrap.js"></script>
    <script src="./node_modules/handlebars/dist/handlebars.min.js"></script>
    <script src="./node_modules/sammy/lib/min/sammy-0.7.6.min.js"></script>
    <script src="./node_modules/sammy/lib/min/plugins/sammy.handlebars-0.7.6.min.js"></script>
</head>
```

[/slide]


[slide]
# Main steps

1. Преглеждаме заданието и ресурсите, с които разполагаме!

2. Преценяваме различните задачи, които трябва да изпълним и техния обем, за да можем да си разпределим времето.

3. Архитектура на приложението - библиотеки; разделяне кода на модули; кои ще са основните домейни и как ще ги разделим; какви инструменти ще използваме; ...

4. Работна последователност - график с описание

5. Реализиране и тестване

[/slide]


[slide]
# Check List
- Създаване на приложение в Backendless и настройки на достъпа
- Определяне структурата на обектите (данните) и създаване на таблици в Backendless
- Тестване на всички endpoints чрез Postman
- Създаване на npm проект и инсталиране на библиотеки
- Реализация на модул за връзката с базата данни (потребителска регистрация, CRUD за филми) // data.js
- Извеждане на основни шаблони (страници) // handlebars templates
- Рутиране към всички основни страници и изобразяване на шаблони
- Реализация на конкретна бизнес логика и динамични шаблони за всяка страница
  - Регистрация / логин + информация в заглавна лента
  - Нотификации
  - Съцдаване на филм и шаблон за формуляра
  - Каталог с филми и шаблон за филм + купуване на билет
  - Собствени филми и шаблон за собствен филм
  - Редактиране на филм + изтриване на филм
  - Търсене на филм

[/slide]

[slide]
# Important! Do Not Forget

- В HTML файла когато се импортва app.js се добавя type="module"
- app.js файлът започва със закачане на eventListener към прозореца, където се развивиа цялата логика
``` js
// app.js
/* globals Sammy */
window.addEventListener('load', () => {
    const app = Sammy('#container', function() {
        this.use('Handebars', 'hbs')
        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

    });
    app.run();

    function home() {
        this.swap('<h1>Sammy is working</h1>');
    }
})
```
- Всяка една функция я извеждам в отделен js файл и я import-вам в app.js
- Oправяме линковете в шаблона на `header.hbs`
```hbs
// header.hbs
<nav>
    <ul>
        <li><a href="#/home">Home</a></li>
        <li><a href="#/catalog">Cinema</a></li>
        <li><a href="#/create">Add Movie</a></li>
        <li><a href="#/my_movies">My Movies</a></li>
        <li class="right"><a href="#/logout">Logout</a></li>
        <li class="right">Welcome, user!</li>
        <li class="right"><a href="#/register">Register</a></li>
        <li class="right"><a href="#/login">Login</a></li>
    </ul>
</nav>
```
- Нотификациите се поставят най-горе в <body> ! Те не са в <div>container

[/slide]
