import contactModal from "../model/contactModel.js";

// @desc getAllContact
// @route GET /api/contact
// @access private
const getContact = async (req, res, next) => {
  try {
    // find all the contacts associated to the user (user_id)
    const contact = await contactModal.find({ user_id: req.userInfo.id });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc postContact
// @route POST /api/contact
// @access private
const postContact = async (req, res, next) => {
  try {
    const { name, email, contact } = req.body;
    if (!name || !email || !contact) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const newContact = await contactModal.create({
      user_id: req.userInfo.id,
      name,
      email,
      contact,
    });
    res.status(200).json(newContact);
  } catch (error) {
    next(error);
  }
};

// @desc getContactById
// @route GET /api/contact/:id
// @access private
const getContactById = async (req, res, next) => {
  try {
    const contact = await contactModal.findOne({ _id: req.params.id });
    if (!contact) {
      res.status(404);
      throw new Error("Contact Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc updateContactById
// @route PUT /api/contact/:id
// @access private
const updateContactById = async (req, res, next) => {
  try {
    const contact = await contactModal.findOne({ _id: req.params.id });
    if (!contact) {
      res.status(404);
      throw new Error("Contact Not found");
    }

    // Checking the correct user by checing the user_id
    if (contact.user_id.toString() !== req.userInfo.id) {
      res.send(403);
      throw new Error(
        "User don't have permission to update other user's contact"
      );
    }

    const updatedContact = await contactModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

// @desc deleteContactById
// @route DELETE /api/contact/:id
// @access private
const deleteContactById = async (req, res, next) => {
  try {
    const contact = await contactModal.findOne({ _id: req.params.id });
    if (!contact) {
      res.status(404);
      throw new Error("Contact Not found");
    }

    // Checking the correct user by checing the user_id
    if (contact.user_id.toString() !== req.userInfo.id) {
      res.send(403);
      throw new Error(
        "User don't have permission to update other user's contact"
      );
    }

    let deletedOne = await contactModal.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletedOne);
  } catch (error) {
    next(error);
  }
};

export {
  getContact,
  postContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
