import React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'

const Rows = ({ rows, index, userLocation, board, move }) => (
  <>
    <div className="row board-row" style={{ height: `${500 / rows.length}px` }}>
      {rows.map((column) => (
        <Square
          key={column}
          column={column}
          rows={rows}
          index={index}
          userLocation={userLocation}
          board={board}
          move={move}
        />
      ))}
    </div>
  </>
)

Rows.propTypes = {
  rows: PropTypes.array,
  move: PropTypes.func,
  board: PropTypes.array,

  // number: PropTypes.number,
  index: PropTypes.number,
  userLocation: PropTypes.array,
}

export default Rows
