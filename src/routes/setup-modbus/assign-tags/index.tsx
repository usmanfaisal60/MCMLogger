import React, { useEffect, useRef, useState } from 'react'
import { BackHeaderWrapper, CenterContentWrapper } from '../../../components';
import { IAssignTag, IAssignTags, IAssignTagStore } from '../../../types';
import { DataGrid, ColDef, CellValue } from '@material-ui/data-grid';
import { Button } from 'react-bootstrap';
import InformationModal from './Information-modal';
import { MapStateToPropsType } from '../../../stores';
import { connect } from 'react-redux';
import { getAllTags, setAllTags } from '../../../stores/actions';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { colors } from '../../../services';
import { useHistory } from 'react-router-dom';

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
    const [innerModalLoading, setInnerModalLoading] = useState<boolean>(false);
    const selectedTag = useRef<IAssignTag>(newTag)
    const history = useHistory();

    const columns: ColDef[] = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "tagName", headerName: "Tag Name", width: 100, cellClassName: "text-center" },
        { field: "address", headerName: "Data Address", width: 120, cellClassName: "text-center" },
        { field: "dataType", headerName: "Data Type", width: 120, cellClassName: "text-center" },
        { field: "commChannel", headerName: "Comm Channel", width: 140, cellClassName: "text-center" },
        {
            field: "notificationAction",
            headerName: "Notifications",
            width: 120,
            cellClassName: "text-center",
            valueGetter: (params: CellValue<any>) => params?.rowModel?.data.notificationAction.length !== 0 ?
                "On"
                :
                "Off"
        }
    ];

    const _getAllTags = () => {
        setLoading(true);
        getAllTags(
            () => setLoading(false),
            () => setLoading(false)
        );
    }
    useEffect(() => {
        _getAllTags();
    }, []);

    const updateAllTags = (args: IAssignTag) => {
        setInnerModalLoading(true);
        allTags[args.id] = args;
        console.log(JSON.stringify(allTags.map(el => ({ ...el, id: undefined }))));
        setAllTags(JSON.stringify(allTags.map(el => ({ ...el, id: undefined }))),
            () => {
                _getAllTags();
                setInnerModalLoading(false);
                setShowModal(false);
            },
            () => setInnerModalLoading(false)
        );
    }
    return (
        <BackHeaderWrapper>
            <CenterContentWrapper>
                <div className="col-lg-9 p-0 d-flex flex-column bg-white rounded h-75 m-2 overflow-hidden">
                    <div className="w-100 p-3 text-light bg-secondary row m-0 justify-content-between align-items-center">
                        <h4 className="flex-fill p-0 m-0 font-weight-normal">
                            All Tags
                        </h4>
                    </div>
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
                            size="sm"
                            variant="outline-primary">
                            Add new tag
                    </Button>
                    </div>
                    <InformationModal
                        data={selectedTag.current}
                        onUpdate={updateAllTags}
                        show={showModal}
                        loading={innerModalLoading}
                        checkExisitingTag={tagName => allTags.findIndex(el => tagName === el.tagName) !== -1}
                        setShow={setShowModal} />
                </div>
            </CenterContentWrapper>
        </BackHeaderWrapper>
    )
}

const mapSTateToProps: MapStateToPropsType<IAssignTagStore> = state => state.assignTags;
export default connect(mapSTateToProps, { getAllTags, setAllTags })(AssignTags);
