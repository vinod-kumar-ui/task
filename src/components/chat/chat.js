import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateChat } from '../../state/actions';

const Chat = props => {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const userData = useSelector((state) => {
        console.log(state);
        if (state && state.activeUser) {
            return state.users.find(user => user.id === state.activeUser);
        } else {
            return '';
        }
    });

    useEffect(() => {
        scrollToBottom();
    }, [userData]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = () => {
        if(message) {

            dispatch(updateChat({
                id: userData['id'],
                message,
                isUser: true
            }));
            setMessage('');
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
      }


    return (
        <div className="col-12 col-lg-7 col-xl-9">
            {
                userData !== '' && (<>
                    <div className="py-2 px-4 border-bottom d-none d-lg-block">
                        <div className="d-flex align-items-center py-1">
                            <div className="position-relative">
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                            </div>
                            <div className="flex-grow-1 pl-3">
                                <strong>{userData['name']}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="position-relative">
                        <div className="chat-messages p-4">
                            {
                                (userData['chat'] && userData['chat'].length > 0) && userData['chat'].map((conv) => (
                                    <div>
                                        {
                                            conv['isUser'] && (
                                                <div className="chat-message-right pb-4">
                                                    <div>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                                                        <div className="text-muted small text-nowrap mt-2">2:33 am</div>
                                                    </div>
                                                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                                        <div className="font-weight-bold mb-1">You</div>
                                                        {conv['message']}
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            conv['isChatUser'] && (
                                                <div className="chat-message-left pb-4">
                                                    <div>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                                        <div className="text-muted small text-nowrap mt-2">2:34 am</div>
                                                    </div>
                                                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                                        <div className="font-weight-bold mb-1">{userData['name']}</div>
                                                        {conv['message']}                                </div>
                                                </div>
                                            )
                                        }

                                    </div>
                                ))
                            }

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="flex-grow-0 py-3 px-4 border-top">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Type your message"
                             value={message} onChange={(e) => setMessage(e.target.value)}  onKeyDown={handleKeyDown} />
                            <button className="btn btn-primary" onClick={() => sendMessage()}>Send</button>
                        </div>
                    </div>
                </>
                )
            }

        </div>
    )
}

Chat.propTypes = {

}

export default Chat
