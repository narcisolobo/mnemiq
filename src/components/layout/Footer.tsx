function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 border-base-300 flex-none border-t p-10">
      <nav>
        <h6 className="footer-title">Product</h6>
        <a className="link link-hover">Components</a>
        <a className="link link-hover">Themes</a>
        <a className="link link-hover">Docs</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms</a>
        <a className="link link-hover">Privacy</a>
      </nav>
    </footer>
  );
}

export default Footer;
