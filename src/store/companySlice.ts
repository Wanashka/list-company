import {createSlice} from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        company: [{
            id: 1,
            selected: true,
            name: "СтройПлюс",
            quantityStaff: 3,
            address: "Ленина 423423",
            isMode: false,
            staff: [{
                id: 1, selected: false,
                firstName: "Ivan",
                lastName: "Crasnov",
                post: "developer",
                isMoodStaff: false,
            }, {
                id: 2,
                selected: false,
                firstName: "Ivan",
                lastName: "Crasnov",
                post: "developer",
                isMoodStaff: false,
            }, {
                id: 3,
                selected: true,
                firstName: "Ivan",
                lastName: "Crasnov",
                post: "developer",
                isMoodStaff: false,
            }],
        }, {
            id: 2,
            selected: false,
            name: "НеСтройМинус",
            quantityStaff: 1,
            address: "Ленина 7423",
            isMode: false,
            staff: [{
                id: 2,
                selected: false,
                firstName: "Ivan",
                lastName: "Crasnov",
                post: "developer",
                isMoodStaff: false,
            }],
        }, {
            id: 3,
            selected: false,
            name: "стройЮГ",
            quantityStaff: 0,
            address: "Ленина 71",
            isMode: false,
            staff: [],
        }],
        value: 0,
    },
    reducers: {
        deleteCompany: (state) => {
            state.company = state.company.filter((item) => !item.selected);
        },
        addCompany: (state, action) => {
            state.company = [...state.company, {
                id: Date.now(),
                selected: action.payload.selectedCompany,
                name: action.payload.nameCompany,
                quantityStaff: 0,
                address: action.payload.addressCompany,
                isMode: false,
                staff: [],
            }]
        },
        selectCompany: (state, action) => {
            state.company = state.company.map((item) => {
                if (item.id === action.payload) {
                    return {...item, selected: !item.selected}
                } else {
                    return item
                }
            })
        },
        selectCompanyAll: (state, action) => {
            state.company = state.company.map((item) => {
                return {...item, selected: !action.payload}
            })
        },

        editingMode: (state, action) => {
            state.company = state.company.map((item) => {
                if (item.id === action.payload) {
                    return {...item, isMode: !item.isMode}
                } else {
                    return {...item, isMode: false}
                }
            })
        },
        saveEditData: (state, action) => {
            state.company = state.company.map(item =>
                (item.isMode) ? {
                    ...item,
                    name: action.payload.editNameCompany,
                    address: action.payload.editAddressCompany,
                    isMode: false
                } : item)
        },

        deleteStaff: (state, action) => {
            state.company = state.company.map((item) => {
                if (item.selected) {
                    return {
                        ...item,
                        quantityStaff: action.payload,
                        staff: item.staff.filter((el: any) => !el.selected),
                    }
                } else {
                    return item
                }
            })
        },
        addStaff: (state, action) => {
            state.company = state.company.map((item) => {
                if (item.selected) {
                    return {
                        ...item, quantityStaff: item.quantityStaff + 1, staff: [...item.staff, {
                            id: Date.now(),
                            selected: action.payload.selectedStaff,
                            firstName: action.payload.firstName,
                            lastName: action.payload.lastName,
                            post: action.payload.post,
                            isMoodStaff: false,
                        }]
                    }
                } else {
                    return item
                }
            })
        },
        selectStaff: (state, action) => {
            state.company = state.company.map((item) => {
                if (item.selected) {
                    return {
                        ...item, staff: item.staff.map((el) => {
                            if (el.id === action.payload) {
                                return {...el, selected: !el.selected}
                            } else {
                                return el
                            }
                        })
                    }
                } else {
                    return item
                }
            })
        },
        selectStaffAll: (state, action) => {
            state.company = state.company.map((item) => {
                if (item.selected) {
                    return {
                        ...item, staff: item.staff.map((el) => {
                            return {...el, selected: !action.payload}
                        })
                    }
                } else {
                    return item
                }
            })
        },
        editingModeStaff: (state, action) => {
            state.company = state.company.map((item) => {
                if (item.selected) {
                    return {
                        ...item, staff: item.staff.map((el) => {
                            if (el.id === action.payload) {
                                return {...el, isMoodStaff: true}
                            } else {
                                return {...el, isMoodStaff: false}
                            }
                        })
                    }
                } else {
                    return item
                }
            })
        },
        saveEditDataStaff: (state, action) => {
            state.company = state.company.map((item) => {
                if (item.selected) {
                    return {
                        ...item, staff: item.staff.map((el) => {
                            if (el.isMoodStaff) {
                                return {
                                    ...el,
                                    firstName: action.payload.editFirstName,
                                    lastName: action.payload.editLastName,
                                    post: action.payload.editPost,
                                    isMoodStaff: false,
                                }
                            } else {
                                return el
                            }
                        })
                    }
                } else {
                    return item
                }
            })
        },
    }
})

export const {
    deleteCompany,
    addCompany,
    selectCompany,
    selectCompanyAll,
    editingMode,
    deleteStaff,
    addStaff,
    selectStaff,
    selectStaffAll,
    saveEditData,
    editingModeStaff,
    saveEditDataStaff,
} = counterSlice.actions

export default counterSlice.reducer
