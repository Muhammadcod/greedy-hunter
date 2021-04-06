import React from 'react'
import PropTypes from 'prop-types'
import User from '../assets/head.svg'
import Food from '../assets/food.svg'
import getRandomLocation from '../helper/utils'
// import Rows from '../components/Rows'

const GamePlay = (props) => {
  const { grid } = props
  const gameGrid = parseInt(grid, 10)

  const maximumMoves = (gameGrid * gameGrid) / 2
  const boardRow = Array.from(Array(gameGrid).keys())
  // eslint-disable-next-line
  const [board, setBoard] = React.useState(
    Array.from(Array(gameGrid)).map(() => [...boardRow]),
  )
  const userRepresentation = <img src={User} alt="user" />
  const foodRepresentation = <img src={Food} alt="user" />
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
  console.log('=', foodLocations)

  React.useEffect(() => {
    // add user to scene
    const lb = board

    lb[userLocation.current.h][userLocation.current.v] = 'U'
    // add food to scene
    const fooKeys = Object.keys(foodLocations.current)
    for (let i = 0; i < fooKeys.length; ) {
      const foodLocation = foodLocations.current[fooKeys[i]]
      console.log('===', foodLocation)

      lb[foodLocation.h][foodLocation.v] = 'F'
      i += 1
    }
    setBoard(lb)

    return () => {}
  }, [])

  return (
    <>
      <div className="game-play">
        <div className="game--wrapper">
          <div className="container board-wrapper">
            {board.map((row) => (
              <div className="d-flex justify-content-center align-items-center w-100">
                {row.map((column) => (
                  <span
                    className="d-inline-flex border justify-content-center align-items-center"
                    style={{ height: '65px', width: '65px' }}
                  >
                    {
                      // eslint-disable-next-line
                      column === 'U'
                        ? userRepresentation
                        : column === 'F'
                        ? foodRepresentation
                        : column
                    }
                    {console.log(column, 'sdf')}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="d-flex">
            <span>maximum moves: {maximumMoves}</span>
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
