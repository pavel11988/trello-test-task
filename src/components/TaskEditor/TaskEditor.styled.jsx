import styled from "@emotion/styled";

export const EditorContainer = styled.div`
  position: absolute;
  background-color: #0000003e;
  width: 100vw;
  height: 100vw;
`;
export const EditorForm = styled.form`
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  background-color: #1200d473;

  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  border-radius: 20px;
`;

export const EditorInput = styled.input`
  background-color: aliceblue;
  text-align: center;
  margin-bottom: 20px;
  height: 30px;
  width: 220px;
  border-radius: 15px;
  border: transparent;
  padding-left: 10px;
  padding-right: 10px;
`;
export const EditorButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  border: transparent;
  &:hover {
    opacity: 0.5;
  }
  &:nth-of-type(1) {
    margin-right: 15px;
    background-color: #26ad2d;
  }
  &:nth-of-type(2) {
    background-color: #a53737;
  }
`;
