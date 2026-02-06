import { createClient } from '@supabase/supabase-js';
import config from '../config/config';

const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_PUBLISHABLE_KEY
);

const supabaseAdmin = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_ROLE_KEY
);

export { supabase, supabaseAdmin };
