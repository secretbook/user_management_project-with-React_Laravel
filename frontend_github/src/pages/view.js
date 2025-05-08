import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http'; // Assuming you have an http client configured
import Swal from 'sweetalert2';
import './form.css'; // Assuming you already have the CSS file to style

export default function View() {
    const [inputs, setInputs] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = () => {
        http.get('/users/' + id).then((res) => {
            // Check if response data exists and is valid
            if (res.data.result.name && res.data.result.email) {
                setInputs({
                    name: res.data.result.name,
                    email: res.data.result.email,
                });
            } else {
                // If no user data is found or the response is malformed
                Swal.fire({
                    title: 'Error!',
                    text: 'User not found or empty data returned.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }).catch((error) => {
            console.error("Error fetching user:", error); // Log any errors
            Swal.fire({
                title: 'Error!',
                text: 'User not found or API error.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };

    return (
        <div className="view-page-container">
            <div className="content">
                <div className="container mt-5 d-flex justify-content-center">
                    <div className="card shadow-lg rounded-lg" style={{ maxWidth: '500px', width: '100%' }}>
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4 font-weight-bold text-primary">View User</h2>

                            <div className="mb-4">
                                <h5 className="text-muted">Name</h5>
                                <p className="font-weight-bold">{inputs.name || 'N/A'}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="text-muted">Email</h5>
                                <p className="font-weight-bold">{inputs.email || 'N/A'}</p>
                            </div>

                            <div className="text-center mt-4">
                                <a href="/" className="btn btn-link text-muted link-back">
                                    <i className="bi bi-arrow-left-circle me-2"></i> Go back to home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
