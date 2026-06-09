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
      </main>
    </div>
  );
}
