import { NextResponse } from "next/server";
import Mixpanel from "mixpanel";
import { createClient } from "@/utils/supabase/server";
import { getAndCreateSessionIdIfMissing } from "@/utils/mixpanel/session";

const mixpanel = Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!);

export async function POST(request: Request) {
  const data = await request.json();


  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();

  const userId = user?.user?.id;
  const sessionId = getAndCreateSessionIdIfMissing();

  try {
    const { event, properties } = data;

    const mixpanelProperties = {
      ...properties,
      $user_id: properties.$user_id || userId,
      $device_id: properties.$device_id || sessionId,
      distinct_id: properties.distinct_id || properties.$user_id || userId || properties.$device_id || sessionId,
      $user_email: user?.user?.email,
    };

    // console.log(mixpanelProperties);

    if (process.env.NODE_ENV === "production") {
      mixpanel.track(event, mixpanelProperties);
    } else {
      console.log("DEBUG event", event, mixpanelProperties.page);
    }

    return NextResponse.json({ status: "Event tracked successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
