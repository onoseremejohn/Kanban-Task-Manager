import styled from "styled-components";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
const SocialLinks = () => {
  return (
    <Wrapper className="social-container">
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/onosereme-emuemhonjie-5a5454161/"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" className="social">
              <FaLinkedin />
            </button>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/onoseremejohn"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" className="social">
              <FaTwitter />
            </button>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/onoseremejohn"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" className="social">
              <FaGithub />
            </button>
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 3px;
  top: 30%;
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
    justify-content: center;
    button {
      background: none;
      border: none;
      svg {
        font-size: 2em;
        color: var(--purple);
        transition: var(--transition);
        opacity: 0.5;
        &:hover {
          rotate: 180deg;
          scale: 1.2;
          opacity: 1;
        }
      }
    }
  }
`;

export default SocialLinks;
