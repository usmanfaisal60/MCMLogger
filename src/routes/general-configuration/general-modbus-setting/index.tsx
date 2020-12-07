import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import { Button, Spinner } from 'react-bootstrap'
import { AiFillInteraction } from 'react-icons/ai'
import { connect } from 'react-redux'
import { BackHeaderWrapper, CenterContentWrapper, InputField } from '../../../components'
import { colors } from '../../../services'
import { setGeneralModbusParams } from '../../../stores/actions'
import { IGeneralMBSetting } from '../../../types'

const GeneralMBSetting = ({
    setGeneralModbusParams
}: IGeneralMBSetting) => {
    const [address, setAdrress] = useState<string>("");
    const [baud, setBaud] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const alert = useAlert();
    const _setGeneralModbusParams = () => {
        setLoading(true);
        setGeneralModbusParams({
            address,
            baud
        },
            () => {
                alert.show("Settings successfull");
                setLoading(false)
            },
            () => setLoading(false))
    }
    return (
        <BackHeaderWrapper>
            <CenterContentWrapper>
                <div className="col-md-5 p-4 bg-light rounded border shadow-lg m-2" >
                    <div className="w-100 text-center p-3">
                        <AiFillInteraction size={100} color={colors.grey} />
                    </div>
                    <div className="col-12 d-flex flex-column align-self-center p-4">
                        <div className="col-10 d-flex flex-column align-self-center">
                            <InputField
                                title="Slave ID"
                                type="number"
                                maxLength={3}
                                placeholder="Modbus slave address"
                                onChange={e => setAdrress(e.target.value)}
                                value={String(address)} />
                            <InputField
                                title="Baud rate"
                                type="number"
                                placeholder="Modbus device baud rate"
                                onChange={e => setBaud(e.target.value)}
                                value={String(baud)} />
                        </div>
                    </div>
                    <div className="w-100 text-right">
                        <Button onClick={_setGeneralModbusParams} variant="light" size="sm" className="border">
                            Save
                            {loading ?
                                <Spinner variant="secondary" animation="border" size="sm" className="ml-2" />
                                : null}
                        </Button>
                    </div>
                </div>
            </CenterContentWrapper>
        </BackHeaderWrapper>
    )
}

export default connect(null, { setGeneralModbusParams })(GeneralMBSetting)
