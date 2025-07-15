import * as React from "react";

import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useToast } from "../contexts/ToastContext";
import { useTodos, useTodosDispatch } from "../contexts/TodosContext";
import { useState, useEffect, useMemo } from "react";

import Todo from "./Todo";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";

export default function TodoList() {
  const todos = useTodos();
  const dispatch = useTodosDispatch();

  const { showToast } = useToast();

  const [active, setActive] = useState("الكل");
  const [dialogTodo, setDialogTodo] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Handlers
  function handleActive(e) {
    if (e != null) {
      setActive(e.target.value);
    }
  }

  function showEditDialog(todo) {
    setDialogTodo(todo);
    setOpenEditDialog(true);
  }

  function handleCloseEdit() {
    setOpenEditDialog(false);
  }

  function handleEditTodo(e) {
    e.preventDefault();
    dispatch({ type: "edited", payload: dialogTodo });
    handleCloseEdit();
    showToast("تم التعديل بنجاح");
  }

  function showDeleteDialog(todo) {
    setDialogTodo(todo);
    setOpenDeleteDialog(true);
  }

  function handleCloseDelete() {
    setOpenDeleteDialog(false);
  }

  function handleDeleteTodo() {
    dispatch({ type: "deleted", payload: dialogTodo });

    setOpenDeleteDialog(false);
    showToast("تم الحذف بنجاح");
  }

  // ===  Handlers ===

  // Filteration for the array

  const CompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const nonCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToRender = todos;

  switch (active) {
    case "الكل":
      todosToRender = todos;
      break;

    case "منجز":
      todosToRender = CompletedTodos;
      break;

    case "غير منجز":
      todosToRender = nonCompletedTodos;
      break;

    default:
      alert("Error!");
      break;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []); // if the array is empty it means it will be called only on the first render

  // ===  Filteration for the array ===

  const todolist = todosToRender.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={showDeleteDialog}
        showEdit={showEditDialog}
      />
    );
  });

  return (
    <>
      {/* Delete Todo Dialog */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: "cyan",
            fontWeight: "400",
          }}
        >
          {"هل انت متاكد من رغبتك في حذف المهمة؟"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#333" }}>
          <DialogContentText
            sx={{
              color: "white",
              mt: 2,
              fontWeight: "200",
            }}
            id="alert-dialog-description"
          >
            لا يمكنك التراجع عن الحذف في حال اختيار زر (حذف)
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#333" }}>
          <Button
            variant="contained"
            sx={{ ml: 1, fontWeight: "200" }}
            onClick={handleCloseDelete}
          >
            إغلاق
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteTodo}
            autoFocus
            sx={{ fontWeight: "200" }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Delete Todo Dialog ===*/}

      {/* Edit Todo Dialog */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={openEditDialog}
        onClose={handleCloseEdit}
      >
        <DialogTitle
          sx={{
            backgroundColor: "cyan",
            fontWeight: "400",
          }}
        >
          تعديل على المهمة
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0, backgroundColor: "#333" }}>
          <form onSubmit={handleEditTodo}>
            <TextField
              sx={{
                input: {
                  color: "white",
                  fontWeight: "400",
                },
                "& label": {
                  left: "unset",
                  right: "0",
                  transformOrigin: "right",
                  color: "cyan",
                  fontWeight: 200,
                },
                "& label.Mui-focused": {
                  color: "cyan",
                },
                "& .MuiInput-root": {
                  "&::before": {
                    borderColor: "cyan", // default border color
                  },
                  "&:hover:before ": {
                    borderColor: "white !important", // hover border color
                  },
                  "&.Mui-focused:after ": {
                    borderColor: "cyan", // focused border color
                  },
                },
              }}
              autoFocus
              required
              margin="dense"
              id="todoTitle"
              name="text"
              label="عنوان المهمة"
              type="text"
              fullWidth
              variant="standard"
              value={dialogTodo.title}
              onChange={(e) => {
                setDialogTodo({ ...dialogTodo, title: e.target.value });
              }}
            />
            <TextField
              sx={{
                input: {
                  color: "white",
                  fontWeight: "400",
                },
                "& label": {
                  left: "unset",
                  right: "0",
                  transformOrigin: "right",
                  color: "cyan",
                  fontWeight: 200,
                },
                "& label.Mui-focused": {
                  color: "cyan",
                },
                "& .MuiInput-root": {
                  "&::before": {
                    borderColor: "cyan", // default border color
                  },
                  "&:hover:before ": {
                    borderColor: "white !important", // hover border color
                  },
                  "&.Mui-focused:after ": {
                    borderColor: "cyan", // focused border color
                  },
                },
              }}
              margin="dense"
              id="description"
              name="text"
              label="تفاصيل المهمة"
              type="text"
              fullWidth
              variant="standard"
              value={dialogTodo.description}
              onChange={(e) => {
                setDialogTodo({ ...dialogTodo, description: e.target.value });
              }}
            />
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleCloseEdit}
                color="error"
                sx={{
                  ml: 1,
                  fontWeight: "200",
                }}
              >
                إغلاق
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ fontWeight: "200" }}
              >
                تعديل
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* === Edit Todo Dialog === */}
      <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
        <Card
          sx={{
            minWidth: 275,
            bgcolor: "#1b1b1b",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                mb: 1,
              }}
              variant="h2"
            >
              مهامي
            </Typography>
            {/* <Divider className="divider-color" /> */}

            {/* Filter Buttons */}
            <ToggleButtonGroup
              style={{
                direction: "ltr",
                marginTop: "15px",
                backgroundColor: "#242424",
              }}
              value={active}
              exclusive
              onChange={handleActive}
              aria-label="Platform"
            >
              <ToggleButton
                className="toggle-btn"
                sx={{
                  color: "white",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "#444",
                  },
                  fontWeight: "200",
                }}
                value="غير منجز"
              >
                غير منجز
              </ToggleButton>
              <ToggleButton
                className="toggle-btn"
                sx={{
                  color: "white",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "#444",
                  },
                  fontWeight: "200",
                }}
                value="منجز"
              >
                منجز
              </ToggleButton>
              <ToggleButton
                className="toggle-btn"
                sx={{
                  color: "white",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "#444",
                  },
                  fontWeight: "200",
                }}
                value="الكل"
              >
                الكل
              </ToggleButton>
            </ToggleButtonGroup>
            {/* === Filter Buttons === */}

            {/* Add Todo */}

            <AddTodo />

            {/* === Add Todo === */}

            {/* Search Todo  */}

            <SearchTodo />

            {/* === Search Todo === */}

            {/* All Todos */}
            <div className="Scrollable-Content">{todolist}</div>
            {/* === All Todos === */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
