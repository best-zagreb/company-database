import { Link } from "react-router-dom";

export default function Aside() {
  return (
    <aside className="aside">
      <nav>
        <ul>
          <li>
            <Link to="/project/my">My projects</Link>
          </li>
          <li>
            <Link to="/companies/my">My companies</Link>
          </li>

          {/* <li>
            <Link to="/pomoc">pomoc</Link>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}
