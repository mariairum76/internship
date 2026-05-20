type User = {
  id: number;
  name: string;
  age: number;
};

// Partial → all optional
type PartialUser = Partial<User>;

// Required → all required
type RequiredUser = Required<User>;

// Omit → remove field
type UserWithoutAge = Omit<User, "age">;

// Pick → select fields
type UserNameOnly = Pick<User, "name">;

// ReturnType
function getUser() {
  return { id: 1, name: "Ali", age: 20 };
}

type GetUserType = ReturnType<typeof getUser>;

// Parameters
function add(a: number, b: number) {
  return a + b;
}

type AddParams = Parameters<typeof add>;