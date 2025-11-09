import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Addcategories from './add';

type Category = {
  id: number;
  name: string;
};

const CategoryList: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleModel = () => setOpenModel(!openModel);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories/');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={toggleModel}
          className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-xl"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition"
          >
            <span className="text-lg font-medium text-gray-700">{category.name}</span>
            <IconButton color="error" aria-label="delete" onClick={() => handleDelete(category.id)}>
              <Delete />
            </IconButton>
          </div>
        ))}
      </div>

      {openModel && <Addcategories onclose={toggleModel} />}
    </div>
  );
};

export default CategoryList;
