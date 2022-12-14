import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { FormStyle, Label, FormInput, FormButton } from './form.styled';

export class Form extends Component {
    state = {
        name: '',
        number: '',
    };

    onChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value })
    };

    reset = () => {
        this.setState({
            name: "",
            number: "",
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const contact = {
            name: this.state.name,
            number: this.state.number,
            id: nanoid(5),
        };
        this.props.onSubmit(contact);
        this.reset();
    }

    render() {
    return (
        <FormStyle onSubmit={this.onSubmit}>
            <Label>
                Name
                <FormInput 
                name="name"
                type='text'
                placeholder='Please enter the name'
                value={this.state.name}
                onChange={this.onChange}
                required
                />
            </Label>
            <Label>
                Phone
            <FormInput
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                placeholder='Please enter phone number'
                value={this.state.number}
                onChange={this.onChange}
                minlength="7"
                maxLength="10"
                />
            </Label>
            <FormButton type='submit'>Add contact</FormButton>
        </FormStyle>
    )
}
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}