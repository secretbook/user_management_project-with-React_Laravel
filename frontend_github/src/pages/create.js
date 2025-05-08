import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../http';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './form.css';


export default function Create() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const validateForm = () => {
        const { name, email, password } = inputs;

        // Validate Name (must be a string with letters only)
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(name)) {
            Swal.fire({
                title: 'Error!',
                text: 'Name must contain only letters and spaces.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }

        // Validate Email format (basic check for "@" and ".com")
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid email formate',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }

        // Validate Password (must be at least 8 characters and contain at least one letter, one number, and one special character)
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        if (!passwordPattern.test(password)) {
            Swal.fire({
                title: 'Error!',
                text: 'Password must be at least 8 characters with special characters',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }


        return true; // All validations passed
    };

    const submitForm = () => {

        // Validate form data before submitting
        if (!validateForm()) {
            return;
        }

        http.post('/users', inputs).then((res) => {
            Swal.fire({
                title: 'Success!',
                text: 'User created successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/'); // Redirect to home page after the alert is closed
            });
        }).catch((error) => {
            // Handle errors here if necessary
            console.error('Error creating user:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error creating the user.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg rounded-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body p-4">
                    <h2 className="text-center mb-4 font-weight-bold text-primary">Create New User</h2>

                    {/* Name input */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label font-weight-semibold text-muted">Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg shadow-sm"
                            id="name"
                            name="name"
                            placeholder="Enter user name"
                            autoComplete='off'
                            value={inputs.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email input */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label font-weight-semibold text-muted">Email</label>
                        <input
                            type="email"
                            className="form-control form-control-lg shadow-sm"
                            id="email"
                            name="email"
                            placeholder="Enter user email"
                            autoComplete='off'
                            required
                            value={inputs.email || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password input */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label font-weight-semibold text-muted">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg shadow-sm"
                            id="password"
                            name="password"
                            autoComplete='off'
                            placeholder="Enter user password"
                            required
                            value={inputs.password || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Create button */}
                    <button type="button" className="btn btn-lg btn-gradient-primary w-100 shadow-sm hover-shadow-lg" onClick={submitForm}>
                        Create Account
                    </button>

                    {/* Go back to home link */}
                    <p className="mt-3 text-center">
                        <a href="/" className="text-decoration-none text-muted link-back">
                            <i className="bi bi-arrow-left-circle me-2"></i> Go back to home
                        </a>
                    </p>

                </div>
            </div>
        </div>
    )
}
