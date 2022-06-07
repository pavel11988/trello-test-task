import {
  Button,
  EditorButtons,
  EditorContainer,
  EditorForm,
  EditorInput,
} from "./TaskEditor.styled";

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
export default TextEditor;
