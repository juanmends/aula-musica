import React, { useState, useEffect } from 'react';
import { Music, BookOpen, Headphones, Mail, Instagram, Phone, MessageCircle, Play, Award, Users, Clock } from 'lucide-react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'classes', 'portfolio', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const genres = [
    { id: 'all', name: 'Todos', color: '#8b5cf6' },
    { id: 'pop', name: 'Pop', color: '#ec4899' },
    { id: 'rock', name: 'Rock', color: '#ef4444' },
    { id: 'eletronica', name: 'Eletrônica', color: '#3b82f6' },
    { id: 'hiphop', name: 'Hip Hop', color: '#f59e0b' }
  ];

  const portfolio = [
    { id: 1, title: 'Summer Vibes', genre: 'pop', plays: '2.5K', image: '🎵' },
    { id: 2, title: 'Electric Dreams', genre: 'eletronica', plays: '3.8K', image: '⚡' },
    { id: 3, title: 'Urban Flow', genre: 'hiphop', plays: '1.9K', image: '🎤' },
    { id: 4, title: 'Midnight Blues', genre: 'eletronica', plays: '2.1K', image: '🎷' },
    { id: 5, title: 'Rock Anthem', genre: 'rock', plays: '4.2K', image: '🎸' },
    { id: 6, title: 'Synthwave Night', genre: 'eletronica', plays: '3.3K', image: '🌆' }
  ];

  const filteredPortfolio = selectedGenre === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.genre === selectedGenre);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Music className="logo-icon" />
            <span>Juan Mendes</span>
          </div>
          <ul className="nav-menu">
            {['home', 'about', 'classes', 'portfolio', 'contact'].map(section => (
              <li key={section}>
                <button
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={() => scrollToSection(section)}
                >
                  {section === 'home' ? 'Início' :
                   section === 'about' ? 'Sobre' :
                   section === 'classes' ? 'Aulas' :
                   section === 'portfolio' ? 'Portfólio' : 'Contato'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Transforme sua paixão por música em
            <span className="gradient-text"> conhecimento profissional</span>
          </h1>
          <p className="hero-subtitle">
            Aulas personalizadas de teoria musical e produção musical com foco em resultados práticos
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollToSection('classes')}>
              <BookOpen size={20} />
              Conhecer as Aulas
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
              <MessageCircle size={20} />
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sobre Mim</h2>
            <p className="section-subtitle">Conheça minha trajetória musical</p>
          </div>
          <div className="about-content">
            <div className="about-image">
              <div className="about-image-placeholder">
                <Music size={80} />
              </div>
            </div>
            <div className="about-text">
              <h3>Olá! Sou Guitarrista e Produtor Musical</h3>
              <p>
                Com mais de 5 anos de experiência no mercado musical, dedico-me a compartilhar 
                conhecimento e ajudar pessoas a realizarem seus sonhos musicais. Minha formação 
                abrange teoria musical, harmonia, composição e produção em estúdio.
              </p>
              <p>
                Trabalhei com diversos artistas e produzi tracks em múltiplos gêneros musicais. 
                Acredito que música é uma linguagem universal e meu objetivo é tornar o aprendizado 
                acessível, prático e divertido para todos os níveis.
              </p>
              <div className="about-skills">
                <div className="skill-tag">Teoria Musical</div>
                <div className="skill-tag">Produção Musical</div>
                <div className="skill-tag">Mix & Master</div>
                <div className="skill-tag">Composição</div>
                <div className="skill-tag">Arranjo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="classes">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Minhas Aulas</h2>
            <p className="section-subtitle">Escolha o plano ideal para você</p>
          </div>
          <div className="classes-grid">
            <div className="class-card">
              <div className="class-icon">
                <BookOpen size={32} />
              </div>
              <h3>Aula Avulsa</h3>
              <p>
                Sessão única de 1 hora, focada nas suas necessidades imediatas (teoria, dúvidas, revisão ou produção). Agendamento flexível, com orientações de estudo ao final.
              </p>
              <div className="class-price">R$ 60/aula</div>
            </div>

            <div className="class-card featured">
              <div className="featured-badge">Mais Popular</div>
              <div className="class-icon">
                <Headphones size={32} />
              </div>
              <h3>Plano 1</h3>
              <p>
                Uma aula semanal de 1 hora, em dia fixo. Ideal para ritmo constante, com materiais e exercícios entre os encontros e possibilidade de reagendamento pontual.
              </p>
              <div className="class-price">R$ 200/mês</div>
            </div>

            <div className="class-card">
              <div className="class-icon">
                <Music size={32} />
              </div>
              <h3>Plano 2</h3>
              <p>
                Duas aulas semanais de 1 hora cada, para acelerar resultados. Permite alternar focos (harmonia/produção), receber feedbacks frequentes e avançar com cronograma intensivo.
              </p>
              <div className="class-price">R$ 370/mês</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meu Portfólio</h2>
            <p className="section-subtitle">Confira alguns dos meus trabalhos</p>
          </div>
          
          <div className="genre-filters">
            {genres.map(genre => (
              <button
                key={genre.id}
                className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre.id)}
                style={{ '--genre-color': genre.color }}
              >
                {genre.name}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredPortfolio.map(item => (
              <div key={item.id} className="portfolio-card">
                <div className="portfolio-image">
                  <span className="portfolio-emoji">{item.image}</span>
                  <div className="portfolio-overlay">
                    <button className="play-btn">
                      <Play size={24} fill="white" />
                    </button>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <div className="portfolio-meta">
                    <span className="genre-badge">{genres.find(g => g.id === item.genre)?.name}</span>
                    <span className="plays">{item.plays} plays</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Vamos Conversar?</h2>
            <p className="section-subtitle">Entre em contato e comece sua jornada musical hoje</p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Fale Comigo</h3>
              <p>Estou sempre disponível para responder suas dúvidas e ajudar você a alcançar seus objetivos musicais.</p>
              
              <div className="contact-methods">
                <a href="https://wa.me/5521983085882" className="contact-method" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon whatsapp">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <div className="contact-label">WhatsApp</div>
                    <div className="contact-value">(21) 98308-5882</div>
                  </div>
                </a>

                <a href="tel:+5521983085882" className="contact-method">
                  <div className="contact-icon phone">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="contact-label">Telefone</div>
                    <div className="contact-value">(21) 98308-5882</div>
                  </div>
                </a>

                <a href="https://instagram.com/juan_mends" className="contact-method" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon instagram">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <div className="contact-label">Instagram</div>
                    <div className="contact-value">@juan_mends</div>
                  </div>
                </a>

                <a href="mends.juan@gmail.com" className="contact-method">
                  <div className="contact-icon email">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">mends.juan@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="contact-cta">
              <div className="cta-card">
                <h3>Agende sua Aula Experimental</h3>
                <p>Primeira aula com 50% de desconto para novos alunos!</p>
                <a href="https://wa.me/5521999999999?text=Olá! Gostaria de agendar uma aula experimental." className="btn-primary-large" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} />
                  Agendar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Music size={32} />
              <span>Juan Mendes</span>
            </div>
            <p>Transformando paixão em conhecimento musical</p>
            <div className="footer-social">
              <a href="https://instagram.com/juan_mends" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/5521983085882" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          <div className="footer-bottom"></div>
        </div>
      </footer>
    </div>
  );
}

export default App;