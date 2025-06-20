
 Create React App прекратилась, но его все еще можно использовать. Для корректной работы необходимо дополнительно установить пакет «web-vitals», чтобы исправить ошибку «Module not found: Error: Can't resolve 'web-vitals'». Для этого выполните команду:

npm install --no-audit --save @testing-library/jest-dom@^5.14.1 @testing-library/react@^13.0.0 @testing-library/user-event@^13.2.1 web-vitals@^2.1.0 --legacy-peer-deps

В настоящее время при установке JSON Server будет устанавливаться версия beta v1, однако в видеоуроках используется версия 0.17.4. Сейчас версия 0.17.4 считается стабильной и на данный момент мы рекомендуем использовать именно ее. Запустить json-server без установки можно с помощью команды:
npx json-server@0.17.4 --watch db.json

или установите npm-пакет, выполнив команду:
npm install json-server@0.17.4

git branch BLOG-003  создание новой ветки
git checkout BLOG-003 переключение на ветку
git checkout -b BLOG-003 -создание и переключение ветки

Области хранения данных:
-база данных на Json-server
-BFF
-редакс стор

Сущности приложения:
-пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
-статья: БД (список статей), стор(отображение в браузере)
-комментарий: БД (список комментариев), стор(отображение в браузере)

Таблицы БД:
-пользователи - users: id / login / password / register_at / role_id
-роли - roles: id / name
-статьи - posts: id / title / image_url / content / published_at
- комментарии - comments: id / author_id / post_id / content /published_at

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

- user: id / login / roleId / session
/ posts: массив post: id / title / imageUrl / publishedAt / commentCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-users: массив user: id / login / registeredAt / role


json-server --watch src/db.json --port 3005

_--------------------------
    const WebSocket = require('ws');

    const server = new WebSocket.Server({ port: 3000 });

    server.on('connection', (ws) => {
        console.log('Клиент подключен');

        ws.on('message', (message) => {
            console.log(`Получено сообщение: ${message}`);
        });

        ws.send('Добро пожаловать на сервер WebSocket!');
    });

    console.log('Сервер запущен на порту 3000');


http://localhost:3005/users
http://localhost:3005/roles
http://localhost:3005/posts
http://localhost:3005/comments
http://localhost:3005/sessions


