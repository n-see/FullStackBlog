import { useState } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { createAccount } from "../Services/DataService"
import { useNavigate } from "react-router-dom"


const CreateAccount = () => {

    let navigate = useNavigate();
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    
    //Function or method to handle user

    const handleUser = (e) => {
        setUsername(e.target.value);
    }
    //Function or method to handle our password

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    //Function or method to handle our submit
    const handleSubmit = () => {
        let userData = {
            Username: Username,
            Password: Password
        }
        createAccount(userData);
        navigate("/Login")
        console.log(userData)
        
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="form-container d-flex justify-content-center">
                        {/* <h1>Account Page</h1> */}

                        <Form>
                            <Form.Group className="mb-3" controlId="Username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" onChange={handleUser}/>
                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else, unless we are paid a substantial amount of money to sell your data.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"  onChange={handlePassword}/>
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CreateAccount