import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function Toast({ open, message }) {
  return (
    <div dir="ltr">
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
