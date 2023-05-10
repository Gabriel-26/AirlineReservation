import { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./login";

export function BookFlight() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/flights");
      setFlights(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = (username, password) => {
    axios
      .post("http://127.0.0.1:8000/api/login", { username, password })
      .then((response) => {
        setIsLoggedIn(true);
        setCurrentUser(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleFlightBooking = async (
    flightNum,
    fromAndTo,
    departure,
    arrival,
    price
  ) => {
    const booking = {
      flightNum: flightNum,
      fromAndTo: fromAndTo,
      departure: departure,
      arrival: arrival,
      price: price,
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/flights,${currentUser.username}`,
        booking
      );
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewBookings = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/login,${currentUser.username}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {isLoggedIn ? (
        <>
          <p>Welcome, {currentUser.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          <FlightList flights={flights} onFlightBooking={handleFlightBooking} />
          <button onClick={handleViewBookings}>View Bookings</button>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

// eslint-disable-next-line
function FlightList({ flights, onFlightBooking }) {
  const [bookingType, setBookingType] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState(1);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [returnDate, setReturnDate] = useState("");

  const handleBookingTypeChange = (event) => {
    setBookingType(parseInt(event.target.value));
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
  };

  const handleReturnFlightSelect = (flight) => {
    setSelectedReturnFlight(flight);
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleBookingSubmit = () => {
    onFlightBooking(
      selectedFlight,
      bookingType,
      returnDate,
      selectedReturnFlight
    );
    setSelectedFlight(null);
    setSelectedReturnFlight(null);
    setReturnDate("");
  };

  return (
    <div>
      <h2>Flight List</h2>
      <div>
        <label>
          <input
            type="radio"
            name="booking-type"
            value={1}
            checked={bookingType === 1}
            onChange={handleBookingTypeChange}
          />
          One-way
        </label>
        <label>
          <input
            type="radio"
            name="booking-type"
            value={2}
            checked={bookingType === 2}
            onChange={handleBookingTypeChange}
          />
          Return
        </label>
      </div>
      <ul>
        {flights.map((flight) => (
          <FlightItem
            key={flight.id}
            flight={flight}
            onFlightSelect={handleFlightSelect}
            selectedFlight={selectedFlight}
          />
        ))}
      </ul>
      {bookingType === 2 && (
        <>
          <h3>Return Flight</h3>
          <ul>
            {flights.map((flight) => (
              <FlightItem
                key={flight.id}
                flight={flight}
                onFlightSelect={handleReturnFlightSelect}
                selectedFlight={selectedReturnFlight}
              />
            ))}
          </ul>
          <label>
            Return Date:
            <input
              type="date"
              value={returnDate}
              onChange={handleReturnDateChange}
            />
          </label>
        </>
      )}
      <button
        onClick={handleBookingSubmit}
        disabled={
          !selectedFlight ||
          (bookingType === 2 && (!selectedReturnFlight || !returnDate))
        }
      >
        Book Flight
      </button>
    </div>
  );
}

function FlightItem({ flight, onFlightSelect, selectedFlight }) {
  const handleFlightSelect = () => {
    onFlightSelect(flight);
  };

  return (
    <li
      onClick={handleFlightSelect}
      style={{
        backgroundColor: selectedFlight === flight ? "yellow" : "white",
      }}
    >
      {flight.origin} to {flight.destination} ({flight.date})
    </li>
  );
}

export default FlightList;
