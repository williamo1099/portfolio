import { isApiEnabled } from "@/lib/env";
import { ApiResponse } from "@/types/api";

interface SendMailProps {
  name: string;
  email: string;
  message: string;
}

export async function sendMail({
  name,
  email,
  message,
}: SendMailProps): Promise<boolean> {
  if (!isApiEnabled) {
    console.warn("[mail] API belum dikonfigurasi, pesan tidak dikirim.");
    return false;
  }

  try {
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });
    let data: ApiResponse<null> = await response.json();

    // Throw error if request is not successful.
    if (!data.success) {
      throw data.message;
    }

    return true;
  } catch (ex) {
    console.error(ex);
    return false;
  }
}
