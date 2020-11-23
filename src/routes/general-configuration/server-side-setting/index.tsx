import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { BackHeaderWrapper, CenterContentWrapper, InputField } from '../../../components';
import { MapStateToPropsType } from '../../../stores';
import { registerDeviceToUser } from '../../../stores/actions';
import { IServerSideSettingStore, IServerSideSetup } from '../../../types';

const ServerSideSettings = ({
    registerDeviceToUser
}: IServerSideSetup) => {
    const [name, setName] = useState<string>("");
    const [picture, setPicture] = useState<File | undefined>(undefined);
    const [token, setToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (picture) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("device-image")?.setAttribute('src', String(e.target?.result))
            };
            reader.readAsDataURL(picture);
        }
    }, [picture]);

    const _registerDevice = () => {
        registerDeviceToUser({
            name,
            picture,
            token
        },
            () => setLoading(false),
            () => setLoading(false));
    }
    return (
        <BackHeaderWrapper>
            <CenterContentWrapper>
                <div className="col-md-8 h-75 rounded shadow-lg bg-light p-0 m-2 overflow-hidden d-flex flex-column">
                    <div className="bg-secondary p-3 text-white">
                        Server side configuration
                    </div>
                    <div className="flex-fill p-4">
                        <div className="row p-0 pt-4 m-0 justify-content-between">
                            <div className="col-7">
                                <InputField
                                    title="Name"
                                    placeholder="Device name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                                <textarea
                                    value={token}
                                    onChange={e => setToken(e.target.value)}
                                    className="w-100 border p-2 mt-4 rounded"
                                    placeholder="Paste your device request token here"
                                    style={{
                                        height: 200,
                                        maxHeight: 200,
                                        minHeight: 200
                                    }}
                                />
                            </div>
                            <Dropzone onDrop={files => setPicture(files[0])} multiple={false}>
                                {({ getRootProps, getInputProps }) => (
                                    <section className="bg-white border rounded" style={imageUploadStyle}>
                                        {!picture ?
                                            <div className="w-100 h-100 text-black-50 p-3" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>
                                                    Drag and drop a picture or click to upload a picture of your device
                                                </p>
                                            </div>
                                            :
                                            <img id="device-image" className="w-100 h-100" style={{ objectFit: "cover" }} />}
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                    <div className="text-right w-100 p-4">
                        <Button
                            onClick={_registerDevice}
                            size="sm"
                            disabled={!name || !token}
                            variant="info">
                            Configure device
                        </Button>
                    </div>
                </div>
            </CenterContentWrapper>
        </BackHeaderWrapper>
    )
}

const mapStateToProps: MapStateToPropsType<IServerSideSettingStore> = state => state.serverSideSetting;

export default connect(mapStateToProps, { registerDeviceToUser })(ServerSideSettings);

const fileInputSize = 250;
const imageUploadStyle = {
    width: fileInputSize,
    height: fileInputSize * 1.25,
};