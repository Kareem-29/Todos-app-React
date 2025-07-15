import * as React from "react";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { useToast } from "../contexts/ToastContext";
import { useState } from "react";
import { useTodosDispatch } from "../contexts/TodosContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

export default function AddTodo() {
  const dispatch = useTodosDispatch();
  const { showToast } = useToast();

  const [inputTodo, setInputTodo] = useState({ title: "", description: "" });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleClickAdd = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAdd = () => {
    setOpenAddDialog(false);
  };

  function handleAddTodo(e) {
    e.preventDefault();

    dispatch({
      type: "added",
      payload: inputTodo,
    });

    setInputTodo({ title: "", description: "" });
    handleCloseAdd();
    showToast("تم إضافة مهمة جديدة");
  }

  return (
    <>
      <Button
        className="add-btn"
        sx={{
          height: "100%",
          fontWeight: "bold",
          fontSize: "21px",
          textAlign: "center",
          backgroundColor: "#d74a49",
          color: "white",
          mt: 2,
          mb: 1,
          zIndex: 50,
        }}
        fullWidth
        variant="contained"
        onClick={handleClickAdd}
      >
        اضافة مهمة جديدة
      </Button>
      <Dialog
        sx={{ direction: "rtl" }}
        open={openAddDialog}
        onClose={handleCloseAdd}
      >
        <DialogTitle
          sx={{
            backgroundColor: "cyan",
            fontWeight: "400",
          }}
        >
          {" "}
          اضافة مهمة جديدة
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0, backgroundColor: "#333" }}>
          <form onSubmit={handleAddTodo}>
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
                  fontWeight: "200",
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
              value={inputTodo.title}
              onChange={(e) => {
                setInputTodo({ ...inputTodo, title: e.target.value });
              }}
            />
            <TextField
              sx={{
                input: {
                  color: "white",
                },
                "& label": {
                  left: "unset",
                  right: "0",
                  transformOrigin: "right",
                  color: "cyan",
                  fontWeight: "200",
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
              value={inputTodo.description}
              onChange={(e) => {
                setInputTodo({ ...inputTodo, description: e.target.value });
              }}
            />
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleCloseAdd}
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
                اضافة
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
