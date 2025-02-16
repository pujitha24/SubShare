import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new Error('Invalid token');
    }

    req.user = {
      id: user.id,
      email: user.email
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};
