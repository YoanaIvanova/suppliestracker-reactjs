import { BsPlusCircleFill } from "react-icons/bs";

const AddNewButton = (props) => {
  return (
    <div
      className="add-new-wrapper d-flex justify-content-center align-items-center"
      onClick={props.action}
    >
      <BsPlusCircleFill
        size="2.5em"
        className="add-new-icon me-2"
      />
      <div className="add-new-text fw-bold">
        {props.text ? props.text : "Add new"}
      </div>
    </div>
  );
};

export default AddNewButton;
