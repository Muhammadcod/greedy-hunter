import React from 'react'
import PropTypes from 'prop-types'

const Square = ({
  column,
  foodRepresentation,
  userRepresentation,
  move,
  ci,
  time,
  stop,
  ri,
}) => {
  // eslint-disable-next-line

  /* eslint-disable  no-nested-ternary */
  const logic =
    column === 'U'
      ? userRepresentation
      : column === 'F'
      ? foodRepresentation
      : null
  /* eslint-disable  no-nested-ternary */
  const handleClick = () => {
    move(ri, ci)
    time()
    stop()
  }
  console.log(ci, column)
  return (
    <>
      <div
        className="col square--column"
        aria-hidden="true"
        onClick={handleClick}
      >
        {logic}
      </div>
    </>
  )
}
Square.propTypes = {
  column: PropTypes.number,
  userRepresentation: PropTypes.element,
  foodRepresentation: PropTypes.element,
  move: PropTypes.func,
  time: PropTypes.func,
  stop: PropTypes.func,
  ci: PropTypes.number,
  ri: PropTypes.number,
}

export default Square
