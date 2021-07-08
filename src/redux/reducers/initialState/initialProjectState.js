import idGenerator from "../../../helpers/idGenerator";

export const initialProjectState = {
    isAddProject: false,
    editableProject: null,
    removableProjectId: "",
    isOpenConfirm: false,
    projectDetail: null,
    projects: [
        {
            id: idGenerator(),
            name: 'Project 1',
            summary: 'Business project 1',
            date: new Date(),
            tasks: [],
        },
        {
            id: idGenerator(),
            name: 'Project 2',
            summary: 'Business project 2',
            date: new Date(),
            tasks: [],
        },
        {
            id: idGenerator(),
            name: 'Project 3',
            summary: 'Business project 3',
            date: new Date(),
            tasks: [],
        },
    ],
};
