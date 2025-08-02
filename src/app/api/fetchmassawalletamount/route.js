import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { address } = await req.json();

    const response = await fetch("https://test.massa.net/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "get_addresses",
        params: [[address]],
        id: 1,
      }),
    });

    const result = await response.json();
    return NextResponse.json({ success: true, balance: result?.result?.[0]?.balance?.candidate || "0.0" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch Massa balance", error: error.message }, { status: 500 });
  }
}
