import { useState } from 'react';
import Header from './components/Header';
import initialEmails from './data/emails';  

import './styles/App.css';

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideread] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox');

  function toggleStarred(id) {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);

  }
  

  function toggleRead(id) {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  }

  function toggleHideRead() {
    setHideread(!hideRead);
  }

  function getReadEmails(emails) {
    if(hideRead) {
      return emails.filter(email => !email.read);
    }
    return emails;
  }

  function getStarredEmails(emails){
    return emails.filter(email => email.starred);
  }

  const unreadCount = emails.filter((email) => !email.read).length;
  const starredCount = emails.filter((email) => email.starred).length;
 
  let displayedEmails;
  if (currentTab === 'starred') {
    displayedEmails = getStarredEmails(emails);
  }else {
    displayedEmails = getReadEmails(emails);
  }




  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
        <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}  
            onClick={() => setCurrentTab('inbox')}  
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>  
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}  
            onClick={() => setCurrentTab('starred')}  
          >
             <span className="label">Starred</span>
            <span className="count">{starredCount}</span>  
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input id="hide-read" type="checkbox" checked={hideRead} onChange={toggleHideRead} />
          </li>
        </ul>
      </nav>

      <main className="emails">
        <ul>
          {displayedEmails.map((email) => (
            <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email.id)} 
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStarred(email.id)} 
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div> 
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
