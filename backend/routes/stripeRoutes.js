const express = require('express');
const router = express.Router();
const License = require('../models/license');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {maxNetworkRetries: 2});
const { v4: uuidv4 } = require('uuid');
const { removeRole } = require('../discordClient');
const config = require('../config.json');

router.route('/purchase').post(async (req,res)=> {
    const discordID = req.body.discordID;
    const paymentID = req.body.paymentID;
    const email = req.body.email;

    if (discordID == null || email == null || paymentID == null) return res.status(401).json({success: false, msg: "Fill out all fields"});

    const customer = await stripe.customers.create({
        email: email,
        payment_method: paymentID,
        invoice_settings: {
          default_payment_method: paymentID,
        },
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            plan: config.stripe.planID, 
          },
        ],
        expand: ['latest_invoice.payment_intent'],
    });

    const payment = await stripe.paymentMethods.retrieve(customer.invoice_settings.default_payment_method);

    if (subscription.latest_invoice.payment_intent.status === 'succeeded'){
        const newLicense = new License({
            key: uuidv4(),
            discordID: discordID,
            status: {
                cancel_period_end: false,
                activated: false 
            },
            paymentInfo: {
                subscriptionID: subscription.id,
                customerID: customer.id,
                card: {
                    brand: payment.card.brand, last_4: payment.card.last4, exp_month: payment.card.exp_month, exp_year: payment.card.exp_year
                },
                dates: {
                    creation_date: subscription.created,
                    period_start: subscription.current_period_start,
                    period_end: subscription.current_period_end
                }
            }
        });

        newLicense.save();

        res.status(200).json({ msg: "Successfully created"});
    } else {
        res.status(404).json({ msg: "Error"});
    }
});

router.route('/cancel').post(async (req,res)=> {
    const license = req.body.key;

    const key = await License.findOne({ key: license });

    if (key == null){
        return res.status(403).json({msg: "Error no key"});
    }

    const cancel = await stripe.subscriptions.update(key.paymentInfo.subscriptionID, {cancel_at_period_end: true});

    if (cancel.cancel_at_period_end == true){
        await key.updateOne({status: {cancel_period_end: true, activated: key.status.activated}});
        res.status(200).json({msg: "Successfully cancelled"});
    } else {
        res.status(400).json({msg: "Error contact support"});
    }
});

router.route('/webhook').post(async (req,res)=> {
    console.log(req.body.type);

    switch(req.body.type){
        case 'invoice.paid': { // Add 1 month
            const subID = req.body.data.object.subscription;
            const sub = await stripe.subscriptions.retrieve(subID);

            const period_start = sub.current_period_start;
            const period_end = sub.current_period_end;

            await License.findOneAndUpdate({'paymentInfo.subscriptionID': subID}, {'paymentInfo.dates.period_start': period_start, 'paymentInfo.dates.period_end': period_end});
            break;
        }
        case 'customer.subscription.deleted': { // Remove from discord
            const subID = req.body.data.object.subscription;
            const foundLicense = await License.findOne({'paymentInfo.subscriptionID': subID});
            removeRole(foundLicense.discordID);
            break;
        }
        case 'customer.subscription.updated' : {
            //console.log(req.body);
            break;
        }
    }

    res.json({received: true});
});

module.exports = router;