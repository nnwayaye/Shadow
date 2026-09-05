import { cookies } from "next/headers";
    import { NextResponse } from "next/server";
    import { supabaseAdmin } from "@/lib/supabaseAdmin";

    function isAdmin() {
    return cookies().get("admin_auth")?.value === "true";
    }

    async function readBody(request) {
    try {
      return await request.json();
    } catch {
      return null;
    }
    }

    export async function PATCH(request, { params }) {
    if (!isAdmin()) return NextResponse.json({ error: "Admin login လိုအပ်ပါတယ်" }, { status: 401 });

    const body = await readBody(request);
    if (!body) return NextResponse.json({ error: "ပေးပို့တဲ့အချက်အလက် မမှန်ပါ" }, { status: 400 });

    const chapterNumber = Number(body.chapter_number);
    const content = typeof body.content === "string" ? body.content.trim() : "";

    if (!Number.isInteger(chapterNumber) || chapterNumber < 1 || !content) {
      return NextResponse.json({ error: "အခန်းနံပါတ်နဲ့ အခန်းစာသား ဖြည့်ပေးပါ" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("chapters")
      .update({ chapter_number: chapterNumber, content })
      .eq("id", params.id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Update chapter failed", error);
      const status = error.code === "23505" ? 409 : 500;
      return NextResponse.json({ error: status === 409 ? "ဒီအခန်းနံပါတ် ရှိပြီးသားပါ" : "အခန်းပြင်ရာတွင် အမှားရှိပါတယ်" }, { status });
    }
    if (!data) return NextResponse.json({ error: "အခန်း မတွေ့ပါ" }, { status: 404 });

    return NextResponse.json({ ok: true, id: data.id });
    }

    export async function DELETE(request, { params }) {
    if (!isAdmin()) return NextResponse.json({ error: "Admin login လိုအပ်ပါတယ်" }, { status: 401 });

    const { data, error } = await supabaseAdmin
      .from("chapters")
      .delete()
      .eq("id", params.id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Delete chapter failed", error);
      return NextResponse.json({ error: "အခန်းဖျက်ရာတွင် အမှားရှိပါတယ်" }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: "အခန်း မတွေ့ပါ" }, { status: 404 });

    return NextResponse.json({ ok: true, id: data.id });
    }
    