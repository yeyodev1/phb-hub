import type { Intent, IntentId, QuizQuestion } from '@/types'
import { EXTERNAL } from '@/config/destinations'

/** Las 6 intenciones del hero — "¿Qué estás buscando hoy?" */
export const INTENTS: Intent[] = [
  {
    id: 'aprender',
    icon: 'fa-solid fa-brain',
    title: 'Quiero aprender sobre mi salud',
    description: 'Cursos, libros, guías y contenidos educativos.',
    stage: 'Comprender',
    destination: { kind: 'internal', target: '/aprende' },
    ctaLabel: 'Ver mi biblioteca recomendada',
  },
  {
    id: 'evaluar',
    icon: 'fa-solid fa-chart-simple',
    title: 'Quiero evaluar mi salud',
    description: 'Evaluaciones, biomarcadores e interpretación clínica.',
    stage: 'Evaluar',
    // Primero la página que muestra las 7 evaluaciones; el formulario viene después.
    destination: { kind: 'external', target: EXTERNAL.evaluate },
    ctaLabel: 'Ver mis evaluaciones PHB',
  },
  {
    id: 'cambiar',
    icon: 'fa-solid fa-bolt',
    title: 'Quiero empezar a cambiar',
    description: 'Programas para convertir conocimiento en acción.',
    stage: 'Actuar',
    destination: { kind: 'internal', target: '/actua' },
    ctaLabel: 'Ver mi programa ACTÚA',
  },
  {
    id: 'regenerar',
    icon: 'fa-solid fa-dna',
    title: 'Quiero explorar medicina regenerativa',
    description: 'Conoce opciones, tratamientos y programas regenerativos.',
    stage: 'Regenerar',
    destination: { kind: 'internal', target: '/regeneracion' },
    ctaLabel: 'Evaluar mi candidatura',
  },
  {
    id: 'conferencia',
    icon: 'fa-solid fa-microphone',
    title: 'Quiero contratar una conferencia',
    description: 'Conferencias para empresas, instituciones y eventos.',
    stage: 'Difundir',
    destination: { kind: 'internal', target: '/conferencias' },
    ctaLabel: 'Ver conferencias disponibles',
  },
  {
    id: 'empresa',
    icon: 'fa-solid fa-briefcase',
    title: 'Quiero llevar PHB a mi empresa',
    description: 'Programas de salud, prevención y bienestar para organizaciones.',
    stage: 'Escalar',
    destination: { kind: 'internal', target: '/empresas' },
    ctaLabel: 'Diseñar mi programa corporativo',
  },
]

export const getIntent = (id: IntentId): Intent =>
  INTENTS.find((i) => i.id === id) as Intent

/** 3 preguntas por intención. Segmentan sin fatigar. */
export const QUIZ: Record<IntentId, QuizQuestion[]> = {
  aprender: [
    {
      id: 'punto-partida',
      question: '¿Desde dónde partes hoy?',
      helper: 'No hay respuesta incorrecta. Solo queremos ubicarte.',
      options: [
        { value: 'cero', label: 'Empiezo de cero', hint: 'Quiero entender lo básico' },
        { value: 'estudios', label: 'Tengo estudios que no sé leer', hint: 'Análisis clínicos en mano' },
        { value: 'diagnostico', label: 'Ya tengo un diagnóstico', hint: 'Quiero profundizar' },
        { value: 'prevencion', label: 'Estoy sano y quiero seguir así', hint: 'Prevención y longevidad' },
      ],
    },
    {
      id: 'tema',
      question: '¿Qué quieres entender mejor?',
      options: [
        { value: 'biomarcadores', label: 'Mis biomarcadores' },
        { value: 'riesgo', label: 'Mi riesgo de enfermedad' },
        { value: 'comportamiento', label: 'Mi comportamiento' },
        { value: 'recuperacion', label: 'Mi capacidad de recuperación' },
        { value: 'longevidad', label: 'Mi longevidad' },
      ],
    },
    {
      id: 'formato',
      question: '¿Cómo prefieres aprender?',
      options: [
        { value: 'lectura', label: 'Leyendo', hint: 'Libros y guías digitales' },
        { value: 'video', label: 'Viendo', hint: 'Masterclasses y cursos' },
        { value: 'gratis', label: 'Empezar sin costo', hint: 'Recursos gratuitos primero' },
      ],
    },
  ],
  evaluar: [
    {
      id: 'situacion',
      question: '¿Cuál describe mejor tu situación?',
      options: [
        { value: 'primera-vision', label: 'Quiero una primera visión de mi salud', hint: 'PHB Basic' },
        { value: 'tengo-analisis', label: 'Ya tengo análisis clínicos', hint: 'PHB Biomarkers' },
        { value: 'varias-condiciones', label: 'Tengo varias condiciones o síntomas', hint: 'PHB Multisystem' },
        { value: 'regenerativa', label: 'Estoy considerando medicina regenerativa', hint: 'PHB Regenerative Capacity' },
        { value: 'completa', label: 'Quiero la evaluación más completa', hint: 'PHB Precision' },
      ],
    },
    {
      id: 'urgencia',
      question: '¿Qué te trae hoy?',
      options: [
        { value: 'sintomas', label: 'Tengo síntomas que no entiendo' },
        { value: 'seguimiento', label: 'Quiero dar seguimiento a algo conocido' },
        { value: 'prevencion', label: 'Prevenir antes de que aparezca algo' },
        { value: 'decision', label: 'Debo tomar una decisión importante pronto' },
      ],
    },
    {
      id: 'estudios',
      question: '¿Cuándo fue tu último estudio de laboratorio?',
      options: [
        { value: 'reciente', label: 'Hace menos de 6 meses' },
        { value: 'anio', label: 'Entre 6 meses y 2 años' },
        { value: 'lejano', label: 'Hace más de 2 años' },
        { value: 'nunca', label: 'Nunca me he hecho uno' },
      ],
    },
  ],
  cambiar: [
    {
      id: 'obstaculo',
      question: '¿Qué te ha impedido sostener el cambio?',
      helper: 'Saber qué hacer no es lo mismo que hacerlo.',
      options: [
        { value: 'tiempo', label: 'Falta de tiempo' },
        { value: 'constancia', label: 'Empiezo pero no sostengo' },
        { value: 'claridad', label: 'No sé por dónde empezar' },
        { value: 'motivacion', label: 'Solo actúo cuando algo me asusta' },
      ],
    },
    {
      id: 'foco',
      question: '¿Dónde quieres el primer resultado?',
      options: [
        { value: 'metabolico', label: 'Peso, glucosa y metabolismo' },
        { value: 'energia', label: 'Energía y sueño' },
        { value: 'movimiento', label: 'Movimiento y fuerza' },
        { value: 'mental', label: 'Estrés y claridad mental' },
      ],
    },
    {
      id: 'acompanamiento',
      question: '¿Cuánto acompañamiento quieres?',
      options: [
        { value: 'autonomo', label: 'Autónomo', hint: 'Yo llevo el ritmo' },
        { value: 'grupal', label: 'En grupo', hint: 'Retos y comunidad' },
        { value: 'uno-a-uno', label: 'Uno a uno', hint: 'Seguimiento cercano' },
      ],
    },
  ],
  regenerar: [
    {
      id: 'motivo',
      question: '¿Qué te lleva a explorar medicina regenerativa?',
      options: [
        { value: 'articular', label: 'Dolor articular o lesión' },
        { value: 'metabolico', label: 'Condición metabólica crónica' },
        { value: 'envejecimiento', label: 'Healthy aging y función' },
        { value: 'multisistemico', label: 'Varias condiciones a la vez' },
      ],
    },
    {
      id: 'tiempo',
      question: '¿Hace cuánto tiempo vives con esta condición?',
      options: [
        { value: 'meses', label: 'Menos de 6 meses' },
        { value: 'anios', label: 'Entre 1 y 5 años' },
        { value: 'cronico', label: 'Más de 5 años' },
      ],
    },
    {
      id: 'estudios-previos',
      question: '¿Cuentas con estudios o diagnóstico previo?',
      helper: 'La candidatura clínica siempre se evalúa antes de proponer algo.',
      options: [
        { value: 'completos', label: 'Sí, estudios e imagen recientes' },
        { value: 'parciales', label: 'Algunos, pero no recientes' },
        { value: 'ninguno', label: 'Todavía ninguno' },
      ],
    },
  ],
  conferencia: [
    {
      id: 'organizacion',
      question: '¿Para qué tipo de audiencia?',
      options: [
        { value: 'empresa', label: 'Empresa' },
        { value: 'hospital', label: 'Hospital o institución de salud' },
        { value: 'universidad', label: 'Universidad o asociación' },
        { value: 'evento', label: 'Evento o congreso privado' },
      ],
    },
    {
      id: 'formato',
      question: '¿Formato del evento?',
      options: [
        { value: 'presencial', label: 'Presencial' },
        { value: 'virtual', label: 'Virtual' },
        { value: 'hibrido', label: 'Híbrido' },
      ],
    },
    {
      id: 'fecha',
      question: '¿Cuándo sería?',
      options: [
        { value: 'mes', label: 'En menos de un mes' },
        { value: 'trimestre', label: 'En los próximos 3 meses' },
        { value: 'explorando', label: 'Aún explorando fechas' },
      ],
    },
  ],
  empresa: [
    {
      id: 'tamano',
      question: '¿Cuántos colaboradores tiene tu organización?',
      options: [
        { value: '1-50', label: 'Hasta 50' },
        { value: '51-250', label: '51 a 250' },
        { value: '251-1000', label: '251 a 1,000' },
        { value: '1000+', label: 'Más de 1,000' },
      ],
    },
    {
      id: 'objetivo',
      question: '¿Cuál es el objetivo principal?',
      options: [
        { value: 'directivos', label: 'Salud de directivos', hint: 'PHB Executive Health' },
        { value: 'poblacional', label: 'Evaluación poblacional', hint: 'PHB Workforce Health' },
        { value: 'activacion', label: 'Activación conductual', hint: 'ACTÚA Empresas' },
        { value: 'paquete', label: 'Conferencia + evaluación + programa' },
      ],
    },
    {
      id: 'momento',
      question: '¿En qué punto están?',
      options: [
        { value: 'presupuesto', label: 'Con presupuesto aprobado' },
        { value: 'propuesta', label: 'Necesitamos una propuesta formal' },
        { value: 'explorando', label: 'Explorando opciones' },
      ],
    },
  ],
}
