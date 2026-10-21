import type { SubmitRequestFormState, SubmitResult } from "@/types/request";

export async function submitRequest(
  data: SubmitRequestFormState
): Promise<SubmitResult> {
  await new Promise<void>((resolve) => setTimeout(resolve, 1200));
  void data;

  const today = new Date();
  const datePart = today.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
  const requestNumber = `REQ-${datePart}-${randomPart}`;

  return { requestNumber };
}
