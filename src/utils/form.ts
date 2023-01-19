import { z } from "zod";

export const urlSchema = z.string().transform((val, ctx) => {
  try {
    const url = new URL(val);

    if (url.protocol !== "https:") throw new Error("Invalid URL");
    if (url.host !== "docs.rs" && url.host !== "crates.io")
      throw new Error("Invalid URL");

    if (url.host === "docs.rs") {
      const path = url.pathname.split("/");

      // URL format https://docs.rs/crate/<crate-name>/<version>
      if (path[1] === "crate") {
        const crate = path[2];
        const version = path[3];

        if (!crate || !version) throw new Error("Invalid URL");

        return { host: "docs.rs", crate, version };
      }

      // URL format https://docs.rs/<crate-name>/<version>/...
      const crate = path[1];
      const version = path[2];

      if (!crate || !version) throw new Error("Invalid URL");

      return { host: "docs.rs", crate, version };
    }

    // URL format https://crates.io/crates/<crate-name>
    if (url.host === "crates.io") {
      const path = url.pathname.split("/");
      const crate = path[2];

      if (!crate) throw new Error("Invalid URL");

      return { host: "crates.io", crate };
    }

    throw new Error("Invalid URL");
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid URL",
    });
    return z.NEVER;
  }
});

export const getDownloadUrl = async ({
  crate,
  version,
}: {
  crate: string;
  version?: string;
}) => {
  if (!version || version === "latest") {
    const response = await fetch(`https://crates.io/api/v1/crates/${crate}`);
    const data = await response.json()
    version = data.crate.newest_version;
  }

  return `https://crates.io/api/v1/crates/${crate}/${version}/download`;
};
