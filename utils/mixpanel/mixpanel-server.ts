import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import UAParser from "ua-parser-js";

const sendPageViewToMixpanel = async (req: NextRequest, userId: string | null, sessionId: string | null = null) => {
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];

  const utmValues = utmKeys.reduce((acc, key) => {
    if (req.url && req.nextUrl.searchParams.has(key)) {
      acc[key] = req.nextUrl.searchParams.get(key);
    }
    return acc;
  }, {} as Record<string, string | null>);

  const headersList = await headers();
  const userAgent = new UAParser.UAParser(
    headersList.get("user-agent") || ""
  ).getResult();
  const referrer = headersList.get("referer");
  const initial_referrer = headersList.get("x-initial-referrer");
  const ip = getIPAddress(headersList);

  const properties = {
    page: req.nextUrl.pathname,
    $user_id: userId,
    $session_id: sessionId,
    $device: userAgent.device.model || "Unknown",
    $browser: userAgent.browser.name,
    $os: userAgent.os.name,
    $os_version: userAgent.os.version,
    $browser_version: userAgent.browser.version,
    $referrer: referrer,
    $referring_domain: referrer ? new URL(referrer).hostname : "",
    $initial_referrer: initial_referrer,
    $initial_referring_domain: initial_referrer
      ? new URL(initial_referrer).hostname
      : "",
    ip: ip,
    ...utmValues,
  };
//   console.log("properties", properties);    

  //Finally we are calling the mixpanel api route
  fetch(`${process.env.NEXT_PUBLIC_URL}/api/mixpanel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: "page_view",
      properties: properties,
    }),
  });
};

export default sendPageViewToMixpanel;

function getIPAddress(headersList: ReadonlyHeaders) {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headersList.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headersList.get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}

export const sendToMixpanelServer = async (event: string, properties: Record<string, any>) => {
  fetch(`${process.env.NEXT_PUBLIC_URL}/api/mixpanel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: event,
      properties: properties,
    }),
  });
};
