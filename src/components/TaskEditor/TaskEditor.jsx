import {
  Button,
  EditorButtons,
  EditorContainer,
  EditorForm,
  EditorInput,
} from "./TaskEditor.styled";
import PropTypes from "prop-types";

const TextEditor = ({
  handleEditSubmit,
  handleEditChange,
  editItem,
  closeEditor,
}) => {
  return (
    <EditorContainer>
      <EditorForm type="submit" onSubmit={handleEditSubmit}>
        <EditorInput
          type="text"
          value={editItem.content}
          name="editor"
          onChange={handleEditChange}
        />
        <EditorButtons>
          <Button type="submit">Edit</Button>
          <Button type="submit" onClick={closeEditor}>
            Cancel
          </Button>
        </EditorButtons>
      </EditorForm>
    </EditorContainer>
  );
};

TextEditor.propTypes = {
  handleEditSubmit: PropTypes.func,
  handleEditChange: PropTypes.func,
  editItem: PropTypes.shape({
    content: PropTypes.string,
    currentBoard: PropTypes.shape({
      name: PropTypes.string,
      items: PropTypes.array,
    }),
    id: PropTypes.string,
  }),
  closeEditor: PropTypes.func,
};

export default TextEditor;
