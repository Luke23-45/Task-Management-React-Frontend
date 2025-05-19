import styled from "styled-components";

const colors = {
  primaryBlue: "#007bff",
  primaryGreen: "#28a745",
  dangerRed: "#dc3545",
  successGreen: "#28a745",
  white: "#ffffff",
  black: "#000000",
  grey: "#6c757d",
  lightGrey: "#f9f9f9",
  borderGrey: "#ccc",
  textGrey: "#555",
  infoText: "#555",
  buttonHoverBlue: "#0056b3",
  buttonHoverGreen: "#218838",
  buttonHoverRed: "#c82333",
  disabledBg: "#6c757d",
  disabledColor: "#fff",
};

export const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  text-align: center;
  color: ${colors.black};
  margin-bottom: 30px;
`;

export const CreateTaskButton = styled.button`
  padding: 10px 15px;
  background-color: ${colors.primaryGreen};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1em;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.buttonHoverGreen};
  }

  &:disabled {
    background-color: ${colors.grey};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const MutationMessage = styled.div<{ $type: "success" | "error" }>`
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  color: ${(props) =>
    props.$type === "success" ? colors.successGreen : colors.dangerRed};
  background-color: ${(props) =>
    props.$type === "success" ? "#d4edda" : "#f8d7da"};
  border: 1px solid
    ${(props) => (props.$type === "success" ? "#c3e6cb" : "#f5c6cb")};
`;

export const CreateFormContainer = styled.div`
  border: 1px solid ${colors.borderGrey};
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  background: ${colors.lightGrey};
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    color: ${colors.black};
  }
`;

export const TaskControls = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
  border-bottom: 1px solid ${colors.borderGrey};
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ControlLabel = styled.label`
  font-weight: bold;
  color: #ccc;
  font-size: 0.95em;
`;

export const ControlInput = styled.input`
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9em;
`;

export const ControlSelect = styled.select`
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9em;
`;

export const FetchingIndicator = styled.span`
  font-size: 0.9em;
  color: ${colors.infoText};
  margin-left: 15px;
`;

export const TaskListContainer = styled.div`
  margin-top: 20px;
`;

export const NoTasksMessage = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 1.1em;
  color: ${colors.textGrey};
`;

export const PaginationControls = styled.div`
  margin-top: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const PaginationButton = styled.button`
  padding: 8px 15px;
  background-color: ${colors.primaryBlue};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition:
    background-color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: ${colors.buttonHoverBlue};
  }

  &:disabled {
    background-color: ${colors.grey};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const CurrentPageSpan = styled.span`
  font-size: 1em;
  font-weight: bold;
  color: #ccc;
`;

export const TotalTasksText = styled.p`
  font-size: 0.9em;
  color: ${colors.textGrey};
  margin-top: 10px;
`;
