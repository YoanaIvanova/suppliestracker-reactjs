import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const Searchbar = (props) => {
  return (
    <InputGroup className="search-group">
      <InputGroup.Text id="search">
        <BsSearch />
      </InputGroup.Text>
      <FormControl
        className="ps-1"
        size="lg"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search"
        onChange={(e) => props.onSearch(e)}
      />
    </InputGroup>
  );
};

export default Searchbar;
