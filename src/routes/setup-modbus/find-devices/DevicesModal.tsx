import React, { useRef } from 'react'
import { Alert, Button, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { address, routeNames } from '../../../services';
import { IDevicesModal } from '../../../types';

const DevicesModal = ({
    loading,
    devices,
    show,
    setShow,
    history
}: IDevicesModal) => {
    const onHide = useRef<() => void>(() => { setShow(false); })
    const onExited = useRef<() => void>(() => { setShow(false); })

    const handleSelect = (ip: string | undefined) => {
        address.currentUrl = "http://" + ip;
        onExited.current = () => history.push(routeNames.checkMbAddresses);
        setShow(false);
    }

    return (
        <Modal
            backdropClassName="bg-light"
            onHide={loading ? undefined : onHide.current}
            onExited={onExited.current}
            show={show}>
            <Modal.Header className="bg-secondary text-white p-3">
                {loading ?
                    <p className="p-0 m-0">
                        Please wait...
                    </p>
                    :
                    <p className="p-0 m-0">
                        Please select a device
                    </p>
                }
            </Modal.Header>
            <Modal.Body>
                {loading ?
                    <div className="w-100 text-center p-5">
                        <Spinner variant="dark" animation="grow" />
                    </div>
                    :
                    devices.length !== 0 ?
                        <>
                            <h6 className="text-secondary">
                                Found devices
                            </h6>
                            <ul>
                                {devices.map(el => (
                                    <li key={el.ip} className="small">
                                        <strong>
                                            {el.name}
                                        </strong> at
                                        <button onClick={() => handleSelect(el.ip)} className="border-0 bg-transparent pl-2">
                                            <code>{el.ip}</code>
                                        </button>
                                    </li>))}
                            </ul>
                        </>
                        :
                        <Alert variant="danger" className="small">
                            No devices found! Kindly check your ip address and make sure your device is connected to the same network
                        </Alert>
                }
            </Modal.Body>
            {loading ? null :
                <Modal.Footer>
                    <div className="row w-100 m-0 p-0 justify-content-end align-self-center">
                        <Button onClick={onHide.current} size="sm" variant="outline-dark">
                            Close
                        </Button>
                    </div>
                </Modal.Footer>
            }
        </Modal>
    )
}

export default withRouter(DevicesModal);
