const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Privacy</a>
          <a className="link link-hover">Terms</a>
        </div>
      </nav>
      <aside>
        <p>© 2024 AI Knowledge Base. All rights reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;

