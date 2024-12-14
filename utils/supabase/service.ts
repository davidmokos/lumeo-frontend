import { Database } from "@/lib/database.types";
import { createClient } from "@supabase/supabase-js";

export const createServiceClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}
