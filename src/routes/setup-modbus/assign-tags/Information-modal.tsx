import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap'
import { FaTimesCircle } from 'react-icons/fa';
import Select, { ValueType } from 'react-select';
import { colors } from '../../../services';
import { IAssignTag, INotificationAction, SetupModbusActions } from '../../../types'
import { ITagOptions, tagCommChannelOptions, tagDataTypesOptions, tagOptions, triggerOptions } from './config-options';

interface IInformationModal {
    show: boolean;
    setShow: (flag: boolean) => any;
    onUpdate?: (args: IAssignTag) => void;
    data: IAssignTag;
}

const InformationModal = ({
    show,
    setShow,
    onUpdate,
    data
}: IInformationModal) => {
    const [selected, setSelected] = useState<ITagOptions | undefined>();
    const [name, setName] = useState<string>(data.name);
    const [tagName, setTagName] = useState<string>(data.tagName);
    const [address, setAddress] = useState<string>(data.address);
    const [dataType, setDataType] = useState<SetupModbusActions.assignTagDataType>(data.dataType);
    const [commChannel, setCommChannel] = useState<SetupModbusActions.assignTagCommChannel>(data.commChannel);
    const [notificationAction, setNotificationAction] = useState<INotificationAction[]>([...data.notificationAction]);

    const onModalStateChange = () => {
        setSelected(undefined);
        setName(data.name);
        setTagName(data.tagName);
        setAddress(data.address);
        setDataType(data.dataType);
        setCommChannel(data.commChannel);
        setNotificationAction([...data.notificationAction]);
    }

    const checkEmptyNotifications = () => {
        for (let i = 0; i < notificationAction.length; i++)
            if (!notificationAction[i].trigger || !notificationAction[i].value)
                return true;
        return false;
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
                {selected || data.tagName ?
                    <>
                        <Select
                            className="pt-2"
                            placeholder="Select data type"
                            options={tagDataTypesOptions}
                            value={(() => {
                                const foundEl = tagDataTypesOptions.find(option => option.value === dataType);
                                if (foundEl) return {
                                    label: foundEl.label,
                                    value: dataType
                                };
                            })()}
                            onChange={(e: any) => setDataType(e.value)} />
                        <Select
                            className="pt-2"
                            placeholder="Select communication channel"
                            options={tagCommChannelOptions}
                            value={(() => {
                                const foundEl = tagCommChannelOptions.find(option => option.value === commChannel);
                                if (foundEl) return {
                                    label: foundEl.label,
                                    value: commChannel
                                };
                            })()}
                            onChange={(e: any) => setCommChannel(e.value)} />
                        <h6 className="pt-4 font-italic text-secondary">
                            Notification triggers
                        </h6>
                        {notificationAction.map((_notificationAction, index) => (
                            <div className="row w-100 p-0 m-0 justify-content-between">
                                <div className="col-5 p-0 m-0">
                                    <Select
                                        value={(() => {
                                            const foundEl = triggerOptions.find(option => option.value === _notificationAction.trigger);
                                            if (foundEl) return {
                                                label: foundEl.label,
                                                value: _notificationAction.trigger
                                            };
                                        })()}
                                        className=" pt-2 pb-2"
                                        placeholder="Select trigger"
                                        onChange={(el: any) => {
                                            _notificationAction.trigger = el.value;
                                            setNotificationAction([...notificationAction]);
                                        }}
                                        options={triggerOptions} />
                                </div>
                                <div className="col-6 m-0">
                                    <InputField
                                        title="Value"
                                        value={_notificationAction.value ? String(_notificationAction.value) : ""}
                                        onChange={e => {
                                            _notificationAction.value = Number(e.target.value);
                                            setNotificationAction([...notificationAction]);
                                        }}
                                        placeholder="Trigger value" />
                                </div>
                                <div className="col-1 row p-0 m-0 justify-content-center align-self-center">
                                    <FaTimesCircle
                                        onClick={() => {
                                            notificationAction.splice(index, 1);
                                            setNotificationAction([...notificationAction]);
                                        }}
                                        color={colors.red} />
                                </div>
                            </div>
                        ))}
                        {notificationAction.length !== 3 ?
                            <div className="row p-0 justify-content-end p-3">
                                <Button
                                    onClick={() => {
                                        notificationAction.push({ trigger: "", value: undefined });
                                        setNotificationAction([...notificationAction]);
                                    }}
                                    variant="info"
                                    size="sm">
                                    Add notification trigger
                                </Button>
                            </div>
                            :
                            null}
                    </>
                    : null}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    size="sm"
                    variant="outline-success"
                    disabled={!name || !tagName || !address || !dataType || !commChannel! || checkEmptyNotifications()}>
                    {data.tagName ? "Update" : "Proceed"}
                </Button>
                <Button
                    size="sm"
                    onClick={() => setShow(false)}
                    variant="outline-danger">
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default InformationModal;

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