import Menu from "../model/menu.js";

export const menu = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index for pagination
    const skip = (page - 1) * limit;

    // Fetch paginated menu items and the total count
    const [menuItems, totalItems] = await Promise.all([
      Menu.find().skip(skip).limit(limit),
      Menu.countDocuments(),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Calculate Previous and Next Page
    const previousPage = page - 1 === 0 ? null : page - 1;
    const nextPage = page === totalPages ? null : page + 1;

    return res.status(200).send({
      data: menuItems,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        previousPage,
        nextPage,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error?.message || "Internal Server Error" });
  }
};

export const postMenu = async (req, res) => {
  const { name, category, price, availability } = req.body;

  try {
    if (!(name && category && price)) {
      return res
        .status(400)
        .send({ message: "Name, category, and price are required" });
    }

    const newMenuItem = new Menu({ name, category, price, availability });
    const savedMenuItem = await newMenuItem.save();

    return res.status(200).send(savedMenuItem);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error?.message || "Internal Server Error" });
  }
};

export const updateMenu = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedMenuItem) {
      return res.status(404).send({ message: "Menu item not found" });
    }

    return res.status(200).send(updatedMenuItem);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error?.message || "Internal Server Error" });
  }
};

export const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).send({ message: "Menu item not found" });
    }

    return res.status(200).send({ message: "Menu item deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error?.message || "Internal Server Error" });
  }
};

//search Menu or filter
export const searchMenu = async (req, res) => {
  try {
    const { query, category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Build search criteria
    const searchCriteria = {};
    if (query) {
      searchCriteria.name = { $regex: query, $options: "i" };
    }
    if (category) {
      searchCriteria.category = category;
    }

    //number of item to skip
    const skip = (page - 1) * limit;

    // Fetch paginated menu items and the total count
    const [menuItems, totalItems] = await Promise.all([
      Menu.find(searchCriteria).skip(skip).limit(limit),
      Menu.countDocuments(),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Calculate Previous and Next Page
    const previousPage = page - 1 === 0 ? null : page - 1;
    const nextPage = page === totalPages ? null : page + 1;

    return res.status(200).send({
      data: menuItems,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        previousPage,
        nextPage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items", error });
  }
};
