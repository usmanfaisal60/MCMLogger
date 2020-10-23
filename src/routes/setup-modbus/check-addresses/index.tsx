import React, { useEffect, useRef, useState } from 'react'
import { useAlert } from 'react-alert';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CenterContentWrapper } from '../../../components';
import { pingModbus } from '../../../stores/actions';
import { ICheckAdresses } from '../../../types';
import LED from 'react-bulb';
import { baudRateOptions, dataFormatOptions, DataFormatOptions } from './configOptions';
import Select from 'react-select';


const CheckAdresses = ({
    pingModbus
}: ICheckAdresses) => {
    const alert = useAlert();
    const [start, setStart] = useState<string>("");
    const [length, setLength] = useState<string>("");
    const [slaveId, setSlaveId] = useState<string>("");
    const [baudRate, setBaudRate] = useState<number>();
    const [resType, setResType] = useState<number>(DataFormatOptions.DOUBLE_WORD);
    const [response, setResponse] = useState<string>("");
    const [monitoring, setMonitoring] = useState<boolean>(false);
    const interval = useRef<any>();

    const sendPingModbusRequest = () => {
        pingModbus(
            {
                startAddress: start.substr(1, start.length),
                length,
                slaveId,
                resType,
                baudRate
            },
            (res: string) => {
                setResponse(res);
            },
            () => { });
    }

    const startMonitoring = () => {
        if (!start || !length) {
            alert.show("Please enter a starting address and length to be read");
            return;
        }
        if (Number(length) > 70) {
            alert.show("Please enter a length below 70.");
            return;
        }
        setMonitoring(true);
        sendPingModbusRequest();
        interval.current = setInterval(sendPingModbusRequest, 2000);
    };

    const stopMonitoring = () => {
        setMonitoring(false);
        clearInterval(interval.current);
    }
    useEffect(() => () => clearInterval(interval.current), []);

    return (
        <CenterContentWrapper>
            <div className="col-md-8 bg-white m-2 rounded border p-0 overflow-hidden shadow">
                <div className="bg-secondary text-white w-100 p-2">
                    Test modbus connection
                </div>
                <div className="w-100 row p-2 m-0">
                    <InputGroup className="col-sm-6 pt-2 pb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Starting address
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            disabled={monitoring}
                            value={start}
                            maxLength={5}
                            placeholder="40xxx"
                            onChange={e => { if (e.target.value.charAt(0) === "4") setStart(e.target.value) }}>
                        </FormControl>
                    </InputGroup>
                    <InputGroup className="col-sm-6 pt-2 pb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Read length
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            disabled={monitoring}
                            value={length}
                            onChange={e => setLength(e.target.value)}
                            placeholder="10-70" />
                    </InputGroup>
                    <InputGroup className="col-sm-6 pt-2 pb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Slave address
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            disabled={monitoring}
                            value={slaveId}
                            onChange={e => setSlaveId(e.target.value)}
                            placeholder="Optional, Defaults to 0" />
                    </InputGroup>
                </div>
                <div className="w-100 row p-2 m-0">
                    <div className="col-sm-6 pt-2 pb-2">
                        <Select
                            isDisabled={monitoring}
                            onChange={(e: any) => setBaudRate(e.value)}
                            placeholder="Select Baud rate, default 9600"
                            options={baudRateOptions} />
                    </div>
                    <div className="col-sm-6 pt-2 pb-2">
                        <Select
                            isDisabled={monitoring}
                            onChange={(e: any) => setResType(e.value)}
                            placeholder="Select response type, default 32 bit float"
                            options={dataFormatOptions} />
                    </div>
                </div>
                <div className="w-100 pl-4 pr-4 pt-2 pb-4 m-0">
                    <div className="w-100 row m-0 justify-content-between pb-2">
                        <p className="text-secondary mb-3">
                            Response
                        </p>
                        {monitoring ?
                            <Button onClick={stopMonitoring} size="sm" variant="outline-dark">
                                Stop monitoring
                                <Blinker color="green" secondColor="greenyellow" size={5} blink />
                            </Button>
                            :
                            <Button onClick={startMonitoring} size="sm" variant="outline-success">
                                Start monitoring
                            </Button>
                        }
                    </div>
                    <div className="rounded border p-2">
                        <textarea
                            style={{ height: 400 }}
                            disabled
                            onChange={() => { }}
                            value={response ? response : "Modbus reponse"}
                            className="border-0 w-100 text-danger" />
                    </div>
                </div>
            </div>
        </CenterContentWrapper>
    )
}

export default connect(null, { pingModbus })(CheckAdresses);

const Blinker = ({
    color,
    size,
    secondColor,
    blink = false
}: {
    color: string;
    secondColor: string;
    blink?: boolean
    size: number
}) => {
    const [blinker, setBlinker] = useState<boolean>(blink);
    useEffect(() => {
        if (blink) setTimeout(() => setBlinker(!blinker), 500);
    }, [blink, blinker]);

    return (
        <span className="pl-2">
            <LED size={size} color={blinker ? color : secondColor} />
        </span>);
}