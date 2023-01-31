export const i18n = {
  ru: {
    desktopRegime: 'Режим приёмника данных включён',
    mobileRegime: 'Режим источника данных включён',
    connection: {
      connecting: 'Подключение к серверу...',
      ready: 'Связь с сервером установлена',
      failed: 'Связь с сервером отсутствует',
      waiting: 'Ожидание подключений...',
      connected: 'Подключено'
    },
    isMotion: 'Наличие движения',
    motionCoords: 'Движение по осям α/β/γ (м/с²)',
    motionMax: 'Максимальное значение (м/с²)',
    oscCount: 'Количество осцилляторов',
    orientationCoords: 'Положение смартфона по оси γ',
    generatedFrequency: 'Генерируемая частота (Гц)',
    note: 'Нота',
    sensor: 'Датчик',
    synthesisRegime: 'Стратегия синтеза',
    synthesis: {
      local: 'Локальная',
      remote: 'Распределённая'
    },
    frequencyRegime: 'Режим генерации частот',
    frequency: {
      continuous: 'Непрерывный',
      tempered: 'Темперированный'
    },
    gainGeneration: 'Влияние скорости на громкость',
    yes: 'Да',
    no: 'Нет',
    cutoff: 'Отсечка датчика (м/с²)',
    cutoffType: {
      title: 'Тип отсечки',
      full: 'Полная',
      peak: 'До пика',
    },
    timeout: 'Таймаут датчика (мс)',
    oscillator: 'Осциллятор',
    waveType: 'Тип волны',
    attack: 'Атака',
    gain: 'Громкость',
    release: 'Затухание',
    releaseValue: 'Затухание до значения',
    freqRange: 'Диапазон частот',
    from: 'От',
    to: 'До',
    noteRange: 'Диапазон нот',
    filter: 'Фильтр',
    filterFreq: 'Частота',
    filterQ: 'Q-фактор',
    lfoPower: 'Подключить',
    lfoType: 'Тип волны',
    lfoRate: 'Частота (Rate)',
    lfoDepth: 'Амплитуда (Depth)',
    compressor: 'Компрессор',
    semisphere: 'Рабочая полусфера',
    leftHanded: 'Левша',
    rightHanded: 'Правша',
    lite: 'Режим экономии вычислительных ресурсов',
    theme: 'Тема',
    themeDark: 'Тёмная',
    themeLight: 'Светлая',
    off: 'Сброс осцилляторов',
    qr: 'Наведи камеру смартфона для подключения к компьютеру, либо вручную перейди по ссылке в мобильном браузере:<br><span></span>',
    description: 'Система синтезирует звук на основе данных с датчиков движения смартфона: скорость определяет громкость, положение определяет частоту.',
    dfap: 'Этот проект — часть<br><a href="https://dfap.stranno.su" target="_blank" rel="noopener noreferrer">Цифровой фиксации аудио процессов</a>',
    links: '<a href="https://github.com/MaxAlyokhin/audio-motion-interface" target="_blank" rel="noopener noreferrer">Исходники</a> <a href="https://github.com/MaxAlyokhin/audio-motion-interface/blob/master/README_RU.md#user-guide" target="_blank" rel="noopener noreferrer">Инструкция</a>',
    run: 'Запуск',
    interface: 'Скрыть интерфейс',
    slide: 'Перетащи кружок за черту для разблокировки интерфейса'
  },

  en: {
    desktopRegime: 'Data receiver mode is enabled',
    mobileRegime: 'Data source mode is enabled',
    connection: {
      connecting: 'Connecting to server...',
      ready: 'Connection with server is ready',
      failed: 'Connection with server is failed',
      waiting: 'Waiting for connections...',
      connected: 'Connected'
    },
    isMotion: 'Motion status',
    motionCoords: 'Motion by α/β/γ axes (m/s²)',
    motionMax: 'Maximum value (m/s²)',
    oscCount: 'Oscillator amount',
    orientationCoords: 'Smartphone position on the γ axis',
    generatedFrequency: 'Generated frequency (Hz)',
    note: 'Note',
    sensor: 'Sensor',
    synthesisRegime: 'Synthesis strategy',
    synthesis: {
      local: 'Local',
      remote: 'Distributed'
    },
    frequencyRegime: 'Frequency generation mode',
    frequency: {
      continuous: 'Continuous',
      tempered: 'Tempered'
    },
    gainGeneration: 'Speed influences the volume',
    yes: 'Yes',
    no: 'No',
    cutoff: 'Sensor cutoff (m/s²)',
    cutoffType: {
      title: 'Cutoff type',
      full: 'Full',
      peak: 'Up-to-peak',
    },
    timeout: 'Sensor timeout (ms)',
    oscillator: 'Oscillator',
    waveType: 'Type of wave',
    attack: 'Attack',
    gain: 'Volume',
    release: 'Release',
    releaseValue: 'Attenuation to value',
    freqRange: 'Frequency range',
    from: 'From',
    to: 'To',
    noteRange: 'Range of notes',
    filter: 'Filter',
    filterFreq: 'Frequency',
    filterQ: 'Q-factor',
    lfoPower: 'Connect',
    lfoType: 'Type of wave',
    lfoRate: 'Rate',
    lfoDepth: 'Depth',
    compressor: 'Compressor',
    semisphere: 'Used semisphere',
    leftHanded: 'Left-handed',
    rightHanded: 'Right-handed',
    lite: 'Performance saving mode',
    theme: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    off: 'Reset oscillators',
    qr: 'Point your smartphone camera to connect to computer, or manually follow the link in your mobile browser:<br><span></span>',
    description: 'The system synthesizes sound based on data from smartphone motion sensors: speed determines the volume, position determines the frequency.',
    dfap: 'This project is part of<br><a href="https://dfap.stranno.su" target="_blank" rel="noopener noreferrer">Digital fixation of audio processes</a>',
    links: '<a href="https://github.com/MaxAlyokhin/audio-motion-interface" target="_blank" rel="noopener noreferrer">Source code</a> <a href="https://github.com/MaxAlyokhin/audio-motion-interface/blob/master/README.md#user-guide" target="_blank" rel="noopener noreferrer">User guide</a>',
    run: 'Run',
    interface: 'Interface off',
    slide: 'Slide up the circle to the line for unlock interface'
  }
}