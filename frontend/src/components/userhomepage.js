import { useState, useEffect } from "react";
import axios from "axios";

function UserHomePage() {
  const [flightType, setFlightType] = useState("round-trip");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookedFlights, setBookedFlights] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const flightDetails = {
      flightType,
      destination,
      departureDate,
      returnDate,
      totalAmount,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/flights",
        flightDetails,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        console.log("Flight booked successfully");
        // Add code to display a success message
      } else {
        console.log("Flight booking failed");
        // Add code to display an error message
      }
    } catch (error) {
      console.log("Flight booking failed:", error);
      // Add code to display an error message
    }
  };

  const handleFlightTypeChange = (event) => {
    setFlightType(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleCalculateTotalAmount = () => {
    const basePrice = 100; // Base price for one-way flight
    const roundTripDiscount = 0.2; // 20% discount for round-trip flights
    const currentDate = new Date();
    const departureDateTime = new Date(departureDate);
    const returnDateTime = new Date(returnDate);

    // Calculate price based on flight type and dates
    let price = 0;
    if (flightType === "one-way") {
      price = basePrice;
      if (departureDateTime < currentDate) {
        // Price is 50% more for a past departure date
        price *= 1.5;
      }
    } else if (flightType === "round-trip") {
      price = basePrice * 2;
      if (returnDateTime < departureDateTime) {
        // Price is 50% more for a return date before departure date
        price *= 1.5;
      }
      if (departureDateTime < currentDate || returnDateTime < currentDate) {
        // Price is 50% more for past departure or return date
        price *= 1.5;
      }
      if (returnDateTime.getDate() === departureDateTime.getDate()) {
        // Price is 10% less for same-day return
        price *= 0.9;
      }
      // Apply round-trip discount
      price *= 1 - roundTripDiscount;
    }

    // Round to two decimal places
    return parseFloat(price.toFixed(2));
  };

  useEffect(() => {
    const fetchBookedFlights = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/bookedflight"
        );
        setBookedFlights(response.data);
      } catch (error) {
        console.log("Error fetching booked flights:", error);
      }
    };
    fetchBookedFlights();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="flight-type">Flight Type:</label>
          <select
            id="flight-type"
            value={flightType}
            onChange={handleFlightTypeChange}
          >
            <option value="round-trip">Round-Trip</option>
            <option value="one-way">One-Way</option>
          </select>
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={handleDestinationChange}
          />
        </div>
        <div>
          <label htmlFor="departure-date">Departure Date:</label>
          <input
            id="departure-date"
            type="date"
            value={departureDate}
            onChange={handleDepartureDateChange}
          />
        </div>
        {flightType === "round-trip" && (
          <div>
            <label htmlFor="return-date">Return Date:</label>
            <input
              id="return-date"
              type="date"
              value={returnDate}
              onChange={handleReturnDateChange}
            />
          </div>
        )}
        <div>
          <button type="button" onClick={handleCalculateTotalAmount}>
            Calculate Total Amount
          </button>
        </div>
        <div>
          <label htmlFor="total-amount">Total Amount:</label>
          <input id="total-amount" type="text" value={totalAmount} readOnly />
        </div>
        <div>
          <button type="submit">Book Flight</button>
        </div>
      </form>
      <div>
        <h1>Booked Flights</h1>
        <ul>
          {bookedFlights.map((flight) => (
            <li key={flight.id}>
              <p>Flight Type: {flight.flightType}</p>
              <p>Destination: {flight.destination}</p>
              <p>Departure Date: {flight.departureDate}</p>
              {flight.flightType === "round-trip" && (
                <p>Return Date: {flight.returnDate}</p>
              )}
              <p>Total Amount: {flight.totalAmount}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserHomePage;
