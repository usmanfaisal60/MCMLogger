import React from 'react'
import { Link } from 'react-router-dom';
import { ISelectionCard } from '../../types';

const SelectionCard = ({ icon, title, path }: ISelectionCard) => {
    return (
        <Link to={path} style={{ minWidth: 200 }} className="shadow-lg-hover border bg-white rounded m-4 col-md-3 text-center">
            <div className="p-4">
                {icon}
            </div>
            <p className="text-black-50">
                {title}
            </p>
        </Link>
    )
}

export default SelectionCard;
