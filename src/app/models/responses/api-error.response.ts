/**
 * Error formats returned by the APIs.
 *
 * Some APIs return a single message in `error`, while others return a list in `errors`.
 */
export interface ApiErrorResponse {
  error?: string;
  errors?: string[];
}
