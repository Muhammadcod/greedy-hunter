import React from 'react'
import PropTypes from 'prop-types'

const Square = ({ column, rows, index, userLocation, board, move }) => {
  // const [] = React.useState()
  // eslint-disable-next-line

  const newPosition = { h: index, v: column }

  // const [newLocation, setNewLocation] = React.useState(userLocation)
  const handleClick = () => {
    // eslint-disable-next-line
    // console.log(
    //   '===',
    //   newPosition,
    //   userLocation,
    //   rows,
    //   move, // eslint-disable-next-line
    //   board[1].splice(1, 1),
    //   board[1],
    // )
  }

  // eslint-disable-next-line
  const source = column._source
  // console.log('ss', rows)
  // const user = column
  // console.log('User', column..)
  //
  // console.log(column)
  // board[newLocation.h][newLocation.v] = move

  return (
    <>
      <div
        className="col square--column"
        aria-hidden="true"
        onClick={handleClick}
      >
        {source ? column : null}
      </div>
    </>
  )
}
Square.propTypes = {
  column: PropTypes.number,
  rows: PropTypes.array,
  index: PropTypes.number,
  userLocation: PropTypes.object,
  board: PropTypes.array,
  move: PropTypes.element,
}

export default Square
