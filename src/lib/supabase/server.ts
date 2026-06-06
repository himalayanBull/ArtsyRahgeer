import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const isConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("https://") &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

const nullClient = {
  from: () => ({
    select: () => ({
      eq: () => ({ order: () => ({ limit: () => ({ data: null, error: null }) }), single: () => ({ data: null, error: null }), data: null, error: null }),
      neq: () => ({ eq: () => ({ limit: () => ({ data: null, error: null }) }), data: null, error: null }),
      order: () => ({ limit: () => ({ data: null, error: null }), data: null, error: null }),
      single: () => ({ data: null, error: null }),
      limit: () => ({ data: null, error: null }),
      data: null,
      error: null,
    }),
  }),
} as any;

export async function createClient() {
  if (!isConfigured) return nullClient;

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — ignore
          }
        },
      },
    }
  );
}
