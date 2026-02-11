import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<
    { name: string; rating: string; review: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setReviews([{ name, rating, review }, ...reviews]);

    setName("");
    setEmail("");
    setRating("");
    setReview("");
  };

  /* Scroll reveal */
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="luxury-page">
      {/* HERO */}
      <section className="hero reveal">
        <h1>Dwarika Naari Jewellery</h1>
        <p>Grace in gold • Power in design • Timeless luxury</p>
      </section>

      {/* REVIEW */}
      <section className="review-section reveal">
        <form className="luxury-card" onSubmit={handleSubmit}>
          <h2>Customer Review</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Overall Experience</option>
            <option value="★★★★★">★★★★★ Excellent</option>
            <option value="★★★★☆">★★★★☆ Very Good</option>
            <option value="★★★☆☆">★★★☆☆ Good</option>
            <option value="★★☆☆☆">★★☆☆☆ Average</option>
            <option value="★☆☆☆☆">★☆☆☆☆ Poor</option>
          </select>

          <textarea
            placeholder="Share your experience with our jewellery & service..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          <button type="submit">Submit Review</button>
        </form>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials reveal">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {reviews.map((r, i) => (
            <div className="testimonial-card" key={i}>
              <h3>{r.name}</h3>
              <span>{r.rating}</span>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about reveal">
        <h2>About Our Jewellery</h2>
        <p>
          Dwarika Nari celebrates modern femininity through handcrafted gold,
          diamond and silver jewellery. Every piece blends heritage artistry with
          contemporary elegance.
        </p>
      </section>

      {/* OFFERS */}
      <section className="offers reveal">
        <h2>Exclusive Offers</h2>
        <div className="offer-grid">
          <div className="offer-card">Bridal Jewellery – 20% Off</div>
          <div className="offer-card">Zero Making Charges</div>
          <div className="offer-card">Diamond Fest – 30% Off</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Dwarika Nari Jewellery • All Rights Reserved
      </footer>
    </div>
  );
}