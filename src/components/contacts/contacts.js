import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux';
import { activeUser, addUser } from '../../state/actions';
import { getUsers } from '../../state/reducer';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions } from '@material-ui/core';


//Set the styles
const useStyles = makeStyles(() => ({
    paper: { minWidth: "500px" , 
    minHeight:"200px",
}
  }));
const Contacts = props => {
const classes = useStyles();
    const users = useSelector(state => (state && state.users.length > 0) ? state.users : [])
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        dispatch(getUsers())
    }, []);

    const handleNewUser = () => {
        dispatch(addUser({
            name: inputValue
        }));
        setShowModal(false);
        setInputValue('');
    }

    return (
        <div className="col-12 col-lg-5 col-xl-3 border-right contacts-list" fullWidth minWidth="md">

            <div className="px-4 d-none d-md-block">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                       <button className="btn btn-success mt-4 mb-3" onClick={() => setShowModal(true)}>+ Add User</button>
                    </div>
                </div>
            </div>
            {
                users.length > 0 && users.map((user) => (
                    <a key={user['id']} style={{cursor: 'pointer'}} className="list-group-item list-group-item-action border-0" onClick={() => dispatch(activeUser({
                        id: user['id']
                    }))}>
                        {/* <div className="badge bg-success float-right">5</div> */}
                        <div className="d-flex align-items-start">
                            <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                            <div className="flex-grow-1 ml-3">
                                {user['name']}
                                <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                            </div>
                        </div>
                    </a>
                ))
            }

            <hr className="d-block d-lg-none mt-1 mb-0" />
            <Dialog onClose={() => setShowModal(false)} open={showModal}  classes={{ paper: classes.paper}}>
                <DialogTitle>Add New User</DialogTitle>
                <input className="addContactInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <DialogActions>
                    <button className="btn btn-success" onClick={() => handleNewUser()}>Add</button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false) }>Close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

Contacts.propTypes = {

}

export default Contacts
