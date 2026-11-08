const Category = require('../models/categoryModel');

const getAllCategories = async () => {
  return await Category.find();
};

const createCategory = async (categoryData) => {
  const newCategory = new Category(categoryData);
  return await newCategory.save();
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory
};