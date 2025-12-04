// Firebase Configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
    apiKey: "AIzaSyCWILrDxT_u9Ak6DKfgnfUrV2Ugzqz8_d4",
    authDomain: "signaturepro-group60.firebaseapp.com",
    projectId: "signaturepro-group60",
    storageBucket: "signaturepro-group60.firebasestorage.app",
    messagingSenderId: "91815405270",
    appId: "1:91815405270:web:7761681fda89992f7e4b77"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Current user state
let currentUser = null;

// Check authentication state on load
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        updateUIForLoggedInUser(user);
    } else {
        currentUser = null;
        updateUIForLoggedOutUser();
    }
});

// Update UI for logged-in user
function updateUIForLoggedInUser(user) {
    document.getElementById('navButtons').style.display = 'none';
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('userEmail').textContent = user.email;
    
    // Pre-fill email in signature builder
    document.getElementById('email').value = user.email;
    if (user.displayName) {
        document.getElementById('fullName').value = user.displayName;
    }
    updatePreview();
}

// Update UI for logged-out user
function updateUIForLoggedOutUser() {
    document.getElementById('navButtons').style.display = 'block';
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('builderSection').style.display = 'none';
    document.getElementById('heroSection').style.display = 'block';
    document.getElementById('featuresSection').style.display = 'grid';
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchModal(closeModalId, openModalId) {
    closeModal(closeModalId);
    openModal(openModalId);
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showToast('Login successful! Welcome back!');
            closeModal('loginModal');
        })
        .catch((error) => {
            showToast('Error: ' + error.message, 'error');
        });
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Update profile with name
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            showToast('Account created successfully!');
            closeModal('signupModal');
        })
        .catch((error) => {
            showToast('Error: ' + error.message, 'error');
        });
}

// Google Sign In
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            showToast('Signed in with Google successfully!');
            closeModal('loginModal');
            closeModal('signupModal');
        })
        .catch((error) => {
            showToast('Error: ' + error.message, 'error');
        });
}

// Logout
function logout() {
    auth.signOut()
        .then(() => {
            showToast('Logged out successfully!');
        })
        .catch((error) => {
            showToast('Error: ' + error.message, 'error');
        });
}

// Check authentication before creating signature
function checkAuthAndCreate() {
    if (currentUser) {
        document.getElementById('heroSection').style.display = 'none';
        document.getElementById('featuresSection').style.display = 'none';
        document.getElementById('builderSection').style.display = 'block';
        updatePreview();
    } else {
        showToast('Please login to create your signature!', 'warning');
        openModal('loginModal');
    }
}

// Update signature preview
function updatePreview() {
    const template = document.getElementById('template').value;
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const jobTitle = document.getElementById('jobTitle').value || 'Your Job Title';
    const companyName = document.getElementById('companyName').value || 'Your Company';
    const email = document.getElementById('email').value || 'your.email@company.com';
    const phone = document.getElementById('phone').value || '+1 (555) 123-4567';
    const website = document.getElementById('website').value || 'www.company.com';
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const primaryColor = document.getElementById('primaryColor').value;

    let signatureHTML = '';

    if (template === 'modern') {
        signatureHTML = `
            <div class="signature-modern" style="font-family: Arial, sans-serif; max-width: 500px;">
                <div style="border-left: 4px solid ${primaryColor}; padding-left: 15px;">
                    <div style="font-size: 1.3rem; font-weight: bold; color: ${primaryColor};">${fullName}</div>
                    <div style="font-size: 1rem; color: #666; margin: 5px 0;">${jobTitle}</div>
                    <div style="font-size: 1.1rem; font-weight: 600; color: #333; margin: 10px 0;">${companyName}</div>
                    <div style="font-size: 0.9rem; color: #555; line-height: 1.8;">
                        📧 <a href="mailto:${email}" style="color: #333; text-decoration: none;">${email}</a><br>
                        📱 ${phone}<br>
                        🌐 <a href="http://${website}" style="color: ${primaryColor}; text-decoration: none;">${website}</a>
                    </div>
                    ${linkedin || twitter ? `<div style="margin-top: 15px;">
                        ${linkedin ? `<a href="${linkedin}" style="color: ${primaryColor}; text-decoration: none; margin-right: 15px;">LinkedIn</a>` : ''}
                        ${twitter ? `<a href="https://twitter.com/${twitter.replace('@', '')}" style="color: ${primaryColor}; text-decoration: none;">Twitter</a>` : ''}
                    </div>` : ''}
                </div>
            </div>
        `;
    } else if (template === 'classic') {
        signatureHTML = `
            <div class="signature-classic" style="font-family: Georgia, serif; max-width: 500px; border: 2px solid ${primaryColor}; padding: 20px;">
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: ${primaryColor}; margin-bottom: 5px;">${fullName}</div>
                    <div style="font-size: 1rem; font-style: italic; color: #666; margin-bottom: 10px;">${jobTitle}</div>
                    <div style="font-size: 1.1rem; font-weight: 600; color: #333; margin-bottom: 15px;">${companyName}</div>
                    <div style="border-top: 1px solid #ddd; padding-top: 15px; font-size: 0.9rem; color: #555;">
                        ${email} | ${phone}<br>
                        ${website}
                        ${linkedin || twitter ? `<div style="margin-top: 10px;">
                            ${linkedin ? `<a href="${linkedin}" style="color: ${primaryColor};">LinkedIn</a>` : ''}
                            ${twitter ? ` | <a href="https://twitter.com/${twitter.replace('@', '')}" style="color: ${primaryColor};">Twitter</a>` : ''}
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `;
    } else if (template === 'minimal') {
        signatureHTML = `
            <div class="signature-minimal" style="font-family: Helvetica, sans-serif; max-width: 500px;">
                <div style="font-size: 1.2rem; font-weight: bold; color: #333;">${fullName}</div>
                <div style="font-size: 0.95rem; color: #666; margin: 3px 0;">${jobTitle} at ${companyName}</div>
                <div style="font-size: 0.9rem; color: #555; margin-top: 10px;">
                    ${email} • ${phone} • ${website}
                </div>
                ${linkedin || twitter ? `<div style="margin-top: 10px; font-size: 0.85rem;">
                    ${linkedin ? `<a href="${linkedin}" style="color: ${primaryColor}; text-decoration: none;">LinkedIn</a>` : ''}
                    ${linkedin && twitter ? ' • ' : ''}
                    ${twitter ? `<a href="https://twitter.com/${twitter.replace('@', '')}" style="color: ${primaryColor}; text-decoration: none;">Twitter</a>` : ''}
                </div>` : ''}
            </div>
        `;
    }

    document.getElementById('signaturePreview').innerHTML = signatureHTML;
}

// Copy signature to clipboard
function copySignature() {
    const signatureHTML = document.getElementById('signaturePreview').innerHTML;
    
    // Create a temporary textarea to copy HTML
    const textarea = document.createElement('textarea');
    textarea.value = signatureHTML;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('Signature HTML copied to clipboard!');
    } catch (err) {
        showToast('Failed to copy. Please try again.', 'error');
    }
    
    document.body.removeChild(textarea);
}

// Download signature as HTML file
function downloadSignature() {
    const signatureHTML = document.getElementById('signaturePreview').innerHTML;
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Signature</title>
</head>
<body>
    ${signatureHTML}
</body>
</html>
    `;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-signature.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Signature downloaded successfully!');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.background = type === 'error' ? '#ff4757' : type === 'warning' ? '#ffa502' : '#2ed573';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}