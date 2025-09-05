// controllers/tripController.js (Debug Version)
import { supabase } from '../config/supabaseClient.js';

export const createTrip = async (req, res) => {
  console.log("--- createTrip function has been called ---");
  console.log("1. Received Body (req.body):", req.body); // What did we get from the request?

  const { origin, destination, mode, accompanying_travellers, start_time } = req.body;
  const user_id = req.user.id;
  
  const objectToInsert = { 
      user_id, 
      origin, 
      destination, 
      mode, 
      accompanying_travellers,
      start_time: start_time || new Date() 
  };

  console.log("2. Object being sent to Supabase:", objectToInsert); // What are we about to insert?

  const { data, error } = await supabase
    .from('trips')
    .insert([objectToInsert])
    .select()
    .single();

  if (error) {
    console.error("3. Supabase returned an error:", error); // What was the exact error?
    return res.status(400).json({ message: error.message });
  }

  console.log("4. Supabase returned success data:", data);
  res.status(201).json(data);
};

export const getUserTrips = async (req, res) => {
  const user_id = req.user.id;
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', user_id);
  if (error) return res.status(400).json({ message: error.message });
  res.status(200).json(data);
};