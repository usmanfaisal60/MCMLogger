import React from 'react'
import { CenterContentWrapper } from '../../../components';
import { FcWiFiLogo } from 'react-icons/fc';
import { BsPlus } from 'react-icons/bs';
import { GiCircuitry } from 'react-icons/gi';
import { colors, routeNames, strings } from '../../../services';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Step1 = () => {
    return (
        <CenterContentWrapper>
            <div className="col-md-6 bg-white border rounded p-4 text-center m-2">
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <FcWiFiLogo color={colors.grey} size={150} className="pl-3 pr-3" />
                    <BsPlus color={colors.grey} size={50} className="pl-3 pr-3" />
                    <GiCircuitry color={colors.grey} size={100} className="pl-3 pr-3" />
                </div>
                <p className="font-weight-light text-black-50">
                    This setup is going to guide you to connect your controller to your wifi network
                </p>
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <Alert variant="info">
                        <span className="small">
                            To get started, <strong>Please turn on your {strings.controller}</strong> and you will see a network with the name <strong>{strings.name}</strong>
                        </span>
                    </Alert>
                </div>
                <div className="w-100 row p-0 m-0 justify-content-end pt-4">
                    <Link to={routeNames.home} className="mr-3">
                        <Button variant="outline-danger">
                            Go back
                        </Button>
                    </Link>
                    <Link to={routeNames.connection2}>
                        <Button variant="outline-info">
                            Get started
                        </Button>
                    </Link>
                </div>
            </div>
        </CenterContentWrapper>
    )
}

export default Step1;
