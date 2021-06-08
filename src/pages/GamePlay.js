import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import User from '../assets/head.svg'
import Food from '../assets/food.svg'
import getRandomLocation from '../helper/utils'
import Rows from '../components/Rows'

/*  const time = {
  initialMinutes: 0,
  initialSeconds: 0,
} */

const GamePlay = (props) => {
  // const { initialMinutes, initialSeconds } = time
  const [board, setBoard] = useState([])
  const [step, setStep] = useState(0)
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')
  // eslint-disable-next-line
  const [isActive, setIsActive] = useState(false)
  const [counter, setCounter] = useState(0)

  // const [elapsedTime, setElapsedTime] = React.useState(null)
  const { grid } = props
  const gameGrid = parseInt(grid, 10)

  const maximumMoves = (gameGrid * gameGrid) / 2
  const boardRow = Array.from(Array(gameGrid).keys())
  // eslint-disable-next-line
  const userRepresentation = (
    <img
      src={User}
      alt="user"
      style={gameGrid > 9 ? { width: `13px` } : { width: `initial` }}
    />
  )
  const foodRepresentation = (
    <img
      src={Food}
      alt="user"
      style={gameGrid > 9 ? { width: `13px` } : { width: `initial` }}
    />
  )
  const boad = Array.from(Array(gameGrid)).map(() => [...boardRow])

  const userLocation = useRef(getRandomLocation(gameGrid))
  const foodLocations = useRef(
    Array.from(Array(gameGrid).keys()).reduce((generatedLocations) => {
      let fl = getRandomLocation(gameGrid)
      // eslint-disable-next-line
      let locationIndex = '_' + fl.h.toString() + fl.v.toString()
      // make sure food is not dropped on user and existing food
      while (
        !(fl.h !== userLocation.h || fl.v !== userLocation.v) ||
        generatedLocations[locationIndex]
      ) {
        fl = getRandomLocation(gameGrid)
        // eslint-disable-next-line
        locationIndex = '_' + fl.h.toString() + fl.v.toString()
      }
      // add food location to the dictionary
      //   return {...generatedLocations, [locationIndex]: fl}; //ES6 dynamic property or use syntactic sugar approach below
      // eslint-disable-next-line
      generatedLocations[locationIndex] = fl
      return generatedLocations
    }, {}),
  )

  useEffect(() => {
    // add user to scene
    const lb = boad

    lb[userLocation.current.h][userLocation.current.v] = 'U'

    // add food to scene
    const fooKeys = Object.keys(foodLocations.current)
    for (let i = 0; i < fooKeys.length; ) {
      const foodLocation = foodLocations.current[fooKeys[i]]

      lb[foodLocation.h][foodLocation.v] = 'F'
      i += 1
    }

    setBoard(lb)

    return () => {}
  }, [grid])

  useEffect(() => {
    let intervalId
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60
        const minuteCounter = Math.floor(counter / 60)

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter

        setSecond(computedSecond)
        setMinute(computedMinute)

        setCounter((currentCounter) => currentCounter + 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isActive, counter])

  const startTime = () => {
    if (isActive === false) {
      setIsActive(true)
    }
  }

  const stopTime = () => {
    if (Math.round(maximumMoves) === step + 1) {
      setIsActive(false)
    }
  }

  const move = (row, col) => {
    // eslint-disable-next-line
    const bb = board
    const index = bb[userLocation.current.h].indexOf('U')
    bb[userLocation.current.h].splice(userLocation.current.v, 1, index)
    userLocation.current.h = row
    userLocation.current.v = col
    bb[userLocation.current.h][userLocation.current.v] = 'U'
    setStep((currentStep) => currentStep + 1)

    return () => {}
  }
  return (
    <>
      <div className="game-play">
        <div className="game--wrapper">
          <div
            className="d-flex justify-content-between "
            style={{ width: `100%`, paddingBottom: `10px`, fontSize: `14px` }}
          >
            <span className="">Grid: {`${gameGrid} x ${gameGrid}`}</span>
            <span>progress</span>
            <span>Time spent: {`${minute}:${second} secs`}</span>
          </div>
          <div className="container board-wrapper">
            {board.map((row, ri) => (
              <Rows
                row={row}
                key={row[ri]}
                move={move}
                ri={ri}
                time={startTime}
                stop={stopTime}
                userLocation={userLocation}
                userRepresentation={userRepresentation}
                foodRepresentation={foodRepresentation}
              />
            ))}
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ width: `100%`, paddingTop: `10px`, fontSize: `14px` }}
          >
            <span>Maximum moves: {Math.round(maximumMoves)}</span>
            <span>Total moves: {step}</span>
          </div>
        </div>
      </div>
    </>
  )
}

GamePlay.propTypes = {
  grid: PropTypes.string,
}

export default GamePlay
