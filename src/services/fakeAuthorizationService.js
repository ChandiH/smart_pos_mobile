/* should use a enum for this
const accessLevels = [
  // employee management access levels
  "employee",
  "addEmployee",
  // inventory management access levels
  "inventory",
  "productForm",
  "stockUpdateForm",
  "productCatalog",
  // customer management access levels
  "customerForm",
  "customers",
  "report",
];*/

const userRoles = [
  {
    userRole_id: 101,
    name: "Owner",
    access: [
      "employee",
      "inventory",
      "customers",
      "customerForm",
      "report",
      "productCatalog",
      "productForm",
      "stockUpdateForm",
    ],
    description:
      "The owner role has full control and authority over the business or organization. Owners make critical decisions and have access to all resources.",
  },
  {
    userRole_id: 102,
    name: "Manager",
    access: ["employee", "inventory", "customer", "productCatalog"],
    description:
      "Managers are responsible for overseeing daily operations and supervising staff. They have access to most resources and can make important decisions within their department.",
  },
  {
    userRole_id: 103,
    name: "Cashier",
    access: ["customer", "productCatalog"],
    description:
      "Cashiers handle customer transactions, manage the cash register, and provide customer service. They have limited access to administrative functions.",
  },
  {
    userRole_id: 104,
    name: "Sales Associate",
    access: ["report", "productCatalog"],
    description:
      "Sales associates assist customers, promote products, and process sales. They have limited access to administrative functions and focus on sales-related tasks.",
  },
  {
    userRole_id: 105,
    name: "Guest",
    access: ["productCatalog"],
    description:
      "Guests are customers or visitors who do not have any administrative privileges. They can browse products or services but cannot access the system's internal functions.",
  },
];

export function getUserRoles() {
  return userRoles.filter((u) => u);
}

export function getUserRole(id) {
  return userRoles.find((u) => u.userRole_id === id);
}

export function checkAccess(userRole_id, accessLevel) {
  const userRole = getUserRole(userRole_id);
  return userRole.access.includes(accessLevel);
}
