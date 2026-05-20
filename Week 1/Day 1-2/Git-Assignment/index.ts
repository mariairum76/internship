// TYPE ALIAS
type ID = string | number;

type UserType = {
  id: ID;
  name: string;
  age: number;
};

// INTERFACE
interface User {
  id: ID;
  name: string;
  age: number;
}

// STRUCTURAL TYPING
const obj = {
  id: 1,
  name: "Ali",
  age: 20,
  extra: "ignored"
};

const user: User = obj; 