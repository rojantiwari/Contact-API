const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contact
//routes GET /api/contacts
//access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contact });
});

// create new contact
//routes GET /api/contacts
//access private

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});
// Get indivisual contact
//routes GET /api/contacts/:id
//access private

const getindivisualContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: "Contact not found" });
    // throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// create put contact
//routes GET /api/contacts/:id
//access private

const putContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: "Contact not found" });
    // throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Don't have permission to update other user contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

// delete contact
//routes GET /api/contacts/:id
//access private

const deleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User Don't have permission to delete other user contacts");
    }

    const deletedContact = await Contact.findByIdAndDelete({_id:req.params.id});

    if (!deletedContact) {
      // Optional: Handle the case where deletion fails (e.g., due to permissions)
      return res.status(500).json({ message: "Error deleting contact" });
    }

    res
      .status(200)
      .json({ message: "Contact deleted successfully", deletedContact });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: error.message });
  }
});

module.exports = {
  getContact,
  createContact,
  getindivisualContact,
  putContact,
  deleteContact,
};
