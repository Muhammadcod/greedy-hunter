import React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'

const Rows = ({ row, userRepresentation, foodRepresentation, move, ri }) => (
  <>
    <div className="row board-row" style={{ height: `${500 / row.length}px` }}>
      {row.map((column, ci) => (
        <Square
          key={column[ci]}
          column={column}
          ci={ci}
          ri={ri}
          row={row}
          foodRepresentation={foodRepresentation}
          userRepresentation={userRepresentation}
          move={move}
        />
      ))}
    </div>
  </>
)

Rows.propTypes = {
  row: PropTypes.array,
  move: PropTypes.func,
  ri: PropTypes.array,
  userRepresentation: PropTypes.element,
  foodRepresentation: PropTypes.element,
}

export default Rows
