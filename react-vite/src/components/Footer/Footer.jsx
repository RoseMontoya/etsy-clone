import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h4>Meet the team</h4>
        </div>
        <div className="team">
          <div className="team-member">
            <p>Laiba Afzal</p>
            <div className="team-link">
              <a href="https://github.com/lai-baa">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/laibaafzal">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="team-member">
            <p>Rose Montoya</p>
            <div className="team-link">
              <a href="https://github.com/RoseMontoya">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/rose-montoya/">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="team-member">
            <p>Sarah Jiang</p>
            <div className="team-link">
              <a href="https://github.com/o0saraho0">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/sarah-yue-jiang/">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="team-member">
            <p>Shanda Wang</p>
            <div className="team-link">
              <a href="https://github.com/shandawang1005">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/shanda-wang/">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="inspiration">
          <p>
            ArtisanAlley is an Etsy inspired application by App Academy April
            Cohort Team Alpha
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
