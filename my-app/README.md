
 Create React App прекратилась, но его все еще можно использовать. Для корректной работы необходимо дополнительно установить пакет «web-vitals», чтобы исправить ошибку «Module not found: Error: Can't resolve 'web-vitals'». Для этого выполните команду:

npm install --no-audit --save @testing-library/jest-dom@^5.14.1 @testing-library/react@^13.0.0 @testing-library/user-event@^13.2.1 web-vitals@^2.1.0 --legacy-peer-deps

В настоящее время при установке JSON Server будет устанавливаться версия beta v1, однако в видеоуроках используется версия 0.17.4. Сейчас версия 0.17.4 считается стабильной и на данный момент мы рекомендуем использовать именно ее. Запустить json-server без установки можно с помощью команды:
npx json-server@0.17.4 --watch db.json

или установите npm-пакет, выполнив команду:
npm install json-server@0.17.4

