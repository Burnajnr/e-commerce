// JavaScript for managing user profile interactions and data
document.addEventListener('DOMContentLoaded', function() {
    const userProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 Main St, Anytown, USA',
        phone: '123-456-7890'
    };

    const profileContainer = document.getElementById('profile-container');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');

    function displayProfile() {
        profileContainer.innerHTML = `
            <h2>User Profile</h2>
            <p><strong>Name:</strong> <span id="user-name">${userProfile.name}</span></p>
            <p><strong>Email:</strong> <span id="user-email">${userProfile.email}</span></p>
            <p><strong>Address:</strong> <span id="user-address">${userProfile.address}</span></p>
            <p><strong>Phone:</strong> <span id="user-phone">${userProfile.phone}</span></p>
            <button id="edit-button">Edit</button>
        `;
    }

    function enableEditing() {
        profileContainer.innerHTML = `
            <h2>Edit Profile</h2>
            <label>Name: <input type="text" id="edit-name" value="${userProfile.name}"></label><br>
            <label>Email: <input type="email" id="edit-email" value="${userProfile.email}"></label><br>
            <label>Address: <input type="text" id="edit-address" value="${userProfile.address}"></label><br>
            <label>Phone: <input type="text" id="edit-phone" value="${userProfile.phone}"></label><br>
            <button id="save-button">Save</button>
            <button id="cancel-button">Cancel</button>
        `;
        attachEditEventListeners();
    }

    function attachEditEventListeners() {
        document.getElementById('save-button').addEventListener('click', saveProfile);
        document.getElementById('cancel-button').addEventListener('click', displayProfile);
    }

    function saveProfile() {
        userProfile.name = document.getElementById('edit-name').value;
        userProfile.email = document.getElementById('edit-email').value;
        userProfile.address = document.getElementById('edit-address').value;
        userProfile.phone = document.getElementById('edit-phone').value;
        displayProfile();
    }

    editButton.addEventListener('click', enableEditing);
    displayProfile();
});