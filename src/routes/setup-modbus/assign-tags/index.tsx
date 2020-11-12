import React, { useEffect, useRef, useState } from 'react'
import { CenterContentWrapper } from '../../../components';
import { IAssignTag, IAssignTags, IAssignTagStore } from '../../../types';
import { DataGrid, ColDef, CellValue } from '@material-ui/data-grid';
import { Button } from 'react-bootstrap';
import InformationModal from './Information-modal';
import { MapStateToPropsType } from '../../../stores';
import { connect } from 'react-redux';
import { getAllTags } from '../../../stores/actions';

const newTag: IAssignTag = {
    id: 0,
    name: "",
    tagName: "",
    address: "",
    dataType: "",
    commChannel: "",
    notificationAction: []
}

const AssignTags = ({
    allTags,
    getAllTags,
    setAllTags
}: IAssignTags) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const selectedTag = useRef<IAssignTag>(newTag)
    const columns: ColDef[] = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "tagName", headerName: "Tag Name", width: 100, cellClassName: "text-center" },
        { field: "address", headerName: "Data Address", width: 120, cellClassName: "text-center" },
        { field: "dataType", headerName: "Data Type", width: 120, cellClassName: "text-center" },
        { field: "commChannel", headerName: "Comm Channel", width: 140, cellClassName: "text-center" },
        {
            field: "notificationActions",
            headerName: "Notifications",
            width: 120,
            cellClassName: "text-center",
            valueGetter: (params: CellValue<any>) => params?.rowModel?.data.notificationAction.length !== 0 ?
                "On"
                :
                "Off"
        }
    ];

    useEffect(() => {
        getAllTags(
            () => setLoading(false),
            () => setLoading(false)
        );
    }, []);

    const updateAllTags = (args: IAssignTag) => {
        allTags[args.id] = args;
        console.log(allTags);
    }
    return (
        <CenterContentWrapper>
            <div className="col-lg-9 p-0 d-flex flex-column bg-white rounded h-75 m-2 overflow-hidden">
                <h3 className="text-white p-2 bg-secondary w-100 text-center font-weight-light">
                    All tags
                </h3>
                <div className="flex-fill p-3">
                    <DataGrid
                        components={{}}
                        className="bg-light"
                        rows={allTags}
                        disableSelectionOnClick
                        loading={loading}
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
                            selectedTag.current.id = allTags.length;
                            setShowModal(true);
                        }}
                        variant="outline-primary">
                        Add new tag
                    </Button>
                </div>
                <InformationModal
                    data={selectedTag.current}
                    onUpdate={updateAllTags}
                    show={showModal}
                    checkExisitingTag={tagName => allTags.findIndex(el => tagName === el.tagName) !== -1}
                    setShow={setShowModal} />
            </div>
        </CenterContentWrapper >
    )
}

const mapSTateToProps: MapStateToPropsType<IAssignTagStore> = state => state.assignTags;
export default connect(mapSTateToProps, { getAllTags })(AssignTags);
