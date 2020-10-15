import React from 'react'
import { CenterContentWrapper } from '../../../components';
import { FcWiFiLogo } from 'react-icons/fc';
import { GiCircuitry } from 'react-icons/gi';
import { colors, routeNames, strings } from '../../../services';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IStep4 } from '../../../types';

const Step4 = ({
    match
}: IStep4) => {
    return (
        <CenterContentWrapper>
            <div className="col-md-6 bg-white border rounded p-4 text-center m-2">
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <FcWiFiLogo color={colors.grey} size={150} className="pl-3 pr-3" />
                    <GiCircuitry color={colors.grey} size={100} className="pl-3 pr-3" />
                </div>
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <Alert variant="info">
                        <span className="small">
                            Great, You have successfully connected <strong>{strings.controller}</strong> to your wifi network <strong>{match?.params?.network}</strong>
                        </span>
                    </Alert>
                </div>
                <div className="w-100 row p-0 m-0 justify-content-end pt-4">
                    <Link to={routeNames.home}>
                        <Button variant="outline-info">
                            Finish
                        </Button>
                    </Link>
                </div>
            </div>
        </CenterContentWrapper>
    )
}

export default Step4;
