// controllers/userController.js
import { supabase } from '../config/supabaseClient.js';

// @desc    Register a new user
// @route   POST /api/users/register
// Make sure 'export' is here
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      }
    }
  });

  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json({ message: "Registration successful!", user: data.user });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// Make sure 'export' is here as well
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) return res.status(401).json({ message: error.message });
  res.status(200).json({
    user: data.user,
    session: data.session
  });
};