import React, { useRef, useState } from 'react'
import { CenterContentWrapper } from '../../../components';
import { IAssignTag, IAssignTags } from '../../../types';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { Button } from 'react-bootstrap';
import InformationModal from './Information-modal';

const newTag: IAssignTag = {
    id: "",
    name: "",
    tagName: "",
    address: "",
    dataType: "32BIT",
    commChannel: "SERIAL",
}

const AssignTags = ({
    allTags,
}: IAssignTags) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const selectedTag = useRef<IAssignTag>(newTag)
    const columns: ColDef[] = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "tagName", headerName: "Tag Name", width: 100, cellClassName: "text-center" },
        { field: "address", headerName: "Data Address", width: 120, cellClassName: "text-center" },
        { field: "dataType", headerName: "Data Type", width: 120, cellClassName: "text-center" },
        { field: "commChannel", headerName: "Comm Channel", width: 140, cellClassName: "text-center" },
    ];

    return (
        <CenterContentWrapper>
            <div className="col-md-9 p-0 d-flex flex-column bg-white rounded h-75 m-2 overflow-hidden">
                <h3 className="text-white p-2 bg-secondary w-100 text-center font-weight-light">
                    All tags
                </h3>
                <div className="flex-fill p-3">
                    <DataGrid
                        components={{}}
                        className="bg-light"
                        rows={tempTags}
                        disableSelectionOnClick
                        columns={columns}
                        autoPageSize
                        onCellClick={(e: any) => {
                            selectedTag.current = e.rowModel.data;
                            setShowModal(true);
                        }} />
                </div>
                <div className="w-100 pr-3 pb-3 m-0 row justify-content-end">
                    <Button
                        onClick={() => {
                            selectedTag.current = newTag;
                            setShowModal(true);
                        }}
                        variant="outline-primary">
                        Add new tag
                    </Button>
                </div>
                <InformationModal data={selectedTag.current} show={showModal} setShow={setShowModal} />
            </div>
        </CenterContentWrapper >
    )
}

export default AssignTags;

const tempTags: IAssignTag[] = [
    { id: "40002", name: "Phase 1 current", tagName: "Ia", address: "40002", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40004", name: "Phase 2 current", tagName: "Ib", address: "40004", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40006", name: "Phase 3 current", tagName: "Ic", address: "40006", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40012", name: "Phase 1 voltage", tagName: "Ua", address: "40012", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40014", name: "Phase 2 voltage", tagName: "Ub", address: "40014", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40016", name: "Phase 3 voltage", tagName: "Uc", address: "40016", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40022", name: "Phase 1 power", tagName: "Pa", address: "40022", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40024", name: "Phase 2 power", tagName: "Pb", address: "40024", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40026", name: "Phase 3 power", tagName: "Pc", address: "40026", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40032", name: "Phase 1 power factor", tagName: "PFa", address: "40032", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40034", name: "Phase 2 power factor", tagName: "PFb", address: "40034", dataType: "32BIT", commChannel: "SERIAL" },
    { id: "40036", name: "Phase 3 power factor", tagName: "PFc", address: "40036", dataType: "32BIT", commChannel: "SERIAL" },
]