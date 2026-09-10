import { ApiErrorResponse } from '@/models/responses/api-error.response';
import { HttpErrorResponse } from '@angular/common/http';

/** Returns normalized messages from an API error response. */
export function getApiErrorMessages(error: HttpErrorResponse): string[] {
  const response = error.error as ApiErrorResponse;
  const messages = response.errors ?? [response.error ?? ''];

  return messages.map((message) => message.trim()).filter(Boolean);
}
