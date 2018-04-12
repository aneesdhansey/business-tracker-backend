const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    shortname: {
        type: String,
        trim: true
    },  
    licenseno: {
        type: String,
        trim: true
    },
    street: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    fax: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    logo: {
        data: Buffer,
        contentType: String
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    _lastmodifiedat: {
        type : Number,
        default: new Date().getTime()
    },
    _lastmodifiedby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

CompanySchema.pre('save', function(next){
    const company = this;

    company._lastmodifiedat = new Date().getTime();

    next();
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = { Company };