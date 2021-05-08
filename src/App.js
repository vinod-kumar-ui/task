import './App.css';
import Contacts from './components/contacts/contacts';
import Chat from './components/chat/chat';
import { Provider } from 'react-redux';
import Store from './state/index';

function App() {
  return (
    <Provider store={Store}>
      <div className="content">
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>
          <div className="card">
            <div className="row g-0">
              <Contacts />
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
