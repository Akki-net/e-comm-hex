"use client";
import { useEffect, useReducer, useState } from 'react'
import { signIn, useSession } from "next-auth/react"
import { Form, Row, Col, Button, Container, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

function Login() {
    const router = useRouter();
    const [state, dispatch] = useReducer(formReducer, { email: '', password: '' })
    const [err, setErr] = useState(null);
    const session = useSession();

    console.log('session', session)

    useEffect(() => {
        if (session.status == "authenticated") {
            router.push('/')
            return
        }
    }, [session])

    if (session.status == "loading")
        return <p>Loading...</p>

    const loginHandler = async () => {
        if (!state.email || !state.password) {
            setErr('Credentials missing')
            setTimeout(() => setErr(null), 5000)
            return
        }

        const resp = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(state)
        })

        if (resp.statusText == "OK") {
            router.push('/');
            return
        }

        if (resp.status != 200) {
            const { error } = await resp.json()
            setErr(error)
            setTimeout(() => setErr(null), 5000)
        }
    }

    return (
        <Container className='p-5'>
            {err && <Alert variant='danger' onClose={() => setErr(null)} dismissible>{err}</Alert>}
            <Form>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm={{ offset: 1, span: 9 }}>
                        <Form.Control value={state.email} onChange={e => dispatch({
                            type: 'email',
                            payload: e.target.value.trim()
                        })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm={{ offset: 1, span: 9 }}>
                        <Form.Control value={state.password} type="password"
                            onChange={e => dispatch({
                                type: 'password',
                                payload: e.target.value.trim()
                            })}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} sm="4" className='mb-3 justify-content-center'>
                    <Button variant='success' onClick={() => loginHandler()}>Log In</Button>
                </Form.Group>
                <Form.Group as={Row} className='mb-3 justify-content-between'>
                    <Col sm="5">
                        <Button variant='danger' onClick={() => signIn("google")}>Login with google</Button>
                    </Col>
                    <Col sm="2">
                        <Button variant='info'>SignUp</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

const formReducer = (state, action) => {
    switch (action.type) {
        case "email":
            return { ...state, email: action.payload }
        case "password":
            return { ...state, password: action.payload }
        default:
            return state
    }
}

export default Login