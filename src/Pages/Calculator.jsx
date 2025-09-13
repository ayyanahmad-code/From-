import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import navigate hook

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate(); // 👈 init navigate

  const calculate = (op) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult("Enter valid numbers");
      return;
    }

    switch (op) {
      case "+":
        setResult(a + b);
        break;
      case "-":
        setResult(a - b);
        break;
      case "*":
        setResult(a * b);
        break;
      case "/":
        setResult(b !== 0 ? a / b : "Cannot divide by zero");
        break;
      default:
        setResult("Invalid operation");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Calculat your age</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
        className="border p-2 rounded mb-4 w-64"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
        className="border p-2 rounded mb-4 w-64"
      />

      <div className="flex gap-4 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => calculate("+")}
        >
          +
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => calculate("-")}
        >
          -
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => calculate("*")}
        >
          *
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => calculate("/")}
        >
          /
        </button>
      </div>

      {result !== null && (
        <div className="text-xl font-semibold mb-6">Result: {result}</div>
      )}

      {/* 👇 Button to go back to Login page */}
      <button
        onClick={() => navigate("/Login")}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Go to Login
      </button> <br></br>

      <button
        onClick={() => navigate("/Tabel")}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Go to Tabel
      </button>
    </div>
  );
}

