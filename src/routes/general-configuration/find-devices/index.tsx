import React, { useState } from 'react'
import { FaArrowCircleLeft, FaNetworkWired } from 'react-icons/fa';
import { BiScan } from 'react-icons/bi';
import { CenterContentWrapper } from '../../../components';
import { colors, generateRandomId } from '../../../services';
import { Alert, Button, FormControl, InputGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { IFindDevice, IFindDevicesStore } from '../../../types';
import DevicesModal from './DevicesModal';
import { MapStateToPropsType } from '../../../stores';
import { scanNetworks } from '../../../stores/actions';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

const FindDevices = ({
    scanNetworks,
    devices
}: IFindDevice) => {
    const history = useHistory();
    const alert = useAlert();
    // const [ip, setIp] = useState<string>("192.168.8.199");
    const [ip, setIp] = useState<string>("192.168.43.102");
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const _scanNetwork = () => {
        if (!ip) { alert.show("Please input an ip address"); return; }
        if (ip.split('.').length !== 4) { alert.show("Please input a valid ip address"); return; }
        setModal(true);
        setLoading(true);
        scanNetworks(
            ip,
            () => setLoading(false),
            () => setLoading(false)
        );
    }

    return (
        <CenterContentWrapper>
            <div className="col-md-6 bg-white border rounded p-4 text-center">
                <div className="w-100 text-left">
                    <FaArrowCircleLeft className="" onClick={() => history.goBack()} color={colors.grey} size={20} />
                </div>
                <div className="w-100 row p-0 m-0 justify-content-center align-items-center">
                    <FaNetworkWired color={colors.grey} size={100} className="pl-3 pr-3" />
                    <BiScan color={colors.grey} size={100} className="pl-3 pr-3" />
                </div>
                <Alert variant="info">
                    Before getting started, let's scan your network to see which devices are connected
                </Alert>
                <div className="w-100 p-0 m-0 text-left">
                    <p className="text-black-50 font-weight-light">
                        Please input your local <code>ip address</code>
                    </p>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Local ip address
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            className="small"
                            value={ip}
                            onChange={e => setIp(e.target.value)}
                            placeholder="192.168.xxx.xxx" />
                    </InputGroup>
                </div>
                <div className="w-100 p-0 m-0 text-right mt-2 mb-2">
                    <OverlayTrigger
                        overlay={
                            <Popover id={generateRandomId()}>
                                <Popover.Title>
                                    Finding your ip address
                                </Popover.Title>
                                <Popover.Content>
                                    <ul className="text-black-50 small">
                                        <li>
                                            Open your command prompt/terminal and type "ipconfig" and press enter/return
                                        </li>
                                        <br />
                                        <li>
                                            On windows 10, Click the Start icon and select Settings. Click the Network & Internet icon. Select your network and scroll down. You should see your ip address
                                        </li>
                                    </ul>
                                </Popover.Content>
                            </Popover>
                        }
                        trigger={["hover", "focus"]}>
                        <code className="small border-bottom">
                            How to find your ip address
                        </code>
                    </OverlayTrigger>
                </div>
                <Button onClick={_scanNetwork}>
                    Scan
                </Button>
            </div>
            <DevicesModal
                show={modal}
                setShow={setModal}
                loading={loading}
                devices={devices} />
        </CenterContentWrapper>
    )
}

const mapStateToProps: MapStateToPropsType<IFindDevicesStore> = state => state.findDevices;
export default connect(mapStateToProps, { scanNetworks })(FindDevices);
