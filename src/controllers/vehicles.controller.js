const { Vehicles, validVehicle } = require('../models/vehicles.model');
const Owner = require('../models/owner.model');

const addVehicles = async (req, res) => {
  try {
    const { chasisNumber, manufacturer, year, price, plateNumber, model, createdBy } = req.body;

    const vehicle = {
      chasisNumber,
      manufacturer,
      year,
      price,
      plateNumber,
      model,
      createdBy,
    };

    const { error } = validVehicle.validate(vehicle);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const owner = await Owner.findById(createdBy);

    if (!owner) {
      return res.status(400).json({ error: 'Owner cannot be empty' });
    }

    const vehicleToBeSaved = {
      chasisNumber,
      manufacturer,
      year,
      price,
      plateNumber,
      model,
      owner: owner.fullnames,
    };


    const newVehicle = new Vehicles(vehicleToBeSaved);
    await newVehicle
      .save()
      .then((savedVehicle) => {
        console.log(savedVehicle)
        return res.status(201).json({ savedVehicle });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: 'Failed to save Vehicle' });
      });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getVehicles = async (req, res) => {
  try {
    const result = await Vehicles.find();

    if (result) {
      return res.status(200).json({ result });
    }
    res.status(400).json({ error: 'Unable to fetch data' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { addVehicles, getVehicles };
