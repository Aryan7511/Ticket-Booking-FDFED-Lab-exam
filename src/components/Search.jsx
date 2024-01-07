import { React, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const alphabeticRegex = /^[A-Za-z]+$/;

const Search = () => {
  const user = useSelector((state) => state.user.user);
  const nameofPerson = user?.name;
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);

  const handleChangeSource = (e) => {
    setSource(e.target.value);
  };

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(source, destination);
    if (!alphabeticRegex.test(source) || !alphabeticRegex.test(destination)) {
      toast.error("Digits are not Allowed!");
    } else {
      try {
        const response = await fetch(`http://localhost:5500/trains`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);

        // Filter trains based on source and destination
        const filteredTrains = data.filter(
          (train) =>
            train.source.toLowerCase() === source.toLowerCase() &&
            train.destination.toLowerCase() === destination.toLowerCase()
        );
        console.log(filteredTrains);

        if (!filteredTrains) {
          throw new Error("No Trains Found!");
        }
        setTrains(filteredTrains);
      } catch (error) {
        toast.error(error.message, { duration: 1500 });
        console.log(error);
      }
    }
  };

  const handleBookNow = async (train) => {
    try {
      const response = await fetch(`http://localhost:5500/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameofPerson,
          TrainName: train.name,
          id: train.id,
          source: train.source,
          destination: train.destination,
        }),
        
      });
      if (response.ok) {
      toast.success(`Booked train with Name: ${train.name}`);
      }
    } catch (error) {
        toast.error(error.message, { duration: 1500 });
        console.log(error);
    }
  };

  return (
    <>
      <div className="mt-4 bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="mt-4 bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="source"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Source<div className="mt-8"></div>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="text"
                      id="source"
                      autoComplete="source"
                      required
                      value={source}
                      onChange={handleChangeSource}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Destination
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="text"
                      id="destination"
                      autoComplete="destination"
                      required
                      value={destination}
                      onChange={handleChangeDestination}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative mt-4 w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2D6F6D] hover:bg-[#389c98]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Display filtered trains */}
        {trains.length === 0 && (
          <h2 className="text-center">No Trains Found.</h2>
        )}
        <div className="mt-8">
          {trains.length > 0 && (
            <div className="space-y-4">
              {trains.map((train) => (
                <div
                  key={train.id}
                  className="bg-white p-4 shadow sm:rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{train.name}</h3>
                    <p>
                      Source: {train.source} | Destination: {train.destination}
                    </p>
                    <p>
                      Arrival Time: {train.ArrivalTime} | Reach Time:{" "}
                      {train.ReachTime}
                    </p>
                    <p>Total Time: {train.TotalTime}</p>
                    <p>Price: &#8377;{train.price}</p>
                  </div>
                  <button
                    onClick={() => handleBookNow(train)}
                    className="px-4 py-2 text-white bg-[#2D6F6D] hover:bg-[#389c98] rounded-md"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
