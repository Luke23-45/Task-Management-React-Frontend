import styled from "styled-components";
import { Link } from "react-router-dom";

const colors = {
  borderGrey: "#ccc",
  backgroundWhite: "#fff",
  backgroundHover: "#f0f0f0",
  backgroundDeleting: "#ffebee",
  textDark: "#333",
  textGrey: "#555",
  textLightGrey: "#777",
  editButtonBg: "#ffc107",
  editButtonColor: "#000",
  deleteButtonBg: "#dc3545",
  deleteButtonColor: "#fff",
  disabledBg: "#6c757d",
  disabledColor: "#fff",
};

export const StyledTaskItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const TaskItemContainer = styled.div<{ $isLoading?: boolean }>`
  border: 1px solid ${colors.borderGrey};
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  background-color: ${(props) =>
    props.$isLoading ? colors.backgroundDeleting : colors.backgroundWhite};
  opacity: ${(props) => (props.$isLoading ? 0.7 : 1)};

  &:hover {
    background-color: ${colors.backgroundHover};
  }
`;

export const TaskDetails = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`;

export const TaskTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.2em;
  color: ${colors.textDark};
`;

export const TaskDescription = styled.p`
  margin: 0 0 10px 0;
  font-size: 0.9em;
  color: ${colors.textGrey};
`;

export const TaskMeta = styled.div`
  font-size: 0.8em;
  color: ${colors.textLightGrey};
`;

export const TaskStatusSpan = styled.span`
  font-weight: bold;
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  font-size: 0.9em;

  &:disabled {
    background-color: ${colors.disabledBg};
    color: ${colors.disabledColor};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const EditButton = styled(ActionButton)`
  background-color: ${colors.editButtonBg};
  color: ${colors.editButtonColor};

  &:hover:not(:disabled) {
    background-color: #d39e00;
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: ${colors.deleteButtonBg};
  color: ${colors.deleteButtonColor};

  &:hover:not(:disabled) {
    background-color: #c82333;
  }
`;
