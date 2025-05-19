import styled from "styled-components";

const colors = {
  primaryBlue: "#007bff",
  primaryGreen: "#28a745",
  dangerRed: "#dc3545",
  white: "#ffffff",
  black: "#000000",
  grey: "#6c757d",
  lightGrey: "#f0f0f0",
  darkGrey: "#343a40",
};

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormField = styled.div`
  width: 100%;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: ${colors.darkGrey};
  font-size: 1em;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: ${colors.primaryBlue};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }

  &:disabled {
    background-color: ${colors.lightGrey};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: ${colors.dangerRed};
  text-align: center;
  margin: 10px 0 0 0;
  font-size: 0.9em;
`;

export const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: ${colors.primaryBlue};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition:
    background-color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: ${colors.grey};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
