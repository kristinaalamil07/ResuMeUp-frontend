// src/lib/users.js
// Instead of an array, we'll fetch users from localStorage or default to sample users
export function getUsers() {
  const savedUsers = JSON.parse(localStorage.getItem("users"));
  if (savedUsers) return savedUsers;

  // Default sample users
  const defaultUsers = [
    { name: "Admin User", email: "admin@example.com", password: "admin123", isAdmin: true },
    { name: "Kristina Alamil", email: "kristina@example.com", password: "password123", isAdmin: false },
  ];

  localStorage.setItem("users", JSON.stringify(defaultUsers));
  return defaultUsers;
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
