import { useState } from "react";

export default function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="page">
      <main className="card">
        <h1 className="title">Customer Feedback</h1>
        <p className="subtitle">
          Please share your details so we can follow up with you.
        </p>

        <form
          className="form"
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSubmitting(true);
            setMessage(null);
            setError(null);

            const form = e.currentTarget;
            const data = new FormData(form);

            const payload = {
              name: data.get("name") as string,
              email: data.get("email") as string,
              phone: data.get("phone") as string,
            };

            try {
              const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });

              if (!res.ok) {
                const body = (await res.json().catch(() => null)) as
                  | { message?: string }
                  | null;
                throw new Error(body?.message || "Failed to submit feedback");
              }

              setMessage("Thank you! Your feedback was saved.");
              form.reset();
            } catch (err: any) {
              setError(err.message || "Something went wrong. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 555 000 1234"
              required
            />
          </div>

          <button type="submit" className="button" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit feedback"}
          </button>
        </form>

        {message && <p className="status status--success">{message}</p>}
        {error && <p className="status status--error">{error}</p>}
      </main>
    </div>
  );
}

