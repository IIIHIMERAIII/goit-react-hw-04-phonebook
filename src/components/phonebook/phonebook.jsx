import PropTypes from 'prop-types';
import { StyledDiv, List, ListItem, ListButton } from "./phonebook.style"
export const Phonebook = ({
    filter,
    onDelete,
}) => {
    return (
        <StyledDiv>
            <List>
                {filter.map(contact => (
                    <ListItem key={contact.id}>
                        <span>{contact.name}: {contact.number}</span>
                        <ListButton onClick={() => onDelete(contact.id)} type="button">Delete</ListButton>
                    </ListItem>
                ))}
            </List>
        </StyledDiv>
    )
};

Phonebook.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onFindContact: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    filter: PropTypes.array.isRequired,
};

