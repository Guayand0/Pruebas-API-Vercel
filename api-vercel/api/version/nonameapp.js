import fetch from "node-fetch";

export async function GET() {
  const repo = "Guayand0/Pruebas-API-Vercel";
  const token = process.env.GITHUB_TOKEN;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json({ error: "No se pudo obtener la versión", detail: text }, { status: res.status });
    }

    const release = await res.json();
    const apk = release.assets?.find(a => a.name.endsWith(".apk"));

    return Response.json({
      version: release.tag_name?.replace(/^v/, "") ?? "0.0.0",
      apk_url: apk ? apk.browser_download_url : null,
    });
  } catch (err) {
    return Response.json({ error: "Error al procesar la petición", detail: err.message }, { status: 500 });
  }
}
