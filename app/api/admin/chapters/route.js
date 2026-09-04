import { cookies } from "next/headers";
    import { NextResponse } from "next/server";
    import { supabaseAdmin } from "@/lib/supabaseAdmin";

    export async function POST(request) {
    if (cookies().get("admin_auth")?.value !== "true") {
      return NextResponse.json({ error: "Admin login လိုအပ်ပါတယ်" }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "ပေးပို့တဲ့အချက်အလက် မမှန်ပါ" }, { status: 400 });
    }

    const novelId = typeof body.novel_id === "string" ? body.novel_id.trim() : "";
    const chapterNumber = Number(body.chapter_number);
    const content = typeof body.content === "string" ? body.content.trim() : "";

    if (!novelId || !Number.isInteger(chapterNumber) || chapterNumber < 1 || !content) {
      return NextResponse.json({ error: "ဝတ္ထု၊ အခန်းနံပါတ်နဲ့ အခန်းစာသား ဖြည့်ပေးပါ" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("chapters")
      .insert({ novel_id: novelId, chapter_number: chapterNumber, content })
      .select("id")
      .single();

    if (error) {
      console.error("Create chapter failed", error);
      return NextResponse.json({ error: "အခန်းထည့်ရာတွင် အမှားရှိပါတယ်။ အခန်းနံပါတ် ထပ်နေသလား စစ်ပေးပါ" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
    }
    