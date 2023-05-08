import allyAirDefence from './ally-air-defense.png'
import allyAntiTank from './ally-antitank.png'
import allyArtillery from './ally-artillery.png'
import allyCombo from './ally-combo.png'
import allyInfantry from './ally-infantry.png'
import allyMechInfantry from './ally-mech-infantry.png'
import allyReactiveFireSystem from './ally-reactivefiresystem.png'
import allyRotorcraft from './ally-rotorcraft.png'
import allyTank from './ally-tank.png'

import countAlly2to4 from './count-ally-2_4.png'
import countAlly5to14 from './count-ally-5_14.png'
import countAlly15to79 from './count-ally-15_79.png'
import countAlly80to299 from './count-ally-80_299.png'
import countAlly300to1000 from './count-ally-300_1000.png'
import countAlly1001to2500 from './count-ally-1001_2500.png'
import countAlly2501to5500 from './count-ally-2501_5500.png'
import countAlly5501to25000 from './count-ally-5501_25000.png'
import countAlly25001to50000 from './count-ally-25001_50000.png'
import countAlly50001to300000 from './count-ally-50001-300000.png'
import countAlly300001 from './count-ally-300001_inf.png'

import enemyAirDefence from './enemy-air-defense.png'
import enemyAntiTank from './enemy-antitank.png'
import enemyArtillery from './enemy-artillery.png'
import enemyCombo from './enemy-combo.png'
import enemyInfantry from './enemy-infantry.png'
import enemyMechInfantry from './enemy-mech-infantry.png'
import enemyReactiveFireSystem from './enemy-reactivefiresystem.png'
import enemyRotorcraft from './enemy-rotorcraft.png'
import enemyTank from './enemy-tank.png'

import countEnemy2to4 from './count-enemy-2_4.png'
import countEnemy5to14 from './count-enemy-5_14.png'
import countEnemy15to79 from './count-enemy-15_79.png'
import countEnemy80to299 from './count-enemy-80_299.png'
import countEnemy300to1000 from './count-enemy-300_1000.png'
import countEnemy1001to2500 from './count-enemy-1001_2500.png'
import countEnemy2501to5500 from './count-enemy-2501_5500.png'
import countEnemy5501to25000 from './count-enemy-5501_25000.png'
import countEnemy25001to50000 from './count-enemy-25001_50000.png'
import countEnemy50001to300000 from './count-enemy-50001-300000.png'
import countEnemy300001 from './count-enemy-300001_inf.png'

import landmarkImg from './obstacle.png'

export const allyImages = [
  { image: allyAirDefence, label: 'Проти повітряна зброя' },
  { image: allyAntiTank, label: 'Проти танкова зброя' },
  { image: allyArtillery, label: 'Артилерія' },
  { image: allyCombo, label: 'Змішані війська' },
  { image: allyInfantry, label: 'Піхота' },
  { image: allyMechInfantry, label: 'Механізована піхота' },
  { image: allyReactiveFireSystem, label: 'Реактивна артилерія' },
  { image: allyRotorcraft, label: 'Гвинтокрил' },
  { image: allyTank, label: 'Танкові війська' },
]

export const countsAlly = [
  { image: countAlly2to4, label: 'Вогнева група' },
  { image: countAlly5to14, label: 'Відділення' },
  { image: countAlly15to79, label: 'Взвод' },
  { image: countAlly80to299, label: 'Рота' },
  { image: countAlly300to1000, label: 'Батальйон' },
  { image: countAlly1001to2500, label: 'Полк' },
  { image: countAlly2501to5500, label: 'Дивізія' },
  { image: countAlly5501to25000, label: 'Корпус' },
  { image: countAlly25001to50000, label: 'Польова армія' },
  { image: countAlly50001to300000, label: 'Група армій' },
  { image: countAlly300001, label: 'Театр' },
]

export const enemyImages = [
  { image: enemyAirDefence, label: 'Проти повітряна зброя' },
  { image: enemyAntiTank, label: 'Проти танкова зброя' },
  { image: enemyArtillery, label: 'Артилерія' },
  { image: enemyCombo, label: 'Змішані війська' },
  { image: enemyInfantry, label: 'Піхота' },
  { image: enemyMechInfantry, label: 'Механізована піхота' },
  { image: enemyReactiveFireSystem, label: 'Реактивна артилерія' },
  { image: enemyRotorcraft, label: 'Гвинтокрил' },
  { image: enemyTank, label: 'Танкові війська' },
]

export const countsEnemy = [
  { image: countEnemy2to4, label: 'Вогнева група' },
  { image: countEnemy5to14, label: 'Відділення' },
  { image: countEnemy15to79, label: 'Взвод' },
  { image: countEnemy80to299, label: 'Рота' },
  { image: countEnemy300to1000, label: 'Батальйон' },
  { image: countEnemy1001to2500, label: 'Полк' },
  { image: countEnemy2501to5500, label: 'Дивізія' },
  { image: countEnemy5501to25000, label: 'Корпус' },
  { image: countEnemy25001to50000, label: 'Польова армія' },
  { image: countEnemy50001to300000, label: 'Група армій' },
  { image: countEnemy300001, label: 'Театр' },
]

export const landmark = landmarkImg

import spinner from './spinner.svg'
export const spinnerGif = spinner
