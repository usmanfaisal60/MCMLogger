import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap'
import Select, { ValueType } from 'react-select';
import { IAssignTag, SetupModbusActions } from '../../../types'
import { ITagOptions, tagCommChannelOptions, tagDataTypesOptions, tagOptions } from './config-options';

interface IInformationModal {
    show: boolean;
    setShow: (flag: boolean) => any;
    onAddClick?: (args: IAssignTag) => void;
    data: IAssignTag;
}

const InformationModal = ({
    show,
    setShow,
    onAddClick,
    data
}: IInformationModal) => {
    const [selected, setSelected] = useState<ITagOptions>();
    const [name, setName] = useState<string>(data.name);
    const [tagName, setTagName] = useState<string>(data.tagName);
    const [address, setAddress] = useState<string>(data.address);
    const [dataType, setDataType] = useState<SetupModbusActions.assignTagDataType>(data.dataType);
    const [commChannel, setCommChannel] = useState<SetupModbusActions.assignTagCommChannel>(data.commChannel);
    console.log('[SELECTED VALUE]', selected);

    const onModalStateChange = () => {
        setName(data.name);
        setTagName(data.tagName);
        setAddress(data.address);
        setDataType(data.dataType);
        setCommChannel(data.commChannel);
    }
    useEffect(onModalStateChange, [show]);
    return (
        <Modal show={show} backdropClassName="bg-light">
            <Modal.Header className="bg-secondary text-white">
                Tag Details
            </Modal.Header>
            <Modal.Body>
                {!data.name ?
                    <Select
                        options={tagOptions}
                        placeholder="Select a value to be logged"
                        onChange={(e: any) => {
                            setName(e.label);
                            setTagName(e.value);
                            setSelected(e);
                        }} />
                    : null}
                <InputField
                    title="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name or short description" />
                <InputField
                    title="Tag Name"
                    value={tagName}
                    disabled
                    onChange={e => setTagName(e.target.value)}
                    placeholder="Tag key name for server" />
                <InputField
                    title="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Holding Register address" />
                {selected || data.name ?
                    <>
                        <Select
                            className="pt-2"
                            placeholder="Select data type"
                            options={tagDataTypesOptions}
                            onChange={(e: any) => setDataType(e)} />
                        <Select
                            className="pt-2"
                            placeholder="Select communication channel"
                            options={tagCommChannelOptions}
                            onChange={(e: any) => setCommChannel(e)} />
                    </>
                    : null}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    size="sm"
                    variant="outline-success"
                    disabled={!name || !tagName || !address || !dataType || !commChannel}>
                    {data.tagName ? "Update" : "Proceed"}
                </Button>
                <Button
                    size="sm"
                    onClick={() => setShow(false)}
                    variant="outline-danger">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InformationModal

declare type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
interface IInputField {
    title: string;
    value: string;
    disabled?: boolean
    onChange?: ((event: React.ChangeEvent<FormControlElement>) => void);
    placeholder: string;
}

const InputField = ({
    title,
    value,
    disabled,
    onChange,
    placeholder,
}: IInputField) => (
        <InputGroup className="pt-2 pb-2">
            <InputGroup.Prepend>
                <InputGroup.Text>
                    {title}
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                disabled={disabled}
                value={value}
                onChange={onChange}
                placeholder={placeholder} />
        </InputGroup>
    )