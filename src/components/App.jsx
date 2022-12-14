import React from 'react';
import { Section } from './section/section';
import { Form } from './contactForm/form';
import { Filter } from './filter/filter';
import { Phonebook } from "./phonebook/phonebook";
import { useState } from 'react';
import { useEffect } from 'react';

// let contactsData = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '4591256' },
//   { id: 'id-2', name: 'Hermione Kline', number: '4438912' },
//   { id: 'id-3', name: 'Eden Clements', number: '6451779' },
//   { id: 'id-4', name: 'Annie Copeland', number: '2279126' },
// ];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsFromLS = JSON.parse(localStorage.getItem("CONTACTS"));
    return contactsFromLS ? contactsFromLS : [];
  });
  const [filter, setFilter] = useState("");


  useEffect(() => { localStorage.setItem("CONTACTS", JSON.stringify(contacts)) }, [contacts]);

  const addContact = contact => {
    if (
      contacts.find(
        cont => cont.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts(prevState => [...prevState, contact]);
  };

  const onDelete = id => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const onFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const onFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filterContacts = onFilter();
  return (
    <div>
      <Section title='Phonebook'>
        <Form
          onSubmit={addContact}
        >
        </Form>
        <Section title='Contacts'>
          <Filter
            onChange={onFilterChange}
            value={filter}
          />
          <Phonebook
            data={contacts}
            onDelete={onDelete}
            filter={filterContacts}
          />
        </Section>
      </Section>
    </div>
  );
};

export { App };