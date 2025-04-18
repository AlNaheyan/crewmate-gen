import { createClient } from "@supabase/supabase-js";

const sbURL = import.meta.env.VITE_SUPABASE_URL;
const sbKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(sbURL,sbKey);