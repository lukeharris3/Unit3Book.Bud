import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="formContentWrapper">
      <div className="formWrapper">
        <h1>Well, hello there!</h1>
        <h3>Create an account to check out books from our library.</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>
            First name:
            <input type="text" name="firstname" value={form.firstname} onChange={handleChange} />
          </label>
          <label>
            Last name:
            <input type="text" name="lastname" value={form.lastname} onChange={handleChange} />
          </label>
          <label>
            Email address:
            <input type="text" name="email" value={form.email} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={form.password} onChange={handleChange} />
          </label>
          <input type="submit" value="Create account" className="border_button" />
        </form>
      </div>
    </div>
  );
}

export default Register;
