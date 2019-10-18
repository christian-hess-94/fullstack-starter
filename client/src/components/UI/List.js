import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Text from './Text'
import { animated, useTransition, useChain } from 'react-spring'

const List = ({
    darkMode,
    titleVarName,
    descriptionVarName,
    canClick,
    click,
    array,
}) => {

    const transitionRef = useRef()
    const itemTransitions = useTransition(array, item => item.username, {
        ref: transitionRef,
        trail: 400 / array.length,
        from: { opacity: 0, transform: 'translate3d(0,30px,0) ', },
        enter: { opacity: 1, transform: 'translate3d(0,0,0) ' },
        leave: { opacity: 0, transform: 'translate3d(0,30px,0) ' },
        config: {
            mass: 3
        }
    })
    useChain([transitionRef])
    return itemTransitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
            <Card darkMode={darkMode} onClick={canClick ? () => click(item) : null}>
                <Text darkMode={darkMode} bold>{titleVarName && item[titleVarName]}</Text>
                <Text darkMode={darkMode}>{descriptionVarName && item[descriptionVarName]}</Text>
            </Card>
        </animated.div>
    ))
}

List.propTypes = {
    titleVarName: PropTypes.string,
    descriptionVarName: PropTypes.string,
    body: PropTypes.any,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default List
