import * as React from "react";

import TextField from "@mui/material/TextField";

import { useState } from "react";
import { useTodosDispatch } from "../contexts/TodosContext";

export default function SearchTodo() {
  const dispatch = useTodosDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
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
        label="بحث عن مهمة"
        type="text"
        fullWidth
        variant="standard"
        value={searchTerm}
        onChange={(e) => {
          dispatch({
            type: "search",
            payload: {
              term: e.target.value,
              update: setSearchTerm(e.target.value),
            },
          });
        }}
      />
    </>
  );
}
