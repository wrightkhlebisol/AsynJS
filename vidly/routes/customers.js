const router = require('express')();
const Joi = require('joi');
const mongoose = require('mongoose');

const {
    Customers
} = require('../models/customers');

router.get("/", async (req, res) => {
    try {
        let customers = await Customers.find().sort('name');
        res.status(200).send(customers);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let customers = await Customers.findById(req.params.id);
        res.status(200).send(customers);
    } catch (error) {
        res.status(400).send(error.message)
    }

});

router.post("/", async (req, res) => {
    let customers = new Customers({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
    try {
        let customer = await customers.save();
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put('/:id', async (req, res) => {
    try {
        let customer = await Customers.findByIdAndUpdate(req.params.id, {})

    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let customer = await Customers.findByIdAndDelete(req.params.id)
        res.status(200).send(customer)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;
