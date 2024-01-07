import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const TrainBook = () => {
  const user = useSelector((state) => state.user.user);
  const userName = user?.name;
  const [tickets, setTickets] = useState([]);
  console.log(tickets);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const url = "http://localhost:5500/tickets"; 
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        // Filter tickets where the name matches the user's name
        const userTickets = data.filter((ticket) => ticket.name === userName);
        setTickets(userTickets);
      } catch (error) {
        toast.error(error.message, { duration: 1500 });
        console.log("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, [userName]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Booked Tickets</h1>
      {tickets.length === 0 && (
        <p className="text-gray-600">No tickets found for {userName}.</p>
      )}
      {tickets.length > 0 && (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-4 shadow sm:rounded-lg flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{ticket.TrainName}</h3>
                <p>
                  Source: {ticket.source} | Destination: {ticket.destination}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainBook;
