import logo from "./images/dnj-logo.png";
import { useState, useEffect } from "react";
import "./App.css";

interface Review {
  name: string;
  rating: string;
  review: string;
}

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);

  /* Load saved reviews */
  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  /* Save reviews whenever updated */
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReview: Review = { name, rating, review };

    setReviews([newReview, ...reviews]);

    setName("");
    setEmail("");
    setRating("");
    setReview("");
  };

  const deleteReview = (index: number) => {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
  };

  return (
    <div className="luxury-page">

      {/* HERO */}
<section className="hero">
  <img src={logo} alt="Dwarika Naari Jewellery Logo" className="hero-logo" />
  <h1>Dwarika Naari Jewellery</h1>
  <p>Grace in gold • Power in design • Timeless luxury</p>
</section>

      {/* REVIEW FORM */}
      <section className="review-section">
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
      <section className="testimonials">
        <h2>What Our Customers Say</h2>

        <div className="testimonial-grid">
          {(showAll ? reviews : reviews.slice(0, 3)).map((r, i) => (
            <div
  className="testimonial-card"
  key={i}
  onDoubleClick={() => {
    if (window.confirm("Delete this review?")) {
      deleteReview(i);
    }
  }}
>
              <h3>{r.name}</h3>
              <span>{r.rating}</span>
              <p>{r.review}</p>
            </div>
          ))}
        </div>

        {reviews.length > 3 && (
          <button
            className="see-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About Our Jewellery</h2>
        <p>
          Dwarika Naari celebrates modern femininity through handcrafted gold,
          diamond and silver jewellery. Every piece blends heritage artistry with
          contemporary elegance.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Dwarika Naari Jewellery • All Rights Reserved
      </footer>
    </div>
  );
}