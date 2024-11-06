import "server-only";
import { SignJWT, importPKCS8 } from "jose";
import { ObservableEmbedClient } from "./client";

const SIGNATURE_ALIGN_MS = 5 * 60 * 1000;
const SIGNATURE_VALIDITY_MS = SIGNATURE_ALIGN_MS * 2;

const privateKey = process.env.EMBED_PRIVATE_KEY
  ? await importPKCS8(process.env.EMBED_PRIVATE_KEY, "EdDSA")
  : null;

interface ObservableEmbedProps {
  module: string;
  importName: string
}

export const ObservableEmbed: React.FC<ObservableEmbedProps> = async ({ module, importName }) => {
  const signedUrl = await signUrl(module);
  return <ObservableEmbedClient module={signedUrl.href} importName={importName} />;
}

async function signUrl(url: string | URL): Promise<URL> {
  if (typeof url === "string") {
    url = new URL(url);
  }
  if (!privateKey) {
    console.warn("No private key available for signing");
    return url;
  }
  const now = Date.now();
  const notBefore = now - (now % SIGNATURE_ALIGN_MS);
  const notAfter = notBefore + SIGNATURE_VALIDITY_MS;
  const token = await new SignJWT({"urn:observablehq:path": url.pathname})
    .setProtectedHeader({alg: "EdDSA"})
    .setSubject("nextjs-example")
    .setNotBefore(notBefore / 1000)
    .setExpirationTime(notAfter / 1000)
    .sign(privateKey);
  url.searchParams.set("token", token);
  return url;
}
