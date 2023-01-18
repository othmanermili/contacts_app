import React , {useState} from 'react'
import "./ContactList.css"

function ContactList() {
    const [contacts, setContacts] = useState([
        { name: 'othmane', phone: '555-555-5555' , ville: "Tanger"},
        { name: 'aymane', phone: '444-444-4444' , ville: "Kenitra"},
        { name: 'anass', phone: '333-333-3333' , ville: "Kenitra"},
        { name: 'safae', phone: '111-111-1111' , ville: "Rabat"}
      ]);
    
      const [newName, setNewName] = useState('');
      const [newPhone, setNewPhone] = useState('');
      const [newCity, setNewCity] = useState('');
      const [sortBy, setSortBy] = useState('');
      const [searchTerm, setSearchTerm] = useState('');
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setContacts([...contacts, { name: newName, phone: newPhone, ville: newCity}]);
        setNewName('');
        setNewPhone('');
        setNewCity('');
      }
    
      const handleDelete = (index) => {
        setContacts(contacts.filter((contact, i) => i !== index));
      }
    
      const handleSort = (sortType) => {
        setSortBy(sortType);
      }
    
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      }
    
      const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.ville.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      const sortedContacts = filteredContacts.sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'phone') {
          return a.phone.localeCompare(b.phone);
        }
      });
    
      return (
        <div className='context'>
          <h1>Contacts</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
            </label>
            <label>
              Phone:
              <input type="text" value={newPhone} onChange={e => setNewPhone(e.target.value)} />
            </label>
            <label>
              City:
              <input type="text" value={newCity} onChange={e => setNewCity(e.target.value)} />
            </label>
            <button type="submit">Add Contact</button>
          </form>
          <div className='search'>
            <label>
              Search:  
            </label>
            <input type="text" value={searchTerm} onChange={handleSearch} />
          </div>
          <div className='sort-buttons'>
            <button onClick={() => handleSort('name')}>Sort by name</button>
            <button onClick={() => handleSort('phone')}>Sort by phone</button>
          </div>
          <h1>List of contacts</h1>
          <ul>
        {sortedContacts.map((contact, index) => (
          <li key={index}>
            <b>{contact.name}</b> - {contact.phone} - {contact.ville}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;