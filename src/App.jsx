import React, { useState, useEffect, useRef } from 'react';
import { Music, BookOpen, Headphones, Instagram, MessageCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

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
    { id: 'trilha', name: 'Trilha Sonora', color: '#ec4899' },
    { id: 'rock', name: 'Rock', color: '#ef4444' },
    { id: 'eletronica', name: 'Eletrônica', color: '#3b82f6' },
    { id: 'hiphop', name: 'Hip Hop', color: '#f59e0b' }
  ];

  // IMPORTANTE: Coloque seus arquivos na pasta /public do seu projeto
  // Estrutura: /public/audio/track1.mp3 e /public/thumbnails/track1.png
  const portfolio = [
    { 
      id: 1, 
      title: 'Ando meio desligado', 
      genre: 'eletronica',
      audioFile: './audio/Ando meio desligado - Eletronica.mp3',
      thumbnail: './thumbnails/desligado.png'
    },
    { 
      id: 2, 
      title: 'Aurora', 
      genre: 'hiphop',
      audioFile: './audio/Aurora - HipHop.wav',
      thumbnail: './thumbnails/aurora.png'
    },
    { 
      id: 3, 
      title: 'Dancing on my problems', 
      genre: 'eletronica',
      audioFile: './audio/Dancing on my problems - Eletronica.mp3',
      thumbnail: './thumbnails/dancing.png'
    },
    { 
      id: 4, 
      title: 'Espacial', 
      genre: 'trilha',
      audioFile: './audio/Espacial - Trilha Sonora.mp3',
      thumbnail: './thumbnails/espacial.png'
    },
    { 
      id: 5, 
      title: 'Fear', 
      genre: 'hiphop',
      audioFile: './audio/Fear - HipHop.mp3',
      thumbnail: './thumbnails/fear.png'
    },
    { 
      id: 6, 
      title: 'Natal', 
      genre: 'rock',
      audioFile: './audio/Natal - Rock.wav',
      thumbnail: './thumbnails/natal.png'
    },
    { 
      id: 7, 
      title: 'Última vez', 
      genre: 'trilha',
      audioFile: './audio/Ultima vez - Trilha Sonora.mp3',
      thumbnail: './thumbnails/ultima.png'
    },
    { 
      id: 8, 
      title: 'Vento', 
      genre: 'trilha',
      audioFile: './audio/Vento - Trilha Sonora.mp3',
      thumbnail: './thumbnails/vento.png'
    }
  ];

  const filteredPortfolio = selectedGenre === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.genre === selectedGenre);

  const handlePlayPause = (item) => {
    if (currentPlaying?.id === item.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentPlaying(item);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = item.audioFile;
        audioRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentPlaying(null);
      };
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  return (
    <div className="app">
      {/* Audio Element */}
      <audio ref={audioRef} />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="./logo.png" alt="Logo" className="logo-icon" />
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
            Transforme sua paixão por música em{' '}
            <span className="gradient-text">conhecimento</span>
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
                <img src="./foto.gif" alt="Foto" />
              </div>
            </div>
            <div className="about-text">
              <h3>Olá! Sou Guitarrista e Produtor Musical</h3>
              <p>
                Após anos de estúdo de teoria e produção musical, decidi compartilhar 
                o conhecimento que adiquiri ao longo desse tempo. Meu objetivo é ajudar as pessoas
                a se expressarem por meio dessa arte. Quer começar? Marque uma aula experimental!
              </p>
              <div className="about-skills">
                <div className="skill-tag">Teoria Musical</div>
                <div className="skill-tag">Produção Musical</div>
                <div className="skill-tag">Mix & Master</div>
                <div className="skill-tag">Composição</div>
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
              <div className="class-price-sub">R$ 50/aula</div>
            </div>

            <div className="class-card">
              <div className="class-icon">
                <Music size={32} />
              </div>
              <h3>Plano 2</h3>
              <p>
                Duas aulas semanais de 1 hora cada, para acelerar resultados. Permite alternar focos (teoria/produção), receber feedbacks frequentes e avançar com cronograma intensivo.
              </p>
              <div className="class-price">R$ 370/mês</div>
              <div className="class-price-sub">R$ 46/aula</div>
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
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)';
                    }}
                  />
                  <div className="portfolio-overlay">
                    <button className="play-btn" onClick={() => handlePlayPause(item)}>
                      {currentPlaying?.id === item.id && isPlaying ? (
                        <Pause size={24} fill="white" />
                      ) : (
                        <Play size={24} fill="white" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <div className="portfolio-meta">
                    <span className="genre-badge">{genres.find(g => g.id === item.genre)?.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Audio Player */}
          {currentPlaying && (
            <div style={{
              background: 'var(--dark-light)',
              border: '4px solid var(--primary)',
              borderRadius: '0',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '2rem',
              boxShadow: '8px 8px 0 rgba(0, 0, 0, 0.5)',
              animation: 'fadeInUp 0.3s ease-out'
            }}>
              <button 
                onClick={() => handlePlayPause(currentPlaying)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '0',
                  background: 'var(--primary)',
                  border: '3px solid var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0 var(--accent)',
                  transition: 'all 0.3s ease',
                  flexShrink: '0'
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div style={{ flex: '1', minWidth: '0' }}>
                <div style={{ fontWeight: '800', color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                  {currentPlaying.title}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray)', fontWeight: '700' }}>
                  {genres.find(g => g.id === currentPlaying.genre)?.name}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: '0' }}>
                <button 
                  onClick={toggleMute}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--gray)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: '100px',
                    accentColor: 'var(--primary)'
                  }}
                />
              </div>
            </div>
          )}
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

                <a href="https://instagram.com/juan_mends" className="contact-method" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon instagram">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <div className="contact-label">Instagram</div>
                    <div className="contact-value">@juan_mends</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="contact-cta">
              <div className="cta-card">
                <h3>Agende sua Aula Experimental</h3>
                <p>Primeira aula gratuita para novos alunos!</p>
                <a href="https://wa.me/5521983085882?text=Olá! Gostaria de agendar uma aula experimental." className="btn-primary-large" target="_blank" rel="noopener noreferrer">
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