import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://ihyqxzzyxgxnyxpfdfef.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeXF4enp5eGd4bnl4cGZkZmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA5NjkxMDgsImV4cCI6MTk5NjU0NTEwOH0.L5id-fKh_UPEF3LcANpF0sPpkk3vxUBMWjXNeMAKGkI"
);