import { useState, useEffect } from 'react';
import http from '../http';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert2 for confirmation dialog
import './home.css';

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = () => {
        http.get('/users')
            .then((res) => {
                if (res.data && Array.isArray(res.data.result)) {
                    setUsers(res.data.result);
                } else {
                    console.error('Unexpected data format:', res.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    };

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                http.delete(`/users/${id}`).then((res) => {
                    Swal.fire(
                        'Deleted!',
                        'The user has been deleted.',
                        'success'
                    );
                    fetchAllUsers(); // Refresh the users list
                }).catch((error) => {
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the user.',
                        'error'
                    );
                    console.error('Error deleting user:', error);
                });
            }
        });
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center text-primary">Users List</h1>
            <div className="d-flex justify-content-between mb-3">
                <Link className="btn btn-success btn-lg shadow" to="/create">
                    <i className="bi bi-plus-circle me-2"></i> Add New User
                </Link>
            </div>
            <div className="card shadow-lg">
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="hover-row">
                                    <td>{++index}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className="btn btn-warning btn-sm mx-2 shadow" to={`/edit/${user.id}`}>
                                            <i className="bi bi-pencil-square me-1"></i> Edit
                                        </Link>
                                        <Link className="btn btn-info btn-sm mx-2 shadow" to={`/view/${user.id}`}>
                                            <i className="bi bi-eye me-1"></i> View
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm mx-2 shadow"
                                            onClick={() => { deleteUser(user.id) }}
                                        >
                                            <i className="bi bi-trash me-1"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
