// import React, { useState } from "react";
// import { Input, Button } from "@material-tailwind/react";

// export default function FormComponent() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Username: ${username}\nPassword: ${password}`);
//   };

//   return (
//     <div className="flex flex-col bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//       <h2 className="text-2xl font-bold mb-4">Sign In</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <Input
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <Input
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button type="submit" color="blue">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// }
