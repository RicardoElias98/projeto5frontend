import "./MyForm.css";
import { useState } from "react";
function MyForm() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);

    setName("");
    setEmail("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onChange={handleName}
            value={name || ""}
          />
        </div>
        <label>
          <span> Email: </span>
          <input
            type="text"
            name="email"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default MyForm;
