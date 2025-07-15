import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "مهمة 1",
    description: "تفاصيل مهمة 1",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "مهمة 2",
    description: "تفاصيل مهمة 2",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "مهمة 3",
    description: "تفاصيل مهمة 3",
    isCompleted: false,
  },
];

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      if (action.payload.title !== "") {
        const newTodo = {
          id: uuidv4(),
          title: action.payload.title,
          description: action.payload.description,
          isCompleted: false,
        };

        const updatedTodos = [newTodo, ...currentTodos];

        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        return updatedTodos;
      }
      break;
    }

    case "deleted": {
      const deleteTodo = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });

      localStorage.setItem("todos", JSON.stringify(deleteTodo));

      return deleteTodo;
    }

    case "edited": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            description: action.payload.description,
          };
        } else {
          return t;
        }
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "get": {
      const storageTodos =
        JSON.parse(localStorage.getItem("todos")) || initialTodos;
      return storageTodos;
    }

    case "toggledCompleted": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          const updatedTodo = { ...t, isCompleted: !t.isCompleted };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "search": {
      const todos = JSON.parse(localStorage.getItem("todos"));
      if (action.payload.term === "") {
        return todos;
      }
      const searchTodo = todos.filter((t) => {
        if (
          t.title.toLowerCase().includes(action.payload.term.toLowerCase()) &&
          action.payload.term !== ""
        ) {
          return t;
        }
      });
      if (searchTodo.length > 0) {
        return searchTodo;
      }
      break;
    }

    default: {
      throw Error("Unknown Actioon" + action.type);
    }
  }
  return [];
}
