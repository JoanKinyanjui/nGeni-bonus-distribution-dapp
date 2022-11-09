import * as React from "react";
import "../../styles/global.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const [username,setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onHandleEmailChange = (e) => {
    setUsername(e.target.value);
  };
  const onHandlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    console.log("input submitted");

    //Post data...
    let response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    let { msg, success } = await response.json();
    console.log({
      msg,
      success,
    });

    if (success) {
      // navigate to PayUp page
      navigate("/payup");
     
    } else {
      window.alert(msg);
    }

    console.log(username, password);
  };

  return (
    <>
      <form
        onSubmit={onHandleSubmit}
        container
        maxWidth="xl"
        className="bg-red-50 w-screen h-screen grid grid-cols-1  place-content-center space-y-6 md:space-y-10"
      >
        <p className="mx-auto text-black text-2xl md:text-3xl font-sans">
          LOGIN{" "}
        </p>
        <input
          className="py-4 px-8 w-1/2 md:w-1/4 mx-auto rounded-sm focus:outline-none "
          labelText="Email"
          // id="email"
          formControlProps={{
            fullWidth: true,
          }}
          type="text"
          name="username"
          // id ="email"
          value={username}
          onChange={onHandleEmailChange}
        />

        <input
          className="py-4 px-8 w-1/2 md:w-1/4 mx-auto rounded-sm focus:outline-none "
          labelText="Password"
          // id="password"
          formControlProps={{
            fullWidth: true,
          }}
          type="password"
          // id='password'
          name="password"
          value={password}
          onChange={onHandlePasswordChange}
        />

        <input
          type="submit"
          value="Login"
          class="
        py-2 px-8
        bg-red-500
        hover:bg-primary-darker
        rounded
        text-white 
        w-24
        md:w-36
        mx-auto
        whitespace-nowrap
        "
        />
        <label className="mx-auto text-red-500 ">
          <input
            type="checkbox"
            // checked={checked}
            // onChange={handleChange}
            className="mx-4"
          />
          Remember me
        </label>

        <p className="mx-auto text-red-500 text-base">
          No Account? <Link to="/signup">Create account</Link>
        </p>
      </form>
    </>
  );
};

export const Head = () => <title>Login Page</title>;

export default Login;
