import { Label,Input} from './ContactsFilter.styled';

export const ContactsFilter = ({ initialValue, filterChanged }) => {
  return (
    <>
      <Label>
        Find contacts by name <br />
        <Input
          type="text"
          onChange={e => filterChanged(e.target.value.toLocaleLowerCase())}
          value={initialValue}
        />
      </Label>
    </>
  );
};
