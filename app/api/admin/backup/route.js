import { cookies } from "next/headers";
    import { NextResponse } from "next/server";
    import { supabaseAdmin } from "@/lib/supabaseAdmin";

    export async function GET() {
    if (cookies().get("admin_auth")?.value !== "true") {
      return NextResponse.json({ error: "Admin login လိုအပ်ပါတယ်" }, { status: 401 });
    }

    const [{ data: novels, error: novelsError }, { data: chapters, error: chaptersError }] = await Promise.all([
      supabaseAdmin.from("novels").select("id, title, synopsis, status"),
      supabaseAdmin.from("chapters").select("id, novel_id, chapter_number, content"),
    ]);

    if (novelsError || chaptersError) {
      console.error("Create backup failed", novelsError || chaptersError);
      return NextResponse.json({ error: "Backup ပြုလုပ်ရာတွင် အမှားရှိပါတယ်" }, { status: 500 });
    }

    const backup = {
      format: "shadow-novel-backup",
      version: 1,
      exported_at: new Date().toISOString(),
      novels: novels || [],
      chapters: chapters || [],
    };

    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="shadow-novel-backup.json"',
        "Cache-Control": "no-store",
      },
    });
    }
    