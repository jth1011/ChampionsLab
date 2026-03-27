import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const TEAMS_FILE = join(process.cwd(), "data", "shared-teams.json");

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || id.length !== 6) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const raw = await readFile(TEAMS_FILE, "utf-8");
    const store = JSON.parse(raw) as Record<string, { data: unknown }>;
    const entry = store[id];

    if (!entry) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(entry.data);
  } catch {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }
}
