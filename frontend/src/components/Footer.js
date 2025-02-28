import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <span className="text-muted">
          Spring PetClinic &copy; {new Date().getFullYear()} | 
          <a href="https://github.com/spring-petclinic/spring-framework-petclinic" target="_blank" rel="noopener noreferrer"> GitHub</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;