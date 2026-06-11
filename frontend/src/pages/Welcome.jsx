import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import styles from './Welcome.module.css';

function parseJwtPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

const CERTIFICATIONS = [
  {
    id: 'sc-500',
    title: 'Cloud and AI Security Engineer Associate',
    exam: 'SC-500',
    level: 'Associate',
    domain: 'Seguridad / IA',
    status: 'Nuevo',
    statusType: 'new',
    description:
      'Nueva certificación que reemplaza AZ-500. Valida el diseño e implementación de entornos seguros con protección de modelos de IA para despliegues empresariales modernos.',
    available: 'Julio 2026',
    url: 'https://learn.microsoft.com/es-es/credentials/certifications/',
  },
  {
    id: 'ai-901',
    title: 'Azure AI Fundamentals',
    exam: 'AI-901',
    level: 'Fundamentals',
    domain: 'Inteligencia Artificial',
    status: 'Nuevo',
    statusType: 'new',
    description:
      'Nueva certificación de fundamentos de IA centrada en conceptos de IA responsable y Microsoft Foundry. Reemplaza AI-900 con mayor enfoque en IA generativa (55–60% del examen).',
    available: '2026',
    url: 'https://learn.microsoft.com/es-es/credentials/certifications/exams/ai-901/',
  },
  {
    id: 'az-104',
    title: 'Azure Administrator Associate',
    exam: 'AZ-104',
    level: 'Associate',
    domain: 'Administración de Azure',
    status: 'Activo',
    statusType: 'active',
    description:
      'Valida habilidades para configurar, administrar y asegurar entornos Azure, incluyendo redes virtuales, almacenamiento, cómputo, identidad, seguridad y gobernanza.',
    available: 'Disponible',
    url: 'https://learn.microsoft.com/es-es/credentials/certifications/azure-administrator/',
  },
  {
    id: 'ai-cloud-dev',
    title: 'Azure AI Cloud Developer Associate',
    exam: 'AZ-204 (sucesor)',
    level: 'Associate',
    domain: 'Desarrollo / IA',
    status: 'Nuevo',
    statusType: 'new',
    description:
      'Nueva certificación que reemplaza Azure Developer Associate. Enfocada en el desarrollo de aplicaciones en la nube con capacidades de IA integradas.',
    available: '2026',
    url: 'https://learn.microsoft.com/es-es/credentials/certifications/',
  },
  {
    id: 'm365-collab',
    title: 'Collaboration Communications Systems Engineer Associate',
    exam: 'MS-721',
    level: 'Associate',
    domain: 'Microsoft 365 / Teams',
    status: 'Actualizado',
    statusType: 'updated',
    description:
      'Certifica habilidades en Microsoft Teams, reuniones y sistemas de comunicación. Actualizado en 2026 como opción de formación para la designación Modern Work Solutions Partner.',
    available: 'Disponible',
    url: 'https://learn.microsoft.com/es-es/credentials/certifications/m365-collaboration-communications-systems-engineer/',
  },
];

export default function Welcome() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const payload = token ? parseJwtPayload(token) : null;
  const username = payload?.sub ?? 'Usuario';

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navLogo}>◆ App</span>
        <button onClick={handleLogout} className={styles.navLogout}>
          Cerrar sesión
        </button>
      </nav>

      <main className={styles.main}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.badge}>Sesión activa</div>
          <h1 className={styles.heading}>
            Bienvenido,<br />{username}
          </h1>
          <p className={styles.body}>
            Has iniciado sesión correctamente. Tu token de acceso está guardado en la sesión
            y será válido por 5 minutos.
          </p>

          <div className={styles.card}>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Usuario</span>
              <span className={styles.cardValue}>{username}</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Estado</span>
              <span className={styles.cardStatus}>
                <span className={styles.statusDot} />
                Autenticado
              </span>
            </div>
            <div className={styles.divider} />
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Token</span>
              <span className={styles.cardToken}>
                {token ? `${token.slice(0, 20)}…` : '—'}
              </span>
            </div>
          </div>

          <button onClick={handleLogout} className={styles.logoutButton}>
            Cerrar sesión
          </button>
        </div>

        <section className={styles.certSection}>
          <div className={styles.certGlow} aria-hidden="true" />
          <div className={styles.certHeader}>
            <h2 className={styles.certHeading}>Certificaciones Microsoft 2026</h2>
            <p className={styles.certSubtitle}>
              Mantén tus habilidades al día con las certificaciones más relevantes del año
            </p>
          </div>
          <div className={styles.certGrid}>
            {CERTIFICATIONS.map((cert) => (
              <a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certCard}
              >
                <div className={styles.certCardTop}>
                  <span className={styles.certExam}>{cert.exam}</span>
                  <span className={`${styles.certStatusBadge} ${styles[`certStatus_${cert.statusType}`]}`}>
                    {cert.status}
                  </span>
                </div>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <p className={styles.certDescription}>{cert.description}</p>
                <div className={styles.certFooter}>
                  <span className={styles.certLevel}>{cert.level}</span>
                  <span className={styles.certDomain}>{cert.domain}</span>
                </div>
                <div className={styles.certAvailable}>
                  <span className={styles.certAvailableLabel}>Disponibilidad</span>
                  <span className={styles.certAvailableValue}>{cert.available}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
