import React, { useState } from 'react';
import { Alert, Button, FormControl, InputGroup, Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { strings } from '../../../services';
import { connectToNetwork } from '../../../stores/actions';
import { callback, IConnectionArgs } from '../../../types';

interface IConnectionModal {
    show: boolean;
    setShow: (show: boolean) => any;
    networkName?: string;
    connectToNetwork: (args: IConnectionArgs, cbSuccess: callback, cbFailure: callback) => any,
    setFlag: (flag: boolean) => any
}

const ConnectionModal = ({
    show,
    setShow,
    networkName,
    connectToNetwork,
    setFlag
}: IConnectionModal) => {
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [failure, setFailure] = useState<boolean>(false);

    const onHide = () => {
        setShow(false);
        setPassword("");
    };

    const _connect = () => {
        setLoading(true);
        setSuccess(false);
        setFailure(false);
        connectToNetwork(
            { ssid: networkName, password },
            () => { setLoading(false); setSuccess(true); setFlag(true) },
            () => { setLoading(false); setFailure(true); }
        );
    }
    return (
        <Modal
            show={show}
            onHide={!loading ? onHide : undefined}
            backdropClassName="bg-light">
            <Modal.Header className="bg-dark text-white text-left p-3">
                <p className="p-0 m-0">
                    Connect to the network <strong>{networkName}</strong>
                </p>
            </Modal.Header>
            <Modal.Body>
                <p className="text-secondary">
                    Please enter the password for <strong>{networkName}</strong>
                </p>
                {!success || loading ?
                    <Alert variant="primary" className="small">
                        If <strong>{networkName}</strong> does not have a password, you can leave the field empty
                    </Alert>
                    : null}
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            Password
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        className="small"
                        placeholder="Leave empty for open network"
                        onChange={e => setPassword(e.target.value)} />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <div className="row w-100 p-0 m-0 justify-content-end align-items-center">
                    <Button
                        disabled={loading}
                        onClick={onHide} size="sm" variant="outline-danger" className="ml-3">
                        Close
                    </Button>
                    {success ?
                        null
                        : <Button
                            disabled={loading}
                            onClick={_connect} size="sm" variant="outline-info" className="ml-3">
                            Connect
                        {loading ?
                                <Spinner animation="border" size="sm" className="ml-3" />
                                : null}
                        </Button>
                    }
                    <div className="row w-100 m-0 p-0 justify-content-center align-items-center">
                        <div className="pt-3">
                            {loading ?
                                <Alert variant="secondary" className="small">
                                    Please wait while <strong>{strings.controller}</strong> attempts to connect to <strong>{networkName}</strong>
                                </Alert>
                                : null}
                            {failure ?
                                <Alert variant="danger" className="small">
                                    Sorry, <strong>{strings.controller}</strong> was unable to connect to <strong>{networkName}</strong>
                                </Alert>
                                : null}
                            {success ?
                                <Alert variant="success" className="small">
                                    Success! <strong>{strings.controller}</strong> has successfully connected to <strong>{networkName}</strong>
                                </Alert>
                                : null}
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default connect(null, { connectToNetwork })(ConnectionModal);
