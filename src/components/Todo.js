import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

// import Alert from "@mui/material/Alert";

export default function Todo({ todo, showDelete, showEdit }) {
  const dispatch = useTodosDispatch();
  const { showToast } = useToast();

  function handleClickDelete() {
    showDelete(todo);
  }

  function handleClickEdit() {
    showEdit(todo);
  }

  function handleCompletedTodo() {
    dispatch({ type: "toggledCompleted", payload: todo });

    showToast("تم التعديل بنجاح");
  }

  return (
    <>
      <Card
        className="card-container"
        sx={{
          minWidth: 275,
          bgcolor: todo.isCompleted ? "#01a50e" : "cyan",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Grid container spacing={0}>
            <Grid size={8}>
              <Typography
                className="todo-title"
                sx={{
                  textAlign: "right",
                  color: todo.isCompleted ? "white" : "black",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  fontWeight: "400",
                }}
                variant="h5"
              >
                {todo.title}
              </Typography>
              <Typography
                className="todo-subtitle"
                variant="subtitle1"
                sx={{
                  textAlign: "right",
                  color: todo.isCompleted ? "white" : "black",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  fontWeight: "200",
                }}
              >
                {todo.description}
              </Typography>
            </Grid>

            {/* Action Buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                aria-label="checked"
                style={{
                  color: todo.isCompleted ? "white" : "#01a50e",
                  backgroundColor: todo.isCompleted ? "#01a50e" : "white",
                  border: todo.isCompleted
                    ? "2px solid white"
                    : "2px solid #01a50e",
                }}
                onClick={handleCompletedTodo}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                style={{
                  color: todo.isCompleted ? "white" : "#1c58a7",
                  backgroundColor: todo.isCompleted ? "#1c58a7" : "white",
                  border: "2px solid #1c58a7",
                }}
                aria-label="edit"
                onClick={handleClickEdit}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={handleClickDelete}
                className="iconButton"
                style={{
                  color: todo.isCompleted ? "white " : "#e20a0a",
                  backgroundColor: todo.isCompleted ? "#e20a0a" : "white",
                  border: "2px solid #e20a0a",
                }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            {/* === Action Buttons === */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
