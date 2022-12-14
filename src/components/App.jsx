import React from 'react';
import { Section } from './section/section';
import { Form } from './contactForm/form';
import { Filter } from './filter/filter';
import { Phonebook } from "./phonebook/phonebook";

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '4591256' },
      { id: 'id-2', name: 'Hermione Kline', number: '4438912' },
      { id: 'id-3', name: 'Eden Clements', number: '6451779' },
      { id: 'id-4', name: 'Annie Copeland', number: '2279126' },
    ],
    filter: '',
  };


  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("CONTACTS"));
    if (contacts) {
      this.setState({ contacts });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("CONTACTS", JSON.stringify(this.state.contacts));
    }
  };

  addContact = contact => {
    if (
      this.state.contacts.find(
        cont => cont.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  onDelete = id => {
    const newArray = this.state.contacts.filter(c => c.id !== id);
    this.setState(prevState => ({
      contacts: [...newArray],
    }));
  };

  onChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  onFilterChange = ({ target: { value } }) => {
    this.setState({ 'filter': value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };


  render() {
    const filterContacts = this.getFilterContacts();
    return (
      <div>
        <Section title='Phonebook'>
          <Form
            onSubmit={this.addContact}
          >
          </Form>
          <Section title='Contacts'>
            <Filter
              onChange={this.onFilterChange}
              value={this.state.filter}
            />
            <Phonebook
              data={this.state.contacts}
              onDelete={this.onDelete}
              filter={filterContacts}
            />
          </Section>
        </Section>
      </div>
    );
  };
};