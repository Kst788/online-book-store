const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../config/authMiddleware'); // Import only once

// Home route (only accessible by logged-in users)
router.get('/home', isAuthenticated, (req, res) => {
    console.log('Session user:', req.session?.user);  // Avoid crashes if session is undefined
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.render('home', { user: req.session?.user || null });  // Ensure 'user' is passed
});

// Logout route
router.get('/logout', (req, res) => {
    req.session?.destroy(() => {  
        res.redirect('/auth/login'); 
    });
});

module.exports = router;
