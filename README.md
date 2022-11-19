# Audio Motion Interface (AMI)

*Интерфейс сонификации движения и положения*

[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m793083121-0b0a0d608a9491e5a58871a4)](https://ami.stranno.su) [![Uptime Robot status](https://img.shields.io/uptimerobot/ratio/m793083121-0b0a0d608a9491e5a58871a4)](https://ami.stranno.su)

Демо: https://ami.stranno.su

> **Note**: Safari не поддерживается

> **Note**: В Firefox баг — на дефолтных настройках проблемы со звуком. Рекомендуется поставить значение атаки минимум на 0.1 для исправления

![](https://store.stranno.su/ami/design-ru.png)

Система синтезирует звук на основе данных с датчиков движения смартфона: скорость определяет громкость, положение определяет частоту.

Предусмотрен т.н. локальный режим (когда звук генерирует смартфон и просто подключается к колонкам/комбику/наушникам/bluetooth-колонкам) и распределённый режим (когда смартфон передаёт данные о движении на компьютер и уже компьютер генерирует звук, который подключается к воспроизводящей аудио-системе).

Алгоритм имеет минимальное количество внутренних настроек, оставляя на ваше усмотрение возможность обработки звука (это могут быть как педали/примочки, так и разнообразные DAW вроде Ableton, Cubase, FL Studio и т.д.).

## Кратко как использовать

Самый простой вариант — зайти со смартфона на https://ami.stranno.su. Смартфон попросит доступ к датчикам — его необходимо разрешить. После этого он сразу начнёт при лёгком встряхивании генерировать звук из встроенного динамика. Здесь лучше либо подключить наушники, либо подключиться к bluetooth-колонке, либо кабелем миниджек-миниджек (или с помощью переходника на джек) соединить с колонками/усилителем/комбиком. При таком варианте есть следующие недостатки:

- вы связаны кабелем
- у смартфона есть ощутимая задержка
- вы не видите что играете (генерируемую ноту/частоту)
- не очень удобно изменять настройки

Все эти недостатки решаются *распределённым режимом* работы. Для этого:

- на смартфоне переключить стратегию синтеза на распределённый режим
- зайти дополнительно с компьютера на https://ami.stranno.su. На компьютере автоматически включится специальный режим приёмника данных. При этом отобразится строка "Подключено (1)" (цифра может быть больше, если кто-то ещё зашёл на сайт вместе с вами)
- теперь смартфон передаёт данные о движении на компьютер. Здесь и смартфон, и компьютер начинают синтезировать звук. Смартфон справляется с этой задачей с большей задержкой, из-за чего при включённом звуке на обоих устройствах можно услышать что-то вроде эха. Здесь можно убавить громкость на смартфоне до нуля, а компьютер подключить к вашей аудио-системе.

Из компьютера, соответственно, можно звук передать в DAW через Virtual Audio Cabel (VAC) и обработать там, пустив на вход VAC звуки операционной системы (так как браузер отдаёт звук туда), а выход VAC подключить к DAW. Тогда звук можно снимать либо с миниджека компьютера, либо с внешнего-аудиоинтерфейса, а оттуда обрабатывать дальше.

Итого некоторые возможные схемы работы:
- смартфон → встроенный динамик
- смартфон → наушники
- смартфон → bluetooth → колонка
- смартфон → миниджек → колонки
- смартфон → миниджек → DAW на компьютере → миниджек → колонки
- смартфон → миниджек → педали/примочки → джек → колонки
- смартфон → <a href="https://ru.wikipedia.org/wiki/WebSocket">websocket</a> → компьютер → DAW на компьютере → миниджек → педали/примочки → джек → колонки

> **Note**: использование https://ami.stranno.su — демонстрационный вариант. Главный его недостаток это синхронизация между всеми пользователями; ваш звук и ваши настройки могут перебить случайные пользователи. Плюс, так как информация о движении идёт через интернет (как минимум до Франкфурта, где располагается сервер, и обратно), может наблюдаться задержка (порядка 20мс, в зависимости от качества связи). Для решения всех этих недостатков рекомендуется развернуть систему локально (смотри раздел **"Запуск десктоп-версии"**).

## Теория и термины

### Стратегия синтеза

Способ получения данных с датчиков и определения места, где они будут переведены в звук.

### Точка синтеза

Устройство, которое получает данные о движении и синтезирует на их основе звук.

### Локальный режим

*Источник данных* и *точка синтеза* находятся на смартфоне (совмещены).

### Распределённый режим

*Источник данных* находится на смартфоне, а *точка синтеза* находится на удалённой машине (разнесены). Такой режим в целом позволяет любые сколько угодно сложные комбинации с несколькими источниками данных (смартфонами) и несколькими точками синтеза, находящимися сколь угодно удалённо друг от друга (при трансляции данных через интернет) и подключёнными к разным аудио-системам.

### Связка

Набор виртуальных устройств [осциллятор](https://ru.wikipedia.org/wiki/%D0%9E%D1%81%D1%86%D0%B8%D0%BB%D0%BB%D1%8F%D1%82%D0%BE%D1%80) → [фильтр](https://ru.wikipedia.org/wiki/%D0%A4%D0%B8%D0%BB%D1%8C%D1%82%D1%80_%D0%BD%D0%B8%D0%B6%D0%BD%D0%B8%D1%85_%D1%87%D0%B0%D1%81%D1%82%D0%BE%D1%82) → [LFO](https://ru.wikipedia.org/wiki/LFO) → [огибающая](https://ru.wikipedia.org/wiki/ADSR-%D0%BE%D0%B3%D0%B8%D0%B1%D0%B0%D1%8E%D1%89%D0%B0%D1%8F).

### Событие движения

[JS-событие](https://learn.javascript.ru/introduction-browser-events), генерируемое примерно каждые 16мс (в зависимости от устройста) смартфоном, содержащее параметры движения. События возникают даже в состоянии покоя — в этом случае параметры движения нулевые.

### Отсечка

Минимальная скорость движения, при которой заводится система.

### Жест

Набор событий движения от превышения отсечки до значения ниже отсечки. Каждому жесту соответствует своя связка.

### Аудио-граф

Граф — это абстракция, соединяющая *узлы* *связями*. Например, граф для электрогитары может быть примерно таким: гитара → педаль 1 → педаль 2 → педаль 3 → комбик. AMI состоит из виртуальных устройств (узлов), которые определённым образом соединены. Общий граф выглядит примерно так:
[осциллятор → фильтр → LFO → огибающая] → компрессор. Устройства в квадратных скобках (связка) генерируются *по каждому жесту* и подсоединяются к компрессору. По окончанию работы связки она удаляется и отключается от компрессора.

### Рабочая полусфера

Человеческая рука при вращении кисти имеет понятные ограничения: левую руку удобно вращать от положения ладонью вверх до положения ладонью вниз по часовой стрелке, а правую руку удобно вращать от положения ладонью вверх до положения ладонью вниз против часовой стрелки.

Смартфон можно вращать вдоль своей оси на 360 градусов. Но в данной системе 360 градусов поделены пополам: когда смартфон лежит на столе экраном вверх это 180 градусов (ладонь вверх), а когда на экране (ладонь вниз) это 0. От 0 до 180 можно пройти двумя путями: вращая смартфон против часовой стрелки и по часовой стрелке. Чтобы сделать систему эргономичной, мы можем разделить 360 градусов на две полусферы, где правая полусфера удобна для левши, а левая полусфера удобна для правши.

![](https://store.stranno.su/ami/semi-sphere.jpg)
**На рисунке в центре условно показан смартфон экраном вниз*

## User guide

На синтез звука влияет два параметра — положение и скорость движения.

Положение (угол наклона по полусфере) определяет частоту, отображаемую в поле **Генерируемая частота**, а также ниже в поле **Нота** попадание этой частоты в ближайшую ноту.

Скорость движения влияет на два фактора:
- включает систему, когда скорость движения превышает **Отсечку**, определённую в соответствующем поле
- влияет на громкость при включённом параметре **Влияние скорости на громкость**

При определении отсечки на 0, всё время будет работать один осциллятор.

Соответственно, система включается при превышении отсечки, создаёт связку и генерирует звук. При замедлении до значения ниже отсечки, система планирует затухание звука (если поле **Затухание (Release)** не равно 0).

В поле **Количество осцилляторов** отображаются все связки, звучащие на данный момент.

Например, при хаотичном встряхивании рукой в течение какого-то времени, отсечка будет несколько раз превышена случайным образом, а значит будет сгенерировано несколько связок, которые будут плавно затухать и их звук наложится друг на друга. Количество осцилляторов лучше не доводить, по текущим наблюдениям, до значений выше 120 штук, так как почти наверняка вычислительная мощь устройства на этом закончится и звук начнёт заикаться, либо вовсе пропадёт.

По субъективным наблюдениям оптимальная отсечка может быть в пределах от 3 до 7 (по умолчанию 1), тогда можно исключить случайные движения.

Так как частоты распределены по полусфере, предусмотрено поле **Рабочая полусфера**, позволяющее переключать систему под левшу или правшу.

Полусфера содержит 1800 делений (180 градусов * десятые доли), по которым распределяются значения, указанные в поле **Диапазон частот**. Значения распределяются непрерывно и экспоненциально, то есть на высоких значениях на каждый градус приходится больше герц, что позволяет учесть особенности нашего слуха и сделать распределение частот по полусфере равномерным.

Есть возможность перераспределить по полусфере ноты в рамках 12-ступенного равномерно темперированного строя с помощью поля **Режим генерации частот**, выбрав **Темперированный режим**. Тогда поле диапазон частот автоматически заменится на **Диапазон нот**. Выбрав небольшой диапазон, можно довольно точно и уверенно попадать в нужные ноты.

Поле **Движение по осям α/β/γ** показывает скорости движения по трём координатам в пространстве.

Поле **Положение смартфона по оси γ** показывает угол наклона в полусфере. Этот угол наклона определяет частоту синтезируемого звука.

Поле **Наличие движения** показывает `true`, когда отсечка превышена и система генерирует звук в текущей связке. В положении `false` система находится в режиме ожидания превышения отсечки и не генерирует звуки.

Поле **Максимальное значение** показывает максимальную скорость движения за всё время сессии (то есть от момента открытия вкладки, до текущего момента).

**Режим приёмника данных включён** означает, что компьютер готов принимать данные от внешних смартфонов.

**Режим источника данных включён** означает, что смартфон транслирует свои данные о движении на удалённый компьютер.

**Подключение к вебсокет-серверу** — в этом статусе система пытается установить websocket-соединение с сервером, через который данные будут транслироваться между смартфоном и компьютером.

**Связь с вебсокет-сервером установлена** — есть возможность передавать данные между устройствами.

**Связь с вебсокет-сервером потеряна** — что-то произошло на сервере и он больше не отвечает, либо устройство отключилось от интернета и потеряло связь.

**Подключено (х)** — количество подключённых устройств, *помимо данного компьютера* (это поле отображается только с десктопа).

**Ожидание подключений** — ни одно устройство не подключено помимо этого компьютера (это поле отображается только с десктопа).

**Режим экономии вычислительных ресурсов** — события движения, а также пересчёт выходных значений синтезируемого звука, запускают очень быстрое обновление данных в интерфейсе. Это обновление довольно затратная операция. Для экономии ресурсов устройства, особенно если вы на каком-то этапе слышите щелчки или артефакты звука, можно включить этот режим, но он отключит все обновления данных в интерфейсе и ориентироваться нужно будет только на слух.

**Таймаут датчика** — как и отсечка датчика, этот параметр позволяет лучше контролировать движение и избавиться от случайных звуков. Он выставляет паузу после окончания предыдущего жеста, нивелируя случайные превышения отсечки при замедлении скорости движения.

**Атака** — время плавного нарастания громкости до значения в поле громкость.

**Громкость** — целевое значение громкости, до которого нарастает атака и от которого начинается затухание.

**Затухание до значения** — значение громкости, до которого звтухает звук. По умолчанию `0,0001`, минимальное значение (ноль поставить нельзя по математическим причинам, так как затухание идёт экспоненциально). Если поставить это значение больше громкости, то звук будет нарастать и резко обрываться, что создаст своего рода эффект вывернутого наизнанку звука.

**Фильтр** — lowpass-фильтр, срезает верхние частоты, начиная от частоты, указанной в соответствующем поле. **Q-фактор** определяет "мощность" подавления частот, широту влияния на частоты (из всех возможных фильтров был выбран именно lowpass, так как он смягчает звенящие высокие частоты, что очень уместно для такой системы. Если есть потребность в более изощрённой фильтрации или вообще в полноценном эквалайзере, то необходимо возпользоваться внешними решениями, будь то DAW или какие-то отдельные устройства).

**LFO** — осциллятор, управляющий ручкой громкости основного осциллятора. Амплитуда опереляет глубину изменения громкости, а частота скорость изменения громкости.

**Компрессор** — по умолчанию его влияние сведено к минимуму. Если хочется играть множество осцилляторов сразу, а скатываться в грубый нойз нет желания, можно поставить, к примеру, поле **Release** на `0.25`, а поле **Threshold** на `-50`.

**Сброс осцилляторов** — выключает и удаляет все работающие связки. Помогает в случае, если от обилия осцилляторов звук начал выдавать артефакты, а также если были выставлены очень большие значения затухания и не хочется ждать пока звук затихнет.

**Ощибки** — это поле будет убрано после окончания тестирования. Сюда будут вставляться все ошибки, возникающие в процессе работы, что поможет отладить систему.

**Fullscreen-mode** — на смартфоне, напротив надписи Audio-motion interface, будет значок перехода в полноэкранный режим (устройства Apple его, по всей видимости, не поддерживают). Этот режим рекомендуется, так как в нём отключаются стандартные браузерные жесты "Назад" (при свайпе с левого края вправо) и "Обновить" (при свайпе с верхнего края вниз), что позволит более уверенно держать смартфон в руке не боясь что-то нажать.

## Запуск

### Запуск веб-версии

В локальном режиме:
1. Зайти на https://ami.stranno.su со смартфона

> **Note:** в локальном режиме задержка синтеза звука может быть довольно ощутима в связи с тем, что вычислительный ресурс у смартфона довольно ограничен по сравнению с даже самым средним ноутбуком.

В распределённом режиме:
1. Зайти на https://ami.stranno.su с компьютера
2. Зайти на https://ami.stranno.su со смартфона

(в любом порядке)

> **Note:** в распределённом режиме синтез звука становится общим для всех кто зашёл в данным момент на сайт, а настройки синхронизироются между всеми пользователями. То есть, если на сайт зашло несколько человек одновременно и кто-то поменял настройки синтеза, они поменяются **у всех участников**; звуки, генерируемые одним участником, воспроизведутся **на всех устройстах всех посетителей**.

### Запуск десктоп-версии (запуск на локальном компьютере)

> **Note:** смартфон и компьютер должны быть подключены к одной wifi-сети. Либо можно запустить виртуальный роутер на ноутбуке (с помощью стороннего сервиса а-ля Connectify) и подключить смартфон к ноутбуку.

> **Note:** время задержки в таком варианте запуска самое минимальное из возможных.

> **Node:** так как для шифрования трафика, которого требует API, используется самоподписанный сертификат, браузеры будут выдавать плашку о недействительном (недоверенном) сертификате. Это нормально для работы в пределах локальной сети. Подробнее в разделе Secure context

Windows:
1. [Скачать архив](https://store.stranno.su/ami/windows/audio-motion-interface.zip)
2. Распаковать
3. Кликнуть на `run.bat`

MacOS:
1. [Скачать архив](https://store.stranno.su/ami/macos/audio-motion-interface.zip)
2. Распаковать
3. Перенести папку в Documents*
4. `cmd` + `Space`
5. Ввести "terminal.app", запустить Терминал
6. В терминале ввести `cd` и *перетащить мышкой папку* "audio-motion-interface" из Finder в терминал. Терминал автоматически вставит путь до папки. Получится что-то вроде:
`cd /User/Имя пользователя/Documents/audio-motion-interface`
Нажать `Enter`
7. Ввести `chmod -R 755 app` и нажать `Enter`
8. Кликнуть файл run.command правой кнопкой мыши, там "открыть с помощью Терминал"
9. Дать разрешение на исполнение файла. **В дальнейшем можно будет запускать AMI просто кликая на run.command**

*В целом можно перенести в любую папку, но тогда надо отредактировать файл run.command любым текстовым редактором и иправить пути до Node.js и до index.js

Цель обоих установок такова:
в папках уже лежит Node.js. Нужно с её помощью открыть файл index.js. Это удобно делать скриптом. В MacOS для этого необходимо дополнительно сделать скрипт исполняемым через `chmod -R 755 app`.

Возможно есть более простые способы установки. Буду рад вашим предложениям.

На Linux установка будет аналогична MacOS, только необходимо будет скачать бинарные файлы Node.js под Linux и положить в папку /app/node. Если Node.js уже установлена глобально, то нужно просто ею запустить файл index.js.

### Запуск development-версии

При желании доработать или переработать код, нужно запустить необходимое окружение разработки.

Первый запуск:

1. `git clone https://github.com/MaxAlyokhin/audio-motion-interface.git`
2. Открываем папку в терминале
3. `npm i`
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

> **Note:** в целях разработки лучше глобально установить Nodemon. Тогда за перезапуск при изменениях кода в бэкенде будет отвечать он, а за изменения в коде фронтенда будет отвечать Gulp

В репозитории уже содержатся приватный и публичный ключи для запуска https-сервера. Подробнее смотри ниже в разделе Secure context.

### Туннелирование локального сервера

Локальный сервер можно расшарить в интернет с помощью туннелирования, например, с сервисом ngrok:

`ngrok http https://localhost`

На компе открываем https://localhost

На смартфоне сгенеренную ngrok ссылку на туннель.

## Tech guide

Стек: HTML, Sass, JS, Web Audio API, Device Motion API, Device Orientation API, Socket.io, Express, Gulp.

AMI это по сути небольшое "fullstack" веб-приложение с https-сервером на Express и websocket-сервером на Socket.io, раздающее несложный фронтенд на нативном JS с использованием Web Audio API (WAAPI), Device Motion API (DMAPI) и Device Orientation API (DOAPI). Мы собираем данные с DMAPI/DOAPI, приводим их в порядок и отправляем сразу в WAAPI в локальном режиме и в websocket в распределённом режиме (а на удалённой машине эти данные принимаются по websocket и там уже отдаются в WAAPI).

![](https://store.stranno.su/ami/api.png)

index.js — точка входа в приложение. Запускает Express и Socket.io, раздаёт фронтенд из /client/dist. Фронтенд собирает Gulp в папке /client из /client/src и готовое кладёт в /client/dist. JS собирается Webpack, Sass компилируется в CSS, HTML собирается из шаблонов, в `<head>` инжектируется собранный JS и CSS. BrowserSync запускает development-сервер на отдельном порту, но на нём не будет работать бэкенд (но зато работает live-reload), поэтому лучше открывать адрес без порта (`https://localhost`).

Код приложения во многих местах прокомментирован, поэтому нюансы работы можно изучить непосредственно в коде.

Грубая схема движения данных по функциям после инициализации:

![](https://store.stranno.su/ami/functions-new.png)

С помощью библиотеки [current-device](https://github.com/matthewhudson/current-device) определяется тип устройства — mobile или desktop, который инициализирует соответствующий режим. На мобильном устройстве у каждого события движения проверяется скорость движения (максимальная из трёх координат) и сравнивается с отсечкой, если превысили, то создаём связку. *Если после этого* оказались ниже отсечки, то планируем удаление связки. Все элементы связки пушатся в массивы, а затем из них удаляются.

Приложением управляет объект настроек в `settings.js`, который мутируется через UI.

### Secure context

В связи с тем, что Motion/Orientation API требуют secure context (то есть шифрование трафика), приходится поднимать http**s**-сервер. Для этого с помощью [OpenSSL](https://ru.wikipedia.org/wiki/OpenSSL) были сгенерированы публичный и приватный ключи, с помощью которых шифруется трафик между компьютером и смартфоном ([самоподписанный сертификат](https://en.wikipedia.org/wiki/Self-signed_certificate)). Практической пользы от такого шифрования особо нет, так как данные движутся в пределах вашей локальной сети (да и при утечке в интернет данные о вращении вашего смартфона особого вреда не принесут), но secure context требуется всеми браузерами для передачи данных о движении и положении на внешние устройства.

При необходимости вы можете сгенерировать свой самоподписанный сертификат (подробнее можно подсмотреть [здесь](https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node)).

При публикации кода в вебе скорее всего перед Express-сервером у вас будет ещё какая-то инфраструктура (nginx + панель управления сервером и т.д.), соответственно необходимость в https-сервере скорее всего отпадёт и можно будет поменять index.js так:

``` javascript
const fs = require('fs')
const os = require('os')
const http = require('http') // Поменяли пакет с https на http
const express = require('express')
const { Server } = require('socket.io')
const { lookup } = require('dns')
const open = require('open')

const hostname = os.hostname()
const app = express()
const server = http.createServer(app) // Убрали загрузку сертификатов
```
