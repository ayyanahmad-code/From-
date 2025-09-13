import React, { useState } from "react";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; // 👈 import

export default function PracticeForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [option, setOption] = useState("");

  const navigate = useNavigate(); // 👈 hook for navigation

  // State → City mapping
  const cityOptions = {
    Delhi: ["Connaught Place", "Dwarka", "Saket"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur","Amravati"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`
      First Name: ${firstName}
      Last Name: ${lastName}
      State: ${state}
      City: ${city}
      Option: ${option}
    `);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Form
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* First Name */}
          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-gray-50 border border-gray-400 border-t-4 border-t-gray-800 rounded-lg"
          />

          {/* Last Name */}
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-gray-50 border border-gray-400 border-t-4 border-t-gray-800 rounded-lg"
          />

          {/* State Select */}
          <Select label="Select State" value={state} onChange={(val) => setState(val)}>
            {Object.keys(cityOptions).map((st) => (
              <Option key={st} value={st}>
                {st}
              </Option>
            ))}
          </Select>

          {/* City Select - depends on state */}
          {state && (
            <Select label="Select City" value={city} onChange={(val) => setCity(val)}>
              {cityOptions[state].map((ct) => (
                <Option key={ct} value={ct}>
                  {ct}
                </Option>
              ))}
            </Select>
          )}

          {/* Conditional Option */}
          <Select
            label="Choose Option"
            value={option}
            onChange={(val) => setOption(val)}
          >
            <Option value="show">Show Extra Field</Option>
            <Option value="hide">Hide Extra Field</Option>
          </Select>

          {/* Extra field */}
          {option === "show" && (
            <Input
              label="Extra Information"
              placeholder="Enter details..."
              className="bg-gray-50 border border-gray-400 border-t-4 border-t-gray-600 rounded-lg"
            />
          )}

          {/* Submit */}
          <Button type="submit" color="blue" className="mt-4">
            Submit
          </Button>

          {/* Navigate to Calculator */}
          <Button
            color="green"
            className="mt-2"
            onClick={() => navigate("/calculator")} // 👈 route to calculator
          >
            Go to Calculator
          </Button> 
          <Button
            color="green"
            className="mt-2"
            onClick={() => navigate("/Tabel")} // 👈 route to calculator
          >
            Go to Tabel
          </Button>
        </form>
      </div>
    </div>
  );
}
