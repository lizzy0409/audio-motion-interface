### Audio Motion Interface (AMI)

Алгоритм синтезирует звук на основе данных с датчиков движения смартфона. Предусмотрен т.н. локальный режим (когда смартфон просто проводом подключается к колонкам или наушникам) и удалённый режим (когда смартфон и колонки разнесены в пространстве, а данные идут по протоколу <a href="https://ru.wikipedia.org/wiki/WebSocket">websocket</a> через промежуточный сервер).

Обратите внимание, что алгоритм отдаёт лишь "чистый" звук, оставляя на ваше усмотрение возможность его обработки (это могут быть как "примочки", так и разнообразные DAW вроде Ableton, Cubase, FL Studio и т.д.).

### Стратегия синтеза

##### Локальный режим:

<i>Источник данных</i> и <i>управление данными</i> находятся на смартфоне (совмещены).

- смартфон → миниджек → колонки
- смартфон → миниджек → аблетон → миниджек → колонки

##### Удалённый режим:

<i>Источник данных</i> находится на смартфоне, а <i>управление данными</i> находится на удалённой машине (разнесены).

- смартфон → вебсокет → браузер → миниджек → колонки
- смартфон → вебсокет → браузер → аблетон → миниджек → колонки

<b>Плюсы:</b>

- смартфон не связан проводом с ноутбуком;
- разделение источника данных от управления данными - ноутбук лучше справится с обработкой данных;

<b>Минусы:</b>

- исполнителю не слышно ничего (можно одновременно генерить звук локально со смартфона в наушники и дополнительно дублировать данные движения на удалённую машину; по идее, тогда любой может подключиться к прослушиванию исполнения и можно сделать распределённое удалённое прослушивание откуда угодно; но тогда удалённые слушателя останутся без обработки ableton, только обработка с сервера);
- есть задержка до 100мс;

##### Совмещённый режим:

Можно сделать так: у нас должен быть локальный источник данных, удалённый источник данных и ноутбук (т.е. два смартфона и ноутбук). На ноуте открыта вкладка с удалённым источником данных + настройки ноута и смартфон с локальными настройками по проводу в ноут. Аблетон принимает два источника: по миниджеку и с браузера.

### Общая архитектура

`motion.js` занимается датчиками - акселерометром и гироскопом.
Он вешает слушатели событий движения и вызывает `sound.js` по каждому событию

`sound.js` принимает данные о движении и генерирует звук
