import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../../forms.css";

export default function NewUserForm() {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewUser({ name, email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    }
  }, [isSuccess, navigate]);
  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <Form className="form-Body" onSubmit={handleSubmit}>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              textShadow: "1.5px 1.5px 1.5px black",
            }}
          >
            SIGN UP
          </h1>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={onNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
            />
          </Form.Group>
          {isError ? <p style={{ color: "red" }}>{error?.data}</p> : null}
          <Button
            variant="btn btn-success"
            type="submit"
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
