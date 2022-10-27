import { nanoid } from 'nanoid';
import { Component } from 'react';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title, TitleContact } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  filteredContacts = () => {
    if (this.state.filter.trim() === '') {
      return this.state.contacts;
    }

    return this.state.contacts.filter(item =>
      item.name.toLocaleLowerCase().includes(this.state.filter)
    );
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() { 
    const gettedContacts = localStorage.getItem('contacts');
    if (!gettedContacts) { 
         return
    }
    
    const parsedContacts = JSON.parse(gettedContacts);
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) { 
    if (this.state.contacts !== prevState.contacts) { 
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

render() {
    return (
      <>
        <Title>Phonebook</Title>
          <PhonebookForm
            addContact={(contactName, contactNumber) => {
              if (
                !this.state.contacts.some(
                  contact => contact.name === contactName
                )
              ) {
                return this.setState(prevState => ({
                  contacts: [
                    ...prevState.contacts,
                    { id: nanoid(), name: contactName, number: contactNumber },
                  ],
                }));
              }
              alert(`${contactName} is already in contacts`);
            }}
        />
        <TitleContact>Contacts</TitleContact>
        <ContactsFilter
          initialValue={this.state.filter}
          filterChanged={filterValue => this.setState({ filter: filterValue })}
        />

        <ContactsList
          contacts={this.filteredContacts()}
          onDeleteContact={this.deleteContacts}
        />
      </>
    );
  }
}
