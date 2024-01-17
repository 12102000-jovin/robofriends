import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import { robots } from "../robots";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this useEffect runs only once after the component mounts

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        console.error("Error in response");
      }

      // Parse the JSON data from the response
      const result = await response.json();

      setUserData(result);
      setLoading(false);
    } catch {
      console.error("Error fetching data");
      setLoading(false);
    }
  };

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="tc">
      <h1> RoboFriends</h1>
      {loading ? (
        <p> Loading ... </p>
      ) : (
        <div>
          {userData.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      )}

      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  );
};

export default App;
