import House from "../models/house.js";

const AddHouse = async (req, res) => {
  const user = req.user;
  const {
    description,
    address,
    houseType,
    bedrooms,
    bathrooms,
    squareFootage,
    furnished,
    rentPrice,
    depositAmount,
    availableStatus,
    images,
    petsAllowed,
  } = req.body;

  try {
    const newHouse = await House.create({
      description,
      address,
      houseType,
      bedrooms,
      bathrooms,
      squareFootage,
      furnished,
      rentPrice,
      depositAmount,
      availableStatus,
      images,
      petsAllowed,
      ownerId: user.id,
    });

    res.status(201).json({ message: "House Added successfully!", newHouse });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const GetHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await House.findOne({ _id: id });

    console.log("house", house);

    if (!house) {
      return res.status(404).json({ message: "House not Found" });
    }

    res.status(200).json({ house });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const UpdateHouse = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const {
    description,
    address,
    houseType,
    bedrooms,
    bathrooms,
    squareFootage,
    furnished,
    rentPrice,
    depositAmount,
    availableStatus,
    images,
    petsAllowed,
  } = req.body;

  try {
    const existingHouse = await House.findOne({ _id: id });

    if (!existingHouse) {
      return res.status(404).json({ message: "House not found" });
    }

    if (existingHouse.ownerId != user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedHouse = await House.findByIdAndUpdate(
      { _id: id },
      {
        description,
        address,
        houseType,
        bedrooms,
        bathrooms,
        squareFootage,
        furnished,
        rentPrice,
        depositAmount,
        availableStatus,
        images,
        petsAllowed,
      }
    );

    res
      .status(200)
      .json({ message: "The House updated successfully!", updatedHouse });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const DeleteHouse = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const existingHouse = await House.findOne({ _id: id });

    if (!existingHouse) {
      return res.status(404).json({ message: "House not Found" });
    }

    if (existingHouse.ownerId != user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await House.findByIdAndDelete({ _id: id });
    res.status(200).json({ mesage: "House deleted successfully!" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const GetHouses = async (req, res) => {
  try {
    const houses = await House.find({});
    res.status(200).json({ houses });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const GetUserHouses = async (req, res) => {
  const user = req.user;

  try {
    const userHouses = await House.find({ ownerId: user.id });
    res.status(200).json({ userHouses });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export {
  AddHouse,
  UpdateHouse,
  DeleteHouse,
  GetHouses,
  GetUserHouses,
  GetHouse,
};
