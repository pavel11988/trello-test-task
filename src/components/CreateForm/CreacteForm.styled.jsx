import styled from "@emotion/styled";

export const AddForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 7px;
  width: 250px;
`;
export const AddInput = styled.input`
  background-color: aliceblue;

  margin-right: 5px;
  height: 30px;
  width: 220px;
  border-radius: 15px;
  border: transparent;
  padding-left: 10px;
  padding-right: 10px;
`;
export const AddButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: transparent;
  background-color: #93da93;
  &:hover {
    opacity: 0.5;
  }
`;
