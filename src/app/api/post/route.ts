import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export async function POST(request: NextRequest) {
    const supabase = createClient(process.env.URL!, process.env.PSW!);
    const d = await request.json();
    if (d.title && d.content){
        const {data,error} =  await supabase.from("post").insert([
            {id:Date.now(),title:d.title,content:d.content}
        ]);
        if (error) return NextResponse.json({reason:"we_dont_know_what_the_hell_because_database_is_crazy"},{status:500})
        return NextResponse.json({reason:"OK"},{status:200})
    } else {
        return NextResponse.json({reason:"no_title_or_content"},{status:400})
    }
}