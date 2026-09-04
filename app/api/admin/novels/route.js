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

    const title = typeof body.title === "string" ? body.title.trim() : "";
    const synopsis = typeof body.synopsis === "string" ? body.synopsis.trim() : "";
    const status = body.status === "completed" || body.status === "ongoing" ? body.status : "";

    if (!title || !status) {
      return NextResponse.json({ error: "ဝတ္ထုခေါင်းစဉ်နဲ့ status ဖြည့်ပေးပါ" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("novels")
      .insert({ title, synopsis, status })
      .select("id")
      .single();

    if (error) {
      console.error("Create novel failed", error);
      return NextResponse.json({ error: "ဝတ္ထုတင်ရာတွင် အမှားရှိပါတယ်။ Database ကို စစ်ပေးပါ" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
    }
    