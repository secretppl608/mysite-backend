import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export async function POST(request: NextRequest) {
    const supabase = createClient(process.env.URL!, process.env.PSW!);
    
    
}