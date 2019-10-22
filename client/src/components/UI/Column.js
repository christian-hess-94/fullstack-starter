import React from 'react'
import PropTypes from 'prop-types'

const Row = props => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {props.children}
        </div>
    )
}

Row.propTypes = {

}

export default Row
