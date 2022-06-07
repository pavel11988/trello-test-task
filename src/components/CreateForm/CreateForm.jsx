import { AddForm, AddInput, AddButton } from "../CreateForm/CreacteForm.styled";
import { ReactComponent as AddIcon } from "../../images/add.svg";

const CreateForm = ({
  board,
  handleAddSubmit,
  newItemToProcess,
  newItemToDone,
  handleAddChange,
}) => {
  return (
    <AddForm type="submit" name={board.name} onSubmit={handleAddSubmit}>
      <AddInput
        type="text"
        name={board.name}
        value={
          board.name === "In process"
            ? newItemToProcess
            : board.name === "Done"
            ? newItemToDone
            : ""
        }
        onChange={handleAddChange}
      />
      <AddButton type="submit">{<AddIcon fill={"#3c3d3d"} />}</AddButton>
    </AddForm>
  );
};

export default CreateForm;
