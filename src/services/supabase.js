import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://uipjxsqgptatzshhncxw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcGp4c3FncHRhdHpzaGhuY3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NTkzMjksImV4cCI6MjA0NTUzNTMyOX0.zBIxfKMWFKsPNikPc_gKCIdddRLqqyEldXca55rbMic";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
