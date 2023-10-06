import { createClient } from "@supabase/supabase-js";

interface SupabaseClient {
	supabaseClient: (supabaseToken: string) => Promise<any>;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseClient = async (supabaseToken: string) => {
	const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
		global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
	});

	return supabase;
};
