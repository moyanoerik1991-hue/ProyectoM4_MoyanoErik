import { Link } from "react-router-dom";
import "./../components/styles/HomePage.css";

export const HomePage = () => {
    return (
        <main className="home">

            {/* HERO */}
            <section className="home__hero">
                <div className="home__hero-content">

                    <h1>
                        Bienvenido a{" "}
                        <span>UniversalTask</span>
                    </h1>

                    <p className="home__hero-description">
                        Organiza tus tareas, controla tus fechas límite
                        y mantén el seguimiento de tus actividades
                        en un solo lugar.
                    </p>

                    <div className="home__hero-actions">
                        <Link
                            to="/auth"
                            className="home__button home__button--primary"
                        >
                            Comenzar ahora
                        </Link>

                        <a
                            href="#funcionalidades"
                            className="home__button home__button--secondary"
                        >
                            Conocer más
                        </a>
                    </div>
                </div>

                <div className="home__hero-card">
                    <div className="home__task-preview">
                        <div className="home__task-preview-header">
                            <span>Tus tareas</span>
                            <span>Hoy</span>
                        </div>

                        <div className="home__task">
                            <div>
                                <strong>Preparar proyecto</strong>
                                <small>Entrega próxima</small>
                            </div>

                            <span className="home__task-time">
                                02:45:18
                            </span>
                        </div>

                        <div className="home__task">
                            <div>
                                <strong>Estudiar TypeScript</strong>
                                <small>En progreso</small>
                            </div>

                            <span className="home__task-status">
                                Pendiente
                            </span>
                        </div>

                        <div className="home__task home__task--completed">
                            <div>
                                <strong>Revisar documentación</strong>
                                <small>Completada</small>
                            </div>

                            <span>✓</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FUNCIONALIDADES */}
            <section
                id="funcionalidades"
                className="home__section"
            >
                <div className="home__section-heading">
                    <span className="home__section-label">
                        Todo lo que necesitas
                    </span>

                    <h2>
                        Organiza tus tareas de forma sencilla
                    </h2>

                    <p>
                        UniversalTask reúne las herramientas necesarias
                        para que puedas administrar tus actividades y
                        conocer en todo momento qué tienes pendiente.
                    </p>
                </div>

                <div className="home__features">

                    <article className="home__feature">
                        <div className="home__feature-icon">
                            📋
                        </div>

                        <h3>Gestiona tus tareas</h3>

                        <p>
                            Crea, edita y elimina tareas utilizando
                            título, descripción, categoría y fecha límite.
                        </p>
                    </article>

                    <article className="home__feature">
                        <div className="home__feature-icon">
                            ⏱️
                        </div>

                        <h3>Controla el tiempo</h3>

                        <p>
                            Consulta un temporizador que muestra cuánto
                            tiempo queda para completar cada tarea.
                        </p>
                    </article>

                    <article className="home__feature">
                        <div className="home__feature-icon">
                            🔎
                        </div>

                        <h3>Filtra rápidamente</h3>

                        <p>
                            Encuentra lo que necesitas utilizando filtros
                            por categoría y estado de la tarea.
                        </p>
                    </article>

                    <article className="home__feature">
                        <div className="home__feature-icon">
                            📧
                        </div>

                        <h3>Recibe notificaciones</h3>

                        <p>
                            Envía a tu correo un resumen de tus tareas
                            completadas, pendientes y próximas a vencer.
                        </p>
                    </article>

                </div>
            </section>

            {/* COMO FUNCIONA */}
            <section className="home__how-it-works">
                <div className="home__section-heading">
                    <span className="home__section-label">
                        ¿Cómo funciona?
                    </span>

                    <h2>
                        Empieza a organizarte en pocos pasos
                    </h2>
                </div>

                <div className="home__steps">

                    <div className="home__step">
                        <span className="home__step-number">
                            01
                        </span>

                        <div>
                            <h3>Crea tu cuenta</h3>
                            <p>
                                Regístrate para acceder a tu espacio
                                personal de tareas.
                            </p>
                        </div>
                    </div>

                    <div className="home__step">
                        <span className="home__step-number">
                            02
                        </span>

                        <div>
                            <h3>Agenda tus actividades</h3>
                            <p>
                                Define qué debes hacer y establece
                                una fecha límite.
                            </p>
                        </div>
                    </div>

                    <div className="home__step">
                        <span className="home__step-number">
                            03
                        </span>

                        <div>
                            <h3>Controla tu progreso</h3>
                            <p>
                                Utiliza los filtros, temporizadores
                                y notificaciones para mantener todo
                                bajo control.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* PRESENTACIÓN */}
            <section className="home__about">
                <div>
                    <span className="home__section-label">
                        Sobre UniversalTask
                    </span>

                    <h2>
                        Una aplicación pensada para simplificar
                        tu organización.
                    </h2>
                </div>

                <div>
                    <p>
                        UniversalTask nace como una propuesta para
                        centralizar la gestión de tareas y facilitar
                        el seguimiento de nuestras actividades
                        cotidianas.
                    </p>

                    <p>
                        Buscamos ofrecer una experiencia sencilla,
                        clara y práctica, donde puedas saber qué
                        debes hacer, cuánto tiempo tienes disponible
                        y cuáles son tus próximos compromisos.
                    </p>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="home__cta">
                <h2>
                    ¿Listo para organizar tus tareas?
                </h2>

                <p>
                    Crea tu cuenta y comienza a utilizar UniversalTask.
                </p>

                <Link
                    to="/auth"
                    className="home__button home__button--primary"
                >
                    Empezar ahora
                </Link>
            </section>

        </main>
    );
};