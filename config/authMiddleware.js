// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    // Check if user session exists and is still valid
    if (req.session.user && req.session.cookie.expires > Date.now()) {
        return next(); // Session valid, proceed to the next middleware/route handler
    }

    // Destroy session and redirect to login if session expired or user not logged in
    req.session.destroy(() => {
        console.log('Session expired or user not logged in. Redirecting to login.');
        res.redirect('/auth/login');
    });
}

// Debugging log to check if middleware is imported correctly
console.log("isAuthenticated middleware loaded successfully.");

module.exports = { isAuthenticated };
