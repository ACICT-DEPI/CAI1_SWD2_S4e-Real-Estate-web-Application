import React from 'react';

const LogoutConfirmationModal = ({ onConfirm, onCancel }) => {
    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };

    const modalContentStyle = {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const buttonStyle = {
        color: 'white',
        marginTop: '10px',
        margin: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: 'gray',
        borderRadius: '5px'
    };

    const logoutButtonStyle = {
        color: 'white',
        margin: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: 'rgb(87, 87, 249)',
        borderRadius: '5px'
    };

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <button style={logoutButtonStyle} onClick={onConfirm}>Yes, Logout</button>
                <button style={buttonStyle} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default LogoutConfirmationModal;
