import { prisma } from "@/lib/db/prisma";
import { ResourcePage } from "@/components/admin/resource-page";
import { MediaRegisterForm } from "@/components/admin/media-register-form";
export default async function AdminMediaPage() { const rows = await prisma.mediaFile.findMany({ orderBy: { createdAt: "desc" }, take: 200 }); return <div className="space-y-6"><MediaRegisterForm /><ResourcePage eyebrow="Assets" title="Media library" description="Review image metadata and manage reusable platform assets." rows={rows.map((row) => ({ id: row.id.toString(), title: row.originalName, subtitle: row.mediaType, meta: `${row.mimeType} · ${row.disk}`, status: "ACTIVE" }))} /></div>; }
