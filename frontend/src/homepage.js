import React from "react";

function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to the Airline Reservation System</h1>
      <p>Book your flights with us and explore the world!</p>
      <div className="search-form">
        <input type="text" placeholder="From" />
        <input type="text" placeholder="To" />
        <input type="date" />
        <button>Search</button>
      </div>
      <div className="featured-destinations">
        <h2>Featured Destinations</h2>
        <div className="destination">
          <img src="https://picsum.photos/300/200?random=1" alt="destination" />
          <h3>Paris</h3>
          <p>From $400</p>
        </div>
        <div className="destination">
          <img src="https://picsum.photos/300/200?random=2" alt="destination" />
          <h3>New York</h3>
          <p>From $500</p>
        </div>
        <div className="destination">
          <img src="https://picsum.photos/300/200?random=3" alt="destination" />
          <h3>Tokyo</h3>
          <p>From $600</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
