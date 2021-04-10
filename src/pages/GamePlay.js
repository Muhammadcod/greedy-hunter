import React from 'react'
import PropTypes from 'prop-types'
import User from '../assets/head.svg'
import Food from '../assets/food.svg'
import getRandomLocation from '../helper/utils'
import Rows from '../components/Rows'
// import Rows from '../components/Rows'

const GamePlay = (props) => {
  const [board, setBoard] = React.useState([])
  const [step, setStep] = React.useState(0)
  const { grid } = props
  const gameGrid = parseInt(grid, 10)

  const maximumMoves = (gameGrid * gameGrid) / 2
  const boardRow = Array.from(Array(gameGrid).keys())
  // eslint-disable-next-line
  const userRepresentation = <img src={User} alt="user" />
  const foodRepresentation = <img src={Food} alt="user" />
  const boad = Array.from(Array(gameGrid)).map(() => [...boardRow])
  const userLocation = React.useRef(getRandomLocation(gameGrid))
  const foodLocations = React.useRef(
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

  React.useEffect(() => {
    // add user to scene
    const lb = boad

    lb[userLocation.current.h][userLocation.current.v] = 'U'
    console.log('user', lb, userLocation.current.h)

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

  React.useEffect(() => {}, [])

  const move = (row, col) => {
    // eslint-disable-next-line

    const bb = board
    const index = bb[userLocation.current.h].indexOf('U')
    bb[userLocation.current.h].splice(userLocation.current.v, 1, index)
    console.log('move', bb, userLocation.current)
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
          <div className="container board-wrapper">
            {board.map((row, ri) => (
              <Rows
                row={row}
                key={row[ri]}
                move={move}
                ri={ri}
                userRepresentation={userRepresentation}
                foodRepresentation={foodRepresentation}
              />
            ))}
          </div>
          <div className="d-flex">
            <span>maximum moves: {Math.round(maximumMoves) - step}</span>
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
