const express = require('express');
const router = express.Router();
const License = require('../models/license');
const {removeRole} = require('../discordClient');

router.route('/').get(async (req,res)=> {
    const discordID = req.query.discordID;

    if (!discordID){
        return res.status(403).json({msg: "No discordID"});
    }

    let results = await License.find({discordID: discordID});

    res.status(200).json(results);
});

router.route('/deactivate').post(async (req,res)=> {
    const key = req.body.key;
    const license = await License.findOne({key: key});
    license.update({'status.activated': false});
    removeRole(license.discordID);

    res.status(200).json({msg: "Deactivated"});
});

module.exports = router;