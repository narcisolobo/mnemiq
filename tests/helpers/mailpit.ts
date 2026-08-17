const MAILPIT_URL = "http://127.0.0.1:54424";

interface MailpitMessage {
  ID: string;
}

// Polls Mailpit for the most recent email to `recipient`, since GoTrue
// sends it asynchronously after the triggering API call returns.
async function waitForEmail(
  recipient: string,
  { timeoutMs = 10_000, intervalMs = 250 } = {},
): Promise<string> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const res = await fetch(
      `${MAILPIT_URL}/api/v1/search?query=${encodeURIComponent(`to:${recipient}`)}`,
    );
    const { messages } = (await res.json()) as { messages: MailpitMessage[] };

    if (messages.length > 0) {
      const detail = await fetch(
        `${MAILPIT_URL}/api/v1/message/${messages[0].ID}`,
      );
      const { HTML, Text } = (await detail.json()) as {
        HTML?: string;
        Text?: string;
      };
      return HTML ?? Text ?? "";
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`No email to ${recipient} arrived within ${timeoutMs}ms`);
}

export { waitForEmail };
