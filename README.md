mutation {
  deleteUser(id: 1) {
    id
    name
    email
  }
}
mutation {
  updateUser(id: 1, name: "Updated Name") {
    id
    name
    email
  }
}
mutation {
  addUser(name: "John Doe", email: "john@example.com", password: "securepassword") {
    id
    name
    email
  }
}