import React, { useEffect, useState } from 'react'
import { CenterContentWrapper } from '../../../components';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { GiCircuitry } from 'react-icons/gi';
import { colors, routeNames, strings } from '../../../services';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MapStateToPropsType } from '../../../stores';
import { IStep2, IStep2Store } from '../../../types';
import { getDeviceInformation, clearStep2Reducers } from '../../../stores/actions';

const Step2 = ({
    tested,
    device,
    getDeviceInformation,
    clearStep2Reducers
}: IStep2) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const pingRequest = () => {
        setError(false);
        setLoading(true);
        getDeviceInformation(
            () => setLoading(false),
            () => { setLoading(false); setError(true) }
        );
    }
    useEffect(() => clearStep2Reducers, [clearStep2Reducers]);

    return (
        <CenterContentWrapper>
            <div className="col-md-6 bg-white border rounded p-4 text-center m-2">
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <GiCircuitry color={colors.grey} size={100} className="pl-3 pr-3" />
                    <VscDebugDisconnect color={colors.grey} size={100} className="pl-3 pr-3" />
                </div>
                <p className="font-weight-light text-black-50">
                    Great! Now that the {strings.controller} is online, Let's connect to the controller and run a small ping test
                </p>
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <Alert variant="info">
                        <span className="small">
                            <strong>Connect your computer to {strings.controller}</strong> using the password <strong>{strings.password} and click the button below</strong>
                        </span>
                        <div className="p-2">
                            {error ?
                                <Alert className="small" variant="danger">
                                    Failed to connect find the {strings.controller}. Please check your connection and try again
                                </Alert>
                                :
                                null}
                            {tested ?
                                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                                    <Alert className="small" variant="warning m-0">
                                        Connected successfully to <strong>{device?.name}</strong>
                                    </Alert>
                                </div>
                                :
                                <Button variant="info" size="sm" onClick={pingRequest}>
                                    Test connection
                                {loading ?
                                        <Spinner variant="light" animation="border" size="sm" className="ml-3" />
                                        : null}
                                </Button>
                            }
                        </div>
                    </Alert>
                </div>
                <div className="w-100 row p-0 m-0 justify-content-between pt-4">
                    <Link to={routeNames.connection}>
                        <Button variant="outline-info">
                            Back
                        </Button>
                    </Link>
                    {tested ?
                        <Link to={routeNames.connection3}>
                            <Button variant="outline-info">
                                Next
                            </Button>
                        </Link>
                        : null}
                </div>
            </div>
        </CenterContentWrapper>
    )
}

const mapStateToProps: MapStateToPropsType<IStep2Store> = (state) => state.step2;
export default connect(mapStateToProps, { getDeviceInformation, clearStep2Reducers })(Step2);
