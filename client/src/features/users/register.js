import React from "react";
import { Form, Button } from "react-bootstrap";
import "../../forms.css";

function register() {
  return (
    <div class="container min-vh-100 d-flex justify-content-center align-items-center">
      <Form className="form-Body">
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            textShadow: "1.5px 1.5px 1.5px black",
          }}
        >
          SIGN UP
        </h1>
        <Form.Group class="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Name" />
        </Form.Group>
        <Form.Group class="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group class="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="btn btn-success"
          type="submit"
          style={{ width: "100%" }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default register;
