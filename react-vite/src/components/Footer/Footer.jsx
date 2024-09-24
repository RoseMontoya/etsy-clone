import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div>
        <h4>Meet the team</h4>
      </div>
      <div className="team">
        <div className="team-member">
          <div>
            <a href="https://laiba-afzal-portfolio.netlify.app/">
              <img src="/images/Laiba.webp" alt="Laiba" />
            </a>
          </div>
          <div className="member-info">
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
        </div>

        <div className="team-member">
          <div>
            <a href="https://rose-montoya.netlify.app/">
              <img src="/images/Rose.png" alt="Rose" />
            </a>
          </div>
          <div>
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
        </div>
        <div className="team-member">
          <div>
            <a href="https://portfolio-sarah-jiang.netlify.app/">
              <img src="/images/Sarah.JPG" alt="Sarah" />
            </a>
          </div>
          <div>
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
        </div>
        <div className="team-member">
          <div>
            <a href="https://portifolio-rpiy.onrender.com/">
              <img src="/images/Shanda.png" alt="Shanda" />
            </a>
          </div>
          <div>
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
      </div>
      <div className="inspiration">
        <p>
          ArtisanAlley is an Etsy inspired application by App Academy April
          Cohort Team Alpha
        </p>
      </div>
    </footer>
  );
}

export default Footer;
