import { getUserRole } from "./fakeAuthorizationService";
import { getEmployee } from "./fakeEmployeeService";

const users = [
  {
    employee_id: 1,
    userName: "Admin",
    password: "1111",
  },
  {
    employee_id: 1,
    userName: "Somesh",
    password: "1111",
  },
  {
    employee_id: 2,
    userName: "Hirushi",
    password: "2222",
  },
  {
    employee_id: 3,
    userName: "Dinithi",
    password: "3333",
  },
  {
    employee_id: 5,
    userName: "Guest",
    password: "4444",
  },
];

// if user is authenticated, return user object
export function authenticate({ userName, password }) {
  const isAuthenticated = users.find(
    (c) => c.userName === userName && c.password === password
  );
  const user = isAuthenticated
    ? getEmployee(isAuthenticated.employee_id)
    : null;
  return user ? { ...user, userRole: getUserRole(user.userRole_id) } : null;
}
