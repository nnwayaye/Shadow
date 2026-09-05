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

    const title = typeof body.title === "string" ? body.title.trim() : "";
    const synopsis = typeof body.synopsis === "string" ? body.synopsis.trim() : "";
    const status = body.status === "completed" || body.status === "ongoing" ? body.status : "";

    if (!title || !status) {
      return NextResponse.json({ error: "ဝတ္ထုခေါင်းစဉ်နဲ့ status ဖြည့်ပေးပါ" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("novels")
      .update({ title, synopsis, status })
      .eq("id", params.id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Update novel failed", error);
      return NextResponse.json({ error: "ဝတ္ထုပြင်ရာတွင် အမှားရှိပါတယ်" }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: "ဝတ္ထု မတွေ့ပါ" }, { status: 404 });

    return NextResponse.json({ ok: true, id: data.id });
    }

    export async function DELETE(request, { params }) {
    if (!isAdmin()) return NextResponse.json({ error: "Admin login လိုအပ်ပါတယ်" }, { status: 401 });

    const { data: chapters, error: chaptersError } = await supabaseAdmin
      .from("chapters")
      .select("id")
      .eq("novel_id", params.id)
      .limit(1);

    if (chaptersError) {
      console.error("Check novel chapters failed", chaptersError);
      return NextResponse.json({ error: "ဝတ္ထုအခန်းများ စစ်ရာတွင် အမှားရှိပါတယ်" }, { status: 500 });
    }

    if (chapters && chapters.length > 0) {
      return NextResponse.json({ error: "အခန်းများရှိသေးလို့ အရင်ဆုံး အခန်းအားလုံးကို ဖျက်ပေးပါ" }, { status: 409 });
    }

    const { data, error } = await supabaseAdmin
      .from("novels")
      .delete()
      .eq("id", params.id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Delete novel failed", error);
      return NextResponse.json({ error: "ဝတ္ထုဖျက်ရာတွင် အမှားရှိပါတယ်" }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: "ဝတ္ထု မတွေ့ပါ" }, { status: 404 });

    return NextResponse.json({ ok: true, id: data.id });
    }
    