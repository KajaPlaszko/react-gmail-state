import { useState } from 'react';
import Header from './components/Header';
import initialEmails from './data/emails';  // Importing email data

import './styles/App.css';

function App() {
  const [emails, setEmails] = useState(initialEmails);

  // Toggle starred state
  const toggleStarred = (id) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  };

  // Toggle read state
  const toggleRead = (id) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };

  // Calculate unread and starred counts
  const unreadCount = emails.filter((email) => !email.read).length;
  const starredCount = emails.filter((email) => email.starred).length;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active">
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>
          </li>
          <li className="item">
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input id="hide-read" type="checkbox" />
          </li>
        </ul>
      </nav>

      <main className="emails">
        <ul>
          {emails.map((email) => (
            <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email.id)} // Toggle read/unread status
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStarred(email.id)} // Toggle starred status
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div> {/* Display email title */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
