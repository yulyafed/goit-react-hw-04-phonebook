import PropTypes from 'prop-types'; 
import { List, Item, Text, Button } from './ContactsList.styled';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <>
      <List>
        {contacts.map(contact => (
          <Item key={contact.id}>
            <Text>
              {contact.name} : {contact.number}
            </Text>
            <Button onClick={() => onDeleteContact(contact.id)}>Delete</Button>
          </Item>
        ))}
      </List>
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
