import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

declare type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
interface IInputField {
    title: string;
    value: string;
    disabled?: boolean
    onChange?: ((event: React.ChangeEvent<FormControlElement>) => void);
    placeholder: string;
    classname?: string;
    type?: "number";
    maxLength?: number
}

const InputField = ({
    title,
    value,
    disabled,
    onChange,
    placeholder,
    type,
    maxLength,
    classname
}: IInputField) => (
        <InputGroup className={classname ? classname : "pt-2 pb-2"}>
            <InputGroup.Prepend>
                <InputGroup.Text>
                    {title}
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                disabled={disabled}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder} />
        </InputGroup>
    )

export default InputField;