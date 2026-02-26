export default function Home() {
  return (
    <div className="page">
      <main className="card">
        <h1 className="title">Customer Feedback</h1>
        <p className="subtitle">
          Please share your details so we can follow up with you.
        </p>

        <form
          className="form"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const name = data.get("name") as string | null;
            alert(`Thank you, ${name || "customer"}! Your feedback was sent.`);
            form.reset();
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

          <button type="submit" className="button">
            Submit feedback
          </button>
        </form>
      </main>
    </div>
  );
}

