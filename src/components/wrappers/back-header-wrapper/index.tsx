import { ArrowLeft } from '@material-ui/icons'
import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { colors } from '../../../services'

interface IBackHeaderWrapper {
    children?: JSX.Element | JSX.Element[]
}

const BackHeaderWrapper = ({ children }: IBackHeaderWrapper) => {
    const history = useHistory();

    return (
        <div className="w-100 h-100 d-flex p-0 m-0 flex-column position-relative">
            <div className="w-100 p-4 position-absolute top-0 left-0">
                <FaArrowCircleLeft onClick={() => history.goBack()} size={30} color={colors.white} />
            </div>
            <div className="flex-fill">
                {children}
            </div>
        </div>
    )
}

export default BackHeaderWrapper
