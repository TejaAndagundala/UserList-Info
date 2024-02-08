import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pastSearchTerms, setPastSearchTerms] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (
      term.length > 1 &&
      !pastSearchTerms.includes(term) &&
      isFullName(term)
    ) {
      setPastSearchTerms([...pastSearchTerms, term]);
    }
  };

  const isFullName = (str) => {
    return str.trim().split(" ").length > 1;
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleSortByName}>Sort by Name</button>
      <div className="past-search-terms">
        <h2>Past Search Terms</h2>
        <ul>
          {pastSearchTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
      <div className="user-list">
        <h2>User Information</h2>
        <ul>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
