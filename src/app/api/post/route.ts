import { NextRequest, NextResponse } from "next/server";
import { Client, Pool } from "pg";
export async function POST(request: NextRequest) {
    const pool = new Pool({
        host: "aws-1-ap-northeast-2.pooler.supabase.com",
        port: 6543,
        database: "postgres",
        user: 'postgres.zmzbyripoxydefleryhn',
        password: process.env.DB_PSW,
        connectionTimeoutMillis: 5000,
        max:20,
        allowExitOnIdle: true,
        maxLifetimeSeconds: 60,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    const d = await request.json();
    if (d.title && d.content) {
        const client = await pool.connect();
        try {
            await client.query("INSERT INTO post (id,title,content) VALUES ($1,$2,$3)",[Date.now(),d.title,d.content]);
        } catch (error) {
            client.release();
            pool.end();
            return NextResponse.json(
                {
                    reason: "we_dont_know_what_the_hell_because_database_is_crazy",
                    error: error
                },
                { status: 500 },
            );
        }
        client.release();
        pool.end();
        return NextResponse.json({ reason: "OK" }, { status: 200 });
    } else {
        return NextResponse.json(
            { reason: "no_title_or_content" },
            { status: 400 },
        );
    }
}
