import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/TodosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Almarai"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            dir="rtl"
            className="App"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#333",
              minHeight: "100vh",
              boxSizing: "border-box",
            }}
          >
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
