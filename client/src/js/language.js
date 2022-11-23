import { getLanguage } from './helpers'
import { i18n } from './i18n'

export let language = i18n[getLanguage()]

export default function languageInit() {
  document.querySelector('.regime.desktop').textContent = language.desktopRegime
  document.querySelector('.regime.mobile').textContent = language.mobileRegime
  document.querySelector('.connections__to-server').textContent = language.connection.connecting
  document.querySelector('.connections__status').textContent = language.connection.waiting
  document.querySelector('.is-motion').textContent = language.isMotion
  document.querySelector('.motion-coords').textContent = language.motionCoords
  document.querySelector('.motion-max').textContent = language.motionMax
  document.querySelector('.osc-count').textContent = language.oscCount
  document.querySelector('.orientation-coords').textContent = language.orientationCoords
  document.querySelector('.generated-frequency').textContent = language.generatedFrequency
  document.querySelector('.tuner__note').textContent = language.note
  document.querySelector('.synthesis-regime span').textContent = language.synthesisRegime
  document.querySelector('.synthesis-local').textContent = language.synthesis.local
  document.querySelector('.synthesis-remote').textContent = language.synthesis.remote
  document.querySelector('.frequency-regime span').textContent = language.frequencyRegime
  document.querySelector('.continuous').textContent = language.frequency.continuous
  document.querySelector('.tempered').textContent = language.frequency.tempered
  document.querySelector('.gain-generation span').textContent = language.gainGeneration
  document.querySelector('.speedgain-yes').textContent = language.yes
  document.querySelector('.speedgain-no').textContent = language.no
  document.querySelector('.cutoff').textContent = language.cutoff
  document.querySelector('.timeout-span').textContent = language.timeout
  document.querySelector('.wave-type').textContent = language.waveType
  document.querySelector('.attack-span').textContent = language.attack
  document.querySelector('.gain-span').textContent = language.gain
  document.querySelector('.release-container span').textContent = language.release
  document.querySelector('.attenuation-container span').textContent = language.releaseValue
  document.querySelector('.freq-range-span').textContent = language.freqRange
  document.querySelector('.freq-from').textContent = language.from
  document.querySelector('.freq-to').textContent = language.to
  document.querySelector('.notes-range-span').textContent = language.noteRange
  document.querySelector('.notes-range-from').textContent = language.from
  document.querySelector('.notes-range-to').textContent = language.to
  document.querySelector('.filter-span').textContent = language.filter
  document.querySelector('.filter-freq').textContent = language.filterFreq
  document.querySelector('.filter-q').textContent = language.filterQ
  document.querySelector('.lfo-power').textContent = language.lfoPower
  document.querySelector('.lfo-type').textContent = language.lfoType
  document.querySelector('.lfo-rate').textContent = language.lfoRate
  document.querySelector('.lfo-on').textContent = language.yes
  document.querySelector('.lfo-off').textContent = language.no
  document.querySelector('.lfo-depth').textContent = language.lfoDepth
  document.querySelector('.compressor-span').textContent = language.compressor
  document.querySelector('.semisphere').textContent = language.semisphere
  document.querySelector('.sphere-right').textContent = language.leftHanded
  document.querySelector('.sphere-left').textContent = language.rightHanded
  document.querySelector('.off span').textContent = language.off
  document.querySelector('.lite-span').textContent = language.lite
  document.querySelector('.lite-on').textContent = language.yes
  document.querySelector('.lite-off').textContent = language.no
  document.querySelector('.theme-span').textContent = language.theme
  document.querySelector('.theme-dark').textContent = language.themeDark
  document.querySelector('.theme-light').textContent = language.themeLight
  document.querySelector('.qr__text').innerHTML = language.qr
}