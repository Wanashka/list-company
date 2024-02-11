import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    addCompany,
    addStaff,
    deleteCompany,
    deleteStaff, editingMode,
    selectCompany, selectCompanyAll,
    selectStaff,
    selectStaffAll,
    saveEditData,
    editingModeStaff,
    saveEditDataStaff,
} from "./store/companySlice";

function App() {
    const [nameCompany, setNameCompany] = useState("")
    const [addressCompany, setAddressCompany] = useState("")
    const [selectedCompany, setSelectedCompany] = useState(false)
    const [selectedCompanyAll, setSelectedCompanyAll] = useState(false)
    const [editNameCompany, setEditNameCompany] = useState("")
    const [editAddressCompany, setEditAddressCompany] = useState("")

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [post, setPost] = useState("")
    const [selectedStaff, setSelectedStaff] = useState(false)
    const [selectedStaffAll, setSelectedStaffAll] = useState(false)
    const [editFirstName, setEditFirstName] = useState("")
    const [editLastName, setEditLastName] = useState("")
    const [editPost, setEditPost] = useState("")

    const company = useSelector((state: any) => state.companySlice.company)
    const dispatch = useDispatch()

    useEffect(() => {
        const companySelect = company.filter((i: any) => i.selected).length
        setSelectedCompanyAll(companySelect === company.length)
        if (company.filter((i: any) => i.selected).length === 1) {
            company.map((item: any) => {
                if (item.selected) {
                    setSelectedStaffAll(item.staff.filter((i: any) => i.selected).length === item.staff.length)
                }
            })
        }
    }, [company])

    const handleBlurCompany = () => {
        dispatch(saveEditData({editNameCompany, editAddressCompany}))
    }

    const handleBlurStaff = () => {
        dispatch(saveEditDataStaff({editFirstName, editLastName, editPost}))
    }

    const viewFieldCompany = (id: number) => {
        dispatch(editingMode(id))
        company.forEach((i: any) => {
            if (i.id === id) {
                setEditNameCompany(i.name)
                setEditAddressCompany(i.address)
            }
        })
    }

    const viewFieldStaff = (id: number) => {
        dispatch(editingModeStaff(id))
        company.forEach((item: any) => {
            if (item.selected) {
                item.staff.forEach((i: any) => {
                    if (i.id === id) {
                        setEditFirstName(i.firstName)
                        setEditLastName(i.lastName)
                        setEditPost(i.post)
                    }
                })
            }
        })
    }

    const viewCompany = company.map((item: any) => {
        return (
            <tr className={item.selected ? (s.active) : ""}
                onDoubleClick={() => viewFieldCompany(item.id)}>
                <td>
                    <input type={"checkbox"}
                           checked={item.selected}
                           onClick={() => dispatch(selectCompany(item.id))}/>
                </td>
                <td>{(item.isMode ?
                    <input value={editNameCompany}
                           onChange={(e => setEditNameCompany(e.target.value))}
                           onBlur={handleBlurCompany}/> : item.name)}</td>
                <td>{item.quantityStaff}</td>
                <td>{(item.isMode ?
                    <input onChange={(e => setEditAddressCompany(e.target.value))}
                           value={editAddressCompany}
                           onBlur={handleBlurCompany}/> : item.address)}</td>
            </tr>
        )
    })

    const viewStaff = company.map((item: any) => {
        if (item.selected && item.staff.length) {
            return (
                item.staff.map((i: any) => {
                    return (
                        <tr className={i.selected ? s.active : ""}
                            onDoubleClick={() => viewFieldStaff(i.id)}>
                            <td><input type={"checkbox"} checked={i.selected}
                                       onClick={() => dispatch(selectStaff(i.id))}/>
                            </td>
                            <td>{i.isMoodStaff ?
                                <input onBlur={handleBlurStaff}
                                       onChange={(e) => setEditLastName(e.target.value)}
                                       value={editLastName}/> : i.lastName}</td>
                            <td>{i.isMoodStaff ?
                                <input onBlur={handleBlurStaff}
                                       onChange={(e) => setEditFirstName(e.target.value)}
                                       value={editFirstName}/> : i.firstName}</td>
                            <td>{i.isMoodStaff ?
                                <input onBlur={handleBlurStaff}
                                       onChange={(e) => setEditPost(e.target.value)}
                                       value={editPost}/> : i.post}</td>
                        </tr>
                    )
                })
            )
        }

    })

    const sendCompanyData = () => {
        if (nameCompany && addressCompany) {
            dispatch(addCompany({selectedCompany, nameCompany, addressCompany}))
            setNameCompany("");
            setAddressCompany("");
            setSelectedCompany(false)
        }
    }

    const sendStaffData = () => {
        if (lastName && firstName && post) {
            dispatch(addStaff({selectedStaff, lastName, firstName, post}))
            setSelectedStaff(false);
            setLastName("")
            setFirstName("")
            setPost("")
        }
    }

    const viewStaffContainer = () => {
        const selectedCompany = company.filter((item: any) => item.selected).length;
        if (selectedCompany > 1 || selectedCompany === 0) {
            return {display: "none"}
        }
    }

    const deleteStaffData = () => {
        company.map((i: any) => {
            if (i.selected) {
                dispatch(deleteStaff(i.staff.length - i.staff.filter((el: any) => el.selected).length))
            }
        })
    }

    return (
        <div>
            <div className={s.container}>
                <div className={s.companyContainer}>
                    <table className={s.companyTable}>
                        <th colSpan={4}>Компании:
                            <input type={"checkbox"} onClick={() => dispatch(selectCompanyAll(selectedCompanyAll))}
                                   onChange={(e) => setSelectedCompanyAll(e.target.checked)}
                                   checked={selectedCompanyAll}
                            />
                            <label>Выделить всё</label>
                        </th>
                        {viewCompany}
                        <tr>
                            <td><input type={"checkbox"}
                                       checked={selectedCompany}
                                       onChange={(e) => setSelectedCompany(e.target.checked)}/></td>
                            <td><input type={"text"} placeholder={"Название компании"}
                                       onChange={(e) => setNameCompany(e.target.value)}
                                       value={nameCompany}/></td>
                            <td>0</td>
                            <td><input type={"text"} placeholder={"Адрес организации"}
                                       onChange={(e) => setAddressCompany(e.target.value)}
                                       value={addressCompany}/></td>
                        </tr>
                    </table>
                    <button onClick={sendCompanyData}>Добавить</button>
                    <button onClick={() => dispatch(deleteCompany())}>Удалить</button>
                </div>

                <div className={s.staffContainer} style={viewStaffContainer()}>
                    <table className={s.staffTable}>
                        <th colSpan={4}>Сотрудники:
                            <input type={"checkbox"} onClick={() => dispatch(selectStaffAll(selectedStaffAll))}
                                   onChange={(e) => setSelectedStaffAll(e.target.checked)}
                                   checked={selectedStaffAll}
                            />
                            <label>Выделить всё</label>
                        </th>

                        {viewStaff}

                        <tr>
                            <td><input type={"checkbox"}
                                       checked={selectedStaff}
                                       onChange={(e) => setSelectedStaff(e.target.checked)}/></td>
                            <td><input type={"text"} placeholder={"Фамилия"}
                                       onChange={(e) => setLastName(e.target.value)}
                                       value={lastName}/></td>
                            <td><input type={"text"} placeholder={"Имя"}
                                       onChange={(e) => setFirstName(e.target.value)}
                                       value={firstName}/></td>
                            <td><input type={"text"} placeholder={"Должность"}
                                       onChange={(e) => setPost(e.target.value)}
                                       value={post}/></td>
                        </tr>
                    </table>
                    <button onClick={sendStaffData}>Добавить
                    </button>
                    <button onClick={deleteStaffData}>Удалить</button>
                </div>

            </div>
        </div>
    );
}

export default App;
