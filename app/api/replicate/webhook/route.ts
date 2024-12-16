import { NextRequest, NextResponse } from "next/server";
import { validateWebhook } from "replicate";
import { createServiceClient } from "@/utils/supabase/service";
import { PredictionStatus } from "@/lib/models/video-generation";

export async function POST(request: NextRequest) {
  const secret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET;

  if (!secret) {
    console.error("REPLICATE_WEBHOOK_SIGNING_SECRET is not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    // const webhookIsValid = await validateWebhook(request.clone(), secret);
    const webhookIsValid = true; // for easy debugging. Don't forget to remove this before deploying!

    if (!webhookIsValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const {
      id: replicate_prediction_id,
      status,
      started_at,
      completed_at,
      output,
    } = await request.json();

    console.log(
      replicate_prediction_id,
      status,
      started_at,
      completed_at,
      output
    );

    if (!replicate_prediction_id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const supabase = createServiceClient();

    const updateData: {
      status: PredictionStatus;
      completed_at?: string;
      video_url?: string;
    } = {
      status: PredictionStatus.Starting,
    };

    if (status === "succeeded") {
      updateData.status = PredictionStatus.Succeeded;
      updateData.completed_at = completed_at;

      // Get the video from Replicate
      const videoResponse = await fetch(output);
      const videoBuffer = await videoResponse.arrayBuffer();

      // Upload to Supabase Storage
      const fileName = `${replicate_prediction_id}.mp4`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("all-videos")
        .upload(fileName, videoBuffer, {
          contentType: "video/mp4",
          upsert: true,
        });

      if (uploadError) {
        console.error("Error uploading video to Supabase:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload video" },
          { status: 500 }
        );
      }

      // Get public URL for the uploaded video
      const {
        data: { publicUrl },
      } = supabase.storage.from("all-videos").getPublicUrl(fileName);

      // Update the record with the video URL
      updateData.video_url = publicUrl;
    } else if (status === "failed") {
      updateData.status = PredictionStatus.Failed;
    } else if (status === "cancelled") {
      updateData.status = PredictionStatus.Canceled;
    } else if (status === "processing") {
      updateData.status = PredictionStatus.Processing;
    } else if (status === "starting") {
      updateData.status = PredictionStatus.Starting;
    } else {
      console.error("Unknown status:", status);
      return NextResponse.json(
        { error: "Unknown status" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("video-generations")
      .update(updateData)
      .eq("replicate_prediction_id", replicate_prediction_id);

    if (error) {
      console.error("Error updating video generation:", error);
      return NextResponse.json(
        { error: "Failed to update video generation" },
        { status: 500 }
      );
    }

    console.log(
      `Updated video generation for prediction ${replicate_prediction_id}`
    );
    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
