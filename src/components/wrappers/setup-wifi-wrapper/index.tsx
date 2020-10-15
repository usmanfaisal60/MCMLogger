import React from 'react'
import { ICenterContentWrapper } from '../../../types';


const CenterContentWrapper = ({
    children
}: ICenterContentWrapper) => {
    return (
        <div className="w-100 h-100 row p-0 m-0 bg-light justify-content-center align-items-center">
            {children}
        </div>
    )
}

export default CenterContentWrapper;
