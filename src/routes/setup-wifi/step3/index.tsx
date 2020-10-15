import React, { useEffect, useState } from 'react'
import { CenterContentWrapper } from '../../../components';
import { FcWiFiLogo } from 'react-icons/fc';
import { MdCompareArrows } from 'react-icons/md';
import { GiCircuitry } from 'react-icons/gi';
import { FaUndo } from 'react-icons/fa';
import { colors, routeNames, strings } from '../../../services';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IStep3, IStep3Store } from '../../../types';
import { connect } from 'react-redux';
import { MapStateToPropsType } from '../../../stores';
import { getNetworksList, resetController } from '../../../stores/actions';
import ConnectionModal from './connection-modal';

const Step3 = ({
    networks,
    getNetworksList,
    resetController
}: IStep3) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [modal, setModal] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const _getNetworks = () => {
        setLoading(true);
        getNetworksList(
            () => setLoading(false),
            () => setLoading(false)
        );
    }
    useEffect(_getNetworks, [getNetworksList])
    const selectNetwork = (index: number): void => {
        setSelectedIndex(index);
        setModal(true);
    }

    return (
        <CenterContentWrapper>
            <div className="col-md-6 bg-white border rounded p-4 text-center m-2">
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <FcWiFiLogo color={colors.grey} size={150} className="pl-3 pr-3" />
                    <MdCompareArrows color={colors.grey} size={100} className="pl-3 pr-3" />
                    <GiCircuitry color={colors.grey} size={100} className="pl-3 pr-3" />
                </div>
                {!loading ?
                    <div className="row p-0 pb-4 m-0 justify-content-between align-items-center">
                        <p className="font-weight-light text-black-50 p-0 m-0">
                            Please select a network to connect to
                        </p>
                        <button className="bg-transparent p-0 m-0 border-0 p-0" onClick={_getNetworks}>
                            <FaUndo color={colors.grey} size={20} />
                        </button>
                    </div>
                    :
                    <p className="font-weight-light text-left text-black-50">
                        Please wait while {strings.controller} gets networks list to connect to
                    </p>
                }
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <div className="w-100 row p-0 m-0 justify-content-center align-items-center border rounded" style={{ maxHeight: 250 }}>
                        {loading ?
                            <Spinner className="m-5" animation="border" variant="info" />
                            :
                            networks ?
                                networks.length > 0 ?
                                    <div className="w-100">
                                        {networks.map((el, i) => (
                                            <button
                                                key={i}
                                                onClick={() => selectNetwork(i)}
                                                className="col-12 text-left border-0 bg-light p-2">
                                                {el.name}
                                            </button>
                                        ))}
                                    </div>
                                    :
                                    <Alert variant="danger" className="m-4">
                                        No networks found in the search.
                                    </Alert>
                                :
                                <Alert variant="danger" className="m-4">
                                    No networks found in the search.
                                </Alert>
                        }
                    </div>
                </div>
                <div className="w-100 row p-0 m-0 justify-content-between pt-4">
                    <Link to={routeNames.connection2}>
                        <Button variant="outline-info">
                            Back
                        </Button>
                    </Link>
                    {success ?
                        <Link to={routeNames.connection4.replace(":network", networks && selectedIndex !== -1 ? networks[selectedIndex].name : "")}>
                            <Button onClick={() => resetController()} variant="outline-info">
                                Next
                            </Button>
                        </Link>
                        : null}
                </div>
                <ConnectionModal
                    show={modal}
                    setFlag={setSuccess}
                    setShow={setModal}
                    networkName={networks && selectedIndex !== -1 ? networks[selectedIndex].name : undefined} />
            </div>
        </CenterContentWrapper>
    )
}

const mapStateToProps: MapStateToPropsType<IStep3Store> = state => state.step3;
export default connect(mapStateToProps, { getNetworksList, resetController })(Step3);
