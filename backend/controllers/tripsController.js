const supabase = require("../config/supabase");

exports.startTrip = async (req, res) => {
  const { user_id, origin, start_time } = req.body;

  const { data, error } = await supabase
    .from("trips")
    .insert([{ user_id, origin, start_time }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.updateTrip = async (req, res) => {
  const { trip_id, location, timestamp } = req.body;

  const { data, error } = await supabase
    .from("trip_updates")
    .insert([{ trip_id, location, timestamp }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.endTrip = async (req, res) => {
  const { trip_id, end_time, destination } = req.body;

  const { data, error } = await supabase
    .from("trips")
    .update({ end_time, destination })
    .eq("id", trip_id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.getTrips = async (req, res) => {
  const { data, error } = await supabase.from("trips").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.getTripById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("trips")
    .select("*, trip_updates(*)")
    .eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
