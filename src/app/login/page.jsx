"use client";
import React from 'react'
import { signIn, useSession } from "next-auth/react"
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

function Login() {
    const session = useSession();
    console.log(session);

    if (session.status == "loading")
        return <p>Loading...</p>

    if (session.status == "authenticated")
        return <p>user authenticated</p>

    return (
        <Container className='p-5'>
            <Form>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm={{ offset: 1, span: 9 }}>
                        <Form.Control />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm={{ offset: 1, span: 9 }}>
                        <Form.Control type="password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} sm="4" className='mb-3 justify-content-center'>
                    <Button variant='success'>Log In</Button>
                </Form.Group>
                <Form.Group as={Row} sm="3" className='mb-3 justify-content-center'>
                    <Button variant='danger' onClick={() => signIn("google")}>Login with google</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Login