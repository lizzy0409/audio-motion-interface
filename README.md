### Audio Motion Interface (AMI)

##### Sonification interface for motion and orientation

Демо здесь (заходить со смартфона): https://ami.fly.dev

Система синтезирует звук на основе данных с датчиков движения смартфона: скорость определяет громкость, положение определяет частоту.

TODO: Видео демонстрация:

Предусмотрен т.н. локальный режим (когда звук генерирует смартфон и просто подключается к колонкам/комбику/наушникам/bluetooth-колонкам) и распределённый режим (когда смартфон передаёт данные о движении на компьютер и уже компьютер генерирует звук, который подключается к воспроизводящей аудио-системе).

Алгоритм имеет минимальное количество внутренних настроек, оставляя на ваше усмотрение возможность обработки звука (это могут быть как педали/примочки, так и разнообразные DAW вроде Ableton, Cubase, FL Studio и т.д.).

#### Кратко как использовать

Note: Firefox не поддерживается, Safari под вопросом.

Самый простой вариант - зайти со смартфона на https://ami.fly.dev. Смартфон попросит доступ к датчикам - его необходимо разрешить. После этого он сразу начнёт генерировать звук при лёгком встряхивании из встроенного динамика. Здесь лучше либо подключить наушники, либо подключиться к bluetooth-колонке, либо кабелем миниджек-миниджек (или с помощью переходника на джек) соединить с колонками/усилителем/комбиком. При таком варианте есть следующие недостатки:

- вы связаны кабелем
- у смартфона есть ощутимая задержка
- вы не видите что играете (генерируемую ноту/частоту)
- не очень удобно изменять настройки

Все эти недостатки решаются распределённым режимом работы. Для этого:

- на смартфоне переключить стратегию синтеза на распределённый режим
- зайти дополнительно с компьютера на https://ami.fly.dev. На компьютере автоматически включится специальный режим приёмника данных. При этом отобразится строка "Подключено (1)" (цифра может быть больше, если кто-то ещё зашёл на сайт вместе с вами)
- теперь смартфон передаёт данные о движении на компьютер. Здесь и смартфон, и компьютер начинают синтезировать звук. Смартфон справляется с этой задачей с большей задержкой, из-за чего при включённом звуке на обоих устройствах можно услышать что-то вроде эха. Здесь можно убавить громкость на смартфоне до нуля, а компьютер подключить к вашей аудио-системе

Из компьютера, соответственно, можно звук передать в DAW через Virtual Audio Cabel (VAC) и обработать там, пустив на вход VAC звуки операционной системы (так как браузер отдаёт звук туда), а выход VAC подключить к DAW. Тогда звук можно снимать либо с миниджека компьютера, либо с внешнего-аудиоинтерфейса, а оттуда обрабатывать дальше.

Итого некоторые возможные схемы работы:
- смартфон → встроенный динамик
- смартфон → наушники
- смартфон → bluetooth → колонка
- смартфон → миниджек → колонки
- смартфон → миниджек → DAW на компьютере → миниджек → колонки
- смартфон → миниджек → педали/примочки → джек → колонки
- смартфон → <a href="https://ru.wikipedia.org/wiki/WebSocket">websocket</a> → компьютер → DAW на компьютере → миниджек → педали/примочки → джек → колонки

Note: использование https://ami.fly.dev - демонстрационный вариант. Главный его недостаток это синхронизация между всеми пользователями; ваш звук и ваши настройки могут перебить случайные пользователи. Плюс, так как информация о движении идёт через интернет, может наблюдаться задержка (порядка 20мс, в зависимости от качества связи). Для решения всех этих недостатков рекомендуется развернуть систему локально (смотри раздел "Запуск релиз-версии").

#### Теория и термины

##### Стратегия синтеза

Способ получения данных с датчиков и определения места, где они будут переведены в звук.

##### Точка синтеза

Устройство, которое получает данные о движении и синтезирует на их основе звук.

##### Локальный режим:

<i>Источник данных</i> и <i>точка синтеза</i> находятся на смартфоне (совмещены).

##### Распределённый режим:

<i>Источник данных</i> находится на смартфоне, а <i>точка синтеза</i> находится на удалённой машине (разнесены). Такой режим в целом позволяет любые сколько угодно сложные комбинации с несколькими источниками данных (смартфонами) и несколькими точками синтеза, находящимися сколь угодно удалённо друг от друга (при трансляции данных через интернет) и подключёнными к разным аудио-системам.

##### Связка

Набор виртуальных устройств осциллятор → фильтр → LFO → envelope.

##### Событие движения

JS-событие, генерируемое примерно каждые 16мс (в зависимости от устройста) смартфоном, содержащее параметры движения. События возникают даже в состоянии покоя - в этом случае параметры движения нулевые.

##### Отсечка

Минимальная скорость движения, при которой заводится система.

##### Жест

Набор событий движения от превышения отсечки до значения ниже отсечки. Каждому жесту соответствует своя связка.

##### Аудио-граф

Система состоит из виртуальных устройств, которые определённым образом соединены. Общий граф выглядит примерно так:
[осциллятор => фильтр => LFO => envelope] => компрессор. Устройства в квадратных скобках (связка) генерируются по каждому жесту и подсоединяются к компрессору. По окончанию работы связки она удаляется и отключается от компрессора.

##### Рабочая полусфера

Человеческая рука при вращении кисти имеет понятные ограничения: левую руку удобно вращать от положения ладонью вверх до положения ладонью вниз по часовой стрелке, а правую руку удобно вращать от положения ладонью вверх до положения ладонью вниз против часовой стрелки.
Смартфон можно вращать вдоль своей оси на 360 градусов. Но в данной системе 360 градусов поделены пополам: когда смартфон лежит на столе экраном вверх это 180 градусов (ладонь вверх), а когда на экране (ладонь вниз) это 0. От 0 до 180 можно пройти двумя путями: вращая смартфон против часовой стрелки и по часовой стрелке. Чтобы сделать систему эргономичной, мы можем разделить 360 градусов на две полусферы, где правая полусфера удобна для левши, а левая полусфера удобна для правши.

#### User guide

На синтез звука влияет два параметра - положение и скорость движения.

Положение (угол наклона по полусфере) определяет частоту, отображаемую в поле <b>Генерируемая частота</b>, а также ниже в поле <b>Нота</b> попадание этой частоты в ближайшую ноту.

Скорость движения влияет на два фактора:
- включает систему, когда скорость движения превышает <b>Отсечку</b>, определённую в соответствующем поле
- влияет на громкость при включённом параметре <b>Влияние скорости на громкость</b>

При определении Отсечки на 0, всё время будет работать один осциллятор.

Соответственно, система включается при превышении отсечки, создаёт связку и генерирует звук. При замедлении до значения ниже отсечки, система планирует затухание звука (если поле <b>Затухание (Release)</b> не равно 0).

В поле <b>Количество осцилляторов</b> отображаются все связки, звучачие на данный момент. Количество осцилляторов лучше не доводить, по текущим наблюдениям, до значений выше 120 штук, так как почти наверняка вычислительная мощь устройства на этом закончится и звук начнёт заикаться, либо вовсе пропадёт.

Например, при хаотичном встряхивании рукой в течение какого-то времени, отсечка будет несколько раз превышена случайным образом, а значит будет сгенерировано несколько связок, которые будут плавно затухать и их звук наложится друг на друга.

По субъективным наблюдениям оптимальная отсечка может быть в пределах от 3 до 7 (по умолчанию 1), тогда можно исключить случайные движения.

Так как частоты распределены по полусфере, предусмотрено поле <b>Рабочая полусфера</b>, позволяющая переключаться систему под левшу или правшу.

Полусфера содержит 1800 делений (180 градусов * 10 десятые доли), по которым распределяются значения, указанные в поле <b>Диапазон частот</b>. Значения распределяются непрерывно и экспоненциально, то есть на высоких значениях на каждый градус приходится больше герц, что позволяет учесть особенности нашего слуха и сделать распределение частот по полусфере равномерным.

Есть возможность перераспределить по полусфере ноты в рамках 12-ступенного равномерно темперированного строя с помощью поля <b>Режим генерации частот</b>, выбрав <b>Темперированный режим</b>. Тогда поле диапазон частот автоматически заменится на <b>Диапазон нот</b>. Выбрав небольшой диапазон, можно довольно точно и уверенно попадать в нужные ноты.

Поле <b>Движение по осям α/β/γ</b> показывается скорости движения по трёх координатам в пространстве.

Поле <b>Положение смартфона по оси γ</b> показывает угол наклона в полусфере. Этот угол наклона определяет частоту синтезируемого звука.

Поле <b>Наличие движения</b> показывает `true`, когда отсечка превышена и система генерирует звук в текущей связке.

Поле <b>Максимальное значение</b> показывает максимальную скорость движения за всё время сессии (то есть от момента открытия вкладки, до текущего момента).

<b>Режим приёмника данных включён</b> - это означает, что компьютер готов принимать данные от внешних смартфонов.

<b>Режим источника данных включён</b> - это означает, что смартфон транслирует свои данные о движении на удалённый комьютер.

<b>Подключение к вебсокет-серверу</b> - в этом статусе система пытается установить websocket-соединение с сервером, через который данные будут транслироваться между смартфоном и компьютером.

<b>Связь с вебсокет-сервером установлена</b> - есть возможность передавать данные между устройствами.

<b>Связь с вебсокет-сервером потеряна</b> - что-то произошло на сервере и он больше не отвечает, либо устройство отключилось от интернета и потеряло связь.

<b>Подключено (х)</b> - количество подключённых устройств, <i>помимо данного компьютера</i> (это поле отображается только с десктопа).

<b>Ожидание подключений</b> - ни одно устройство не подключено помимо этого компьютера (это поле отображается только с десктопа).

<b>Режим экономии вычислительных ресурсов</b> - события движения, а также пересчёт выходных значений синтезируемого звука запускает очень быстрое обновление данных в интерфейсе. Это обновление довольно затратная операция. Для экономии ресурсов устройства, особенно если вы на каком-то этапе слышите щелчки или артефакты звука, можно включить этот режим, но он отключит все обновления данных в интерфейсе и ориентироваться нужно будет только на слух.

<b>Таймаут датчика</b> - как и отсечка датчика, этот параметр позволяет лучше контролировать движение и избавиться от случайных звуков. Он выставляет паузу после окончания предыдущего жеста, нивелируя случайные превышения отсечки при замедлении скорости движения.

<b>Атака</b> - время плавного нарастания громкости до значения в поле громкость.

<b>Громкость</b> целевое значение громкости, до которого нарастает атака и от которого начинается затухание.

<b>Затухание до значения</b> значение громскоти, до которого звтухает звук. По умолчанию `0,0001`, минимальное значение (ноль поставить нельзя по математическим причинам, так как затухание идёт экспоненциально). Если поставить это значение больше громкости, то звук будет нарастать и резко обрываться, что создаст своего рода эффект вывернутого наизнанку звука.

<b>Фильтр</b> - lowpass-фильтр, срезает верхние частоты, начиная от частоты, указанной в соответствующем поле. Q-фактор определяет "мощность" подавления частот, широту влияния на частоты. (из всех возможных фильтров был фибран именно lowpass, так как он смягчает звенящие высокие частоты, что очень уместно для такой системы. Если есть потребность в более изощрённой фильтрации или вооще в полноценном эквалайзере, то необходимо возмользоваться внешними решениями, будь то DAW или какие-то отдельные устройства).

<b>LFO</b> - осциллятор, управляющий ручкой громкости основного осциллятора. Амплитуда опереляет глубину изменения громкости, а частота скорость изменения громкости.

<b>Компрессор</b> - по умолчанию его влияние сведено к минимуму. Если хочется играть множество осцилляторов сразу, а скатываться в грубый нойз нет желания, можно поставить, к примеру, поле <b>Release</b> на `0.25`, а поле <b>Threshold</b> на `-50`.

<b>Сброс осцилляторов</b> - выключает и удаляет все работающие связки. Помогает в случае, если от обилия осцилляторов звук начать выдавать артефакты, а также если были выставлены очень большие значения затухания и не хочется ждать пока звук затихнет.

<b>Errors</b> - это поле будет убрано после окончания тестирования. Сюда будут вставляться все ошибки, возникающие в процессе работы, что поможет отладить систему.

#### Запуск

##### Запуск демо-версии

В локальном режиме:
1. Зайти на https://ami.fly.dev со смартфона

Note: в локальном режиме задержка синтеза звука может быть довольно ощутима в связи с тем, что вычислительный ресурс у смартфона довольно ограничен по сравнению с даже самым средним ноутбуком.

В распределённом режиме:
1. Зайти на https://ami.fly.dev с компа
2. Зайти на https://ami.fly.dev со смартфона

Note: в распределённом режиме синтез звука становится общим для всех кто зашёл в данным момент на сайт, а настройки синхронизироются между всеми пользователями. То есть, если на сайт зашло несколько человек одновременно и кто-то поменял настройки синтеза, они поменяются у всех участников; звуки, генерируемые одним участником, воспроизведутся на всех устройстах всех посетителей.

##### Запуск релиз-версии (запуск на локальном компьютере)

Релиз версия содержит:
- index.js
- /node_modules
- client/dist

1. Ставим Node.js
2. Скачиваем AMI
3. Генерим SSL-сертификаты с именами localhost+2.pem и localhost+2-key.pem
4. Запускаем cmd.exe
5. node index
6. Открываем ссылку из терминала на компе
7. Открываем ссылку из терминала на смартфоне

Note: смартфон и компьютер должны быть подключены к одной wifi-сети. Либо можно запустить виртуальный роутер на ноутбуке (с помощью стороннего сервиса а-ля Connectify) и подключить смартфон к ноутбуку.

Note: время задержки в таком варианте запуска самое минимальное из возможных.

TODO: сделать эту релиз-версию и где-то выложить
TODO: можно автоматизировать через shell-скрипт (можно ли поставить ноду в тихом режиме?)
TODO: можно попробовать Electron

##### Запуск development-версии

При желании доработать или переработать код, нужно запустить необходимое окружение разработки.

Первый запуск

1. `git clone`
2. `npm i`
3. Генерация ssl-сертификата
https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node
4. `nodemon index` (или просто `node index`)
5. Открываем второй терминал
6. `cd client`
7. `npm i`
8. `gulp`

Последующие запуски:
1. В первом терминале: `nodemon index` (или просто `node index`)
2. Во втором терминале: `cd client`
3. `gulp`

Первый терминал это бэкенд, второй терминал это фронтенд.

На компе и смартфоне открываем ссылку из первого терминала.

Включаем распределённую стратегию синтеза.

Note: в целях разработки лучше глобалньо установить Nodemon. Тогда за перезапуск при измененях кода в бэкенде будет отвечать он, а за изменения в коде фронтенда будет отвечать Gulp.

##### Туннелирование локального сервера

Локальный сервер можно расшарить в интернет с помощью туннелирования, например, с сервисом ngrok:

`ngrok http https://localhost`

На компе открываем https://localhost

На смартфоне сгенеренную ngrok ссылку на туннель.

#### Tech guide

Стек: HTML, SASS, JS, Web Audio API, Device Motion API, Device Orientation API, Socket.io, Express, Gulp.

AMI это по сути небольшое "fullstack" веб-приложение с https-сервером на Express и websocket-сервером на Socket.io, раздающее несложный фронтенд на нативном JS с использованием Web Audio API (WAAPI), Device Motion API (DMAPI) и Device Orientation API (DOAPI). Мы собираем данные с DMAPI/DOAPI, приводим их в порядок и отправляем сразу в WAAPI в локальном режиме и в websocket в распределённом режиме (а на удалённой машине эти данные принимаются по websocket и там уже отдаются в WAAPI).

![](https://ami.stranno.su/api.png)

index.js - точка входа в приложение. Запускает Express и Socket.io, раздаёт фронтенд из client/dist. Фронтенд собирает Gulp в папке /client из /client/src и готовое кладёт в client/dist. JS собирается Webpack, Sass компилируется в CSS, HTML собирается из шаблонов, в `<head>` инжектируется собранный JS и CSS. BrowserSync запускает development-сервер на отдельном порту, но на нём не будет работать бэкенд, поэтому лучше открывать адрес без порта, указанный в терминале бэкенда.

Код приложения во многих местах прокомментирован, поэтому нюансы работы можно изучить непосредственно в коде.

Грубая схема движения данных по функциям после инициализации

![](https://ami.stranno.su/functions.png)

На десктопе срабатывает один раз событие движения, которое инициализирует режим приёмника данных. На мобильном устройстве события движения срабатывают регулярно. У каждого события проверяется скорость движения (максимальная из трёх координат) и сравнивается с отсечкой, если превысили, то создаём связку. <i>Если после этого</i> оказались ниже отсечки, то планируем удаление связки. Все элементы связки пушатся в массивы, а затем из них удаляются.

Приложением управляет объект настроек в `settings.js`, который мутируется через UI.

#### Bags and features

- TODO: упаковка в Electron. Попробовать тупо перенести с моими сертами. Если нет, то генерить их автоматом при первом запуске
- TODO: создать нормальную документацию по разработке
- TODO: создать юзер гайд по инструменту с видео, гайд по развёртке с ноутом (по сути надо будет поставить ноду и запустить index.js с серверами, gulp и исходники фронта не нужны. Только нужно преодолеть https-сертификаты)
- TODO: режим записи нот (для трюка с импровизацией/композицией для падающего смартфона). по каждому событию движения частота переводится в ноту и затем проверяется режим записи из сеттингс - если вкл, то иннертекстим ноту на экран. далее можно допилить рисовку на нотном стане и даже отдельный фронтэнд для только партитуры
- TODO: перевести на английский
- TODO: в диапазоне нот указывать не номера, а имена нот с октавами
- TODO: fullscreen mode
- TODO: PWA
- TODO: сделать для цифровых полей изменение значений слайдом, для переключателей сделать перключение кликом по строке