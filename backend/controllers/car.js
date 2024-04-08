import Car from "../models/car.js";

const addCar = async (req, res) => {
  const user = req.user;
  const {
    brand,
    model,
    year,
    color,
    availablityStatus,
    carType,
    mileage,
    condition,
    pricing,
    images,
    category,
    licensePlateNumber,
  } = req.body;

  try {
    const newCar = await Car.create({
      brand,
      model,
      year,
      color,
      ownerId: user.id,
      availablityStatus,
      carType,
      mileage,
      condition,
      pricing,
      images,
      category,
      licensePlateNumber,
    });

    res.status(201).json({ message: "Car Created Successfully", newCar });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const getCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findOne({ _id: id });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ car });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const {
    brand,
    model,
    year,
    color,
    ownerId,
    availablityStatus,
    carType,
    mileage,
    condition,
    pricing,
    images,
    category,
    licensePlateNumber,
  } = req.body;

  try {
    const existingCar = await Car.findOne({ _id: id });

    if (!existingCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (existingCar.ownerId != user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized to update this car" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      { _id: id },
      {
        brand,
        model,
        year,
        color,
        ownerId,
        availablityStatus,
        carType,
        mileage,
        condition,
        pricing,
        images,
        category,
        licensePlateNumber,
      }
    );

    res.status(200).json({ message: "Updated successfully", updatedCar });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const existingCar = await Car.findOne({ _id: id });

    if (!existingCar) {
      return res.status(404).json({ message: "The Car not found" });
    }

    if (existingCar.ownerId != user.id) {
      return res
        .status(401)
        .json({ message: "You are unauthorized to delete this car." });
    }

    await Car.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json({ cars });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const getUserCars = async (req, res) => {
  const user = req.user;

  try {
    const cars = await Car.find({ ownerId: user.id });
    res.status(200).json({ cars });
  } catch (err) {
    res.status(403).json({ message: "" });
  }
};

export { addCar, updateCar, deleteCar, getCar, getCars, getUserCars };
