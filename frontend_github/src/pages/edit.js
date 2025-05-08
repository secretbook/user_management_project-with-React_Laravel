import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import http from '../http';
import Swal from 'sweetalert2'; // Import SweetAlert
import './form.css';

export default function Edit(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = () => {
        http.get('/users/' + id + '/edit').then((res) => {
            setInputs({
                name: res.data.result.name,
                email: res.data.result.email,
            });
        })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const submitForm = () => {
        // Basic Validation: Check if name and email are provided
        if (!inputs.name || !inputs.email) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill out all fields (name and email).',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // SweetAlert for confirmation before submitting
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to update this user.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform the API request to update the user
                http.put('/users/' + id, inputs).then((res) => {
                    Swal.fire({
                        title: 'Updated!',
                        text: 'User information has been updated successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate('/'); // Navigate to the home page after update
                }).catch((error) => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while updating the user.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            }
        });
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg rounded-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body p-4">
                    <h2 className="text-center mb-4 font-weight-bold text-primary">Edit User</h2>

                    {/* Name input */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label font-weight-semibold text-muted">Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg shadow-sm"
                            id="name"
                            name="name"
                            placeholder="Enter user name"
                            autoComplete="off"
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
                            autoComplete="off"
                            required
                            value={inputs.email || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Update button */}
                    <button type="button" className="btn btn-success w-100 shadow-sm hover-shadow-lg" onClick={submitForm}>
                        Update
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
