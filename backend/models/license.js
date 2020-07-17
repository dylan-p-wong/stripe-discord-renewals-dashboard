const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LicenseSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    discordID: {
        type: String,
        required: true
    },
    status: {
        cancel_period_end: {
            type: Boolean,
            required: true
        },
        activated: {
            type: Boolean,
            required: true
        }
    },
    paymentInfo: {
        customerID: {
            type: String,
            required: true
        },
        subscriptionID: {
            type: String,
            required: true
        },
        card: {
            brand: {
                type: String,
                required: true 
            }, 
            last_4: {
                type: String,
                required: true
            }, 
            exp_month: {
                type: String,
                required: true
            }, 
            exp_year: {
                type: String,
                required: true
            }
        },
        dates: {
            creation_date: {
                type: String,
                required: true
            },
            period_start: {
                type: String,
                required: true
            },
            period_end: {
                type: String,
                required: true
            }
        }
    }
});

module.exports = License = mongoose.model('License', LicenseSchema);