import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="eyebrow dark">Page not found</div>
      <h1>404 — off the plan.</h1>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <Link className="btn" to="/">
        <Icon name="arrowRight" /> Back to home
      </Link>
    </section>
  );
}
