const express = require('express');
const axios = require('axios');
const router = express.Router();

router.route('/discord').get(async (req,res)=>{
    if (!req.cookies.access_token){
        return res.status(403).json({msg: "Unauthorized"});
    } 
    try {
        const response = await axios.get('http://discordapp.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${req.cookies.access_token}`
            }
        });
    
        if (response.status == 200){
            return res.status(200).json(response.data);
        } else {
            return res.status(404).json({msg: "Request Error"});
        }
    } catch (e) {
        console.log(e);
    }
});

router.route('/login').get(async (req,res)=>{
    console.log(req.cookies.access_token);
    if (!req.cookies.access_token){
        res.redirect(process.env.REDIRECT_URI);
    } else {
        res.redirect('http://localhost:3000/dashboard');
    }
});

router.route('/login/callback').get(async (req,res)=>{
    try {
        if (req.query.error){
            return res.redirect('http://localhost:3000/');
        }

        if (!req.query.code) {
            return res.status(403).json({msg: "Error no code"});
        }

        const code = req.query.code;
        
        const response = await axios.post(
          `https://discordapp.com/api/oauth2/token`,       
          `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials&code=${code}&redirect_uri=${process.env.REDIRECT_URI}&scope=identify%20email%20gdm.join`
        )

        res.cookie('access_token', response.data.access_token, { httpOnly: true });
        res.redirect('http://localhost:3000/dashboard');
    } catch (e) {
        console.log(e);
    }
    
});

router.route('/logout').post(async (req,res)=>{
    res.clearCookie('access_token');
    res.status(200).json({msg: "Logout Success"});
});

module.exports = router;