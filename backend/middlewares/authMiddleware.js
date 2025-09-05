// middlewares/authMiddleware.js
import { supabase } from '../config/supabaseClient.js';

// The 'export' keyword must be here
export const protect = async (req, res, next) => {
  let token;

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    token = req.headers.authorization.split(' ')[1];
    
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
    
    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};