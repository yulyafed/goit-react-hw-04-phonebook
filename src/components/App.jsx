import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title, TitleContact } from './App.styled';

export default function App () {
  
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  } );
  const [filter, setFilter] = useState('');
  
  const filteredContacts = () => {
    if (filter === '') {
      return contacts;
    }

    return contacts.filter(item =>
      item.name.toLocaleLowerCase().includes(filter)
    );
  };

  const deleteContacts = contactId => { 
    setContacts(contacts.filter(contact => contact.id !== contactId))
  }
  
  useEffect(() => {
     
      localStorage.setItem('contacts', JSON.stringify(contacts));
   
  },[contacts]);

    return (
      <>
        <Title>Phonebook</Title>
        <PhonebookForm
          addContact={(contactName, contactNumber) => {
            if (!contacts.some(contact => contact.name === contactName)) {
              setContacts([
                ...contacts,
                { id: nanoid(), name: contactName, number: contactNumber },
              ]);
              return;
            }
            alert(`${contactName} is already in contacts`);
          }}
        />
        <TitleContact>Contacts</TitleContact>
        <ContactsFilter
          initialValue={filter}
          filterChanged={filterValue => setFilter(filterValue)}
        />
        <ContactsList
          contacts={filteredContacts()}
          onDeleteContact={deleteContacts}
        />
      </>
    );
  }

