# Investigación de diseño — webs de salones de uñas → DESIGN.md de The Coco Club

Fecha: 25 de noviembre de 2026. Todo lo que sigue se verificó hoy en páginas reales; nada sale de
memoria. Los sitios citados son de terceros: se estudiaron **patrones**, no se copió contenido,
imágenes ni marcas.

## 1. Resumen

- **Qué se hizo:** búsqueda de las mejores webs de salones de uñas (68 sitios reales encontrados en
  6 frentes: premios y galerías, EE. UU./Canadá, Reino Unido/Irlanda, estudios privados de una sola
  técnica, cuidado de pies y mercado local de Jersey/Guernsey). Se capturaron **51** en escritorio
  (1440 px) y móvil (390 px), se midieron programáticamente y **21** se analizaron a fondo, uno por
  uno, con capturas y datos del DOM. Se sumó evidencia de UX/legal con fuentes primarias y 25
  patrones de la biblioteca Mobbin.
- **Resultado:** `DESIGN.md` nuevo en la raíz del repo, en el formato oficial que lee Google Stitch
  (tokens en YAML + secciones en prosa). Pasa el linter oficial de DESIGN.md con **0 errores y 0
  avisos**. Está en inglés porque el repo y la web (en-GB) están en inglés y Stitch trabaja mejor así.
- **Conclusión principal:** las mejores webs de estudios pequeños no ganan por la foto del héroe sino
  por cuatro cosas: **precio y duración en cada servicio**, **ayuda para elegir entre servicios
  parecidos**, **decir qué pasa después de pulsar el botón** y **confianza basada en hechos
  comprobables** (higiene, una clienta a la vez), no en estrellas. El sitio actual ya hace bien
  buena parte de esto; el `DESIGN.md` lo fija como regla y añade lo que falta.

## 2. Método y límites (para saber cuánto fiarse)

| Paso | Qué | Resultado |
| ---- | --- | --------- |
| Descubrimiento | 6 agentes de búsqueda, cada uno por un ángulo distinto, consultas genéricas (sin nombrar a la clienta) | 75 candidatos → 68 sitios únicos, todos abiertos hoy |
| Captura | Navegador headless propio (no el compartido), escritorio + móvil, hasta 4 subpáginas por sitio | 51 de 58 capturados |
| Descartados | No se describen sitios que no se pudieron ver | bisouny.com, thenailspa.com y shelikes-jsy.com bloquearon el navegador automatizado; seiva.je y glamourhouse.je colgaron el navegador; envy.je y glambeauty.gg no respondieron en dos intentos |
| Medición | Script sobre los 51: precios, duraciones, CTAs, barras fijas, plataformas, tipografías | Tabla en §4 |
| Análisis profundo | 1 analista por sitio, con capturas reales + datos del DOM, valores numéricos solo del DOM | 21 de 24 completos. Milk Nails, Yulia Hamilton y Richmond Beauty Therapist fallaron (límite de uso / sobrecarga de la API) y quedan solo como capturas |
| Evidencia | UX (NN/g, Baymard, W3C, Google), legal UK y **Jersey** con textos legales leídos | 35 hallazgos con fuente |
| Stitch | Docs oficiales, API en vivo, repos de Google | Formato, fuentes admitidas, cómo subir el archivo |

Límites honestos: las puntuaciones (1–5) son juicio de diseño, no medición. Varias capturas son
parciales (pop-ups de cookies, carruseles a medias); cada análisis lo declara. No se probó Stitch
con una cuenta real (no hay servidor MCP de Stitch conectado en esta sesión).

## 3. Los 21 sitios analizados a fondo

Puntuación 1–5 (3 = competente para un estudio pequeño, 5 = referencia). Columnas: global, menú de
servicios, camino de reserva, dirección de arte, móvil, confianza.

| Sitio | Tipo | Global | Menú | Reserva | Arte | Móvil | Confianza |
| ----- | ---- | :-: | :-: | :-: | :-: | :-: | :-: |
| [The Nail Editor](https://thenaileditor.com/) | estudio privado (UK) | 4 | 4 | 4 | 3 | 4 | 5 |
| [Zachwyt](https://www.zachwyt.rzeszow.pl/) | estudio de una persona (Polonia) | 4 | 4 | 3 | 4 | 3 | 4 |
| [Paint Nails London](https://paintnailslondon.co.uk/) | boutique (UK) | 4 | 4 | 3 | 4 | 4 | 4 |
| [Ovora Atelier](https://ovoratelier.com/) | estudio privado (EE. UU.) | 4 | 4 | 3 | 4 | 3 | 4 |
| [Little Nail Lab](https://www.littlenaillab.com/) | estudio en casa (Australia) | 4 | 3 | 3 | 4 | 3 | 4 |
| [MedPedicure Center](https://medpedicurecenter.com/) | cuidado de pies (EE. UU.) | 4 | 4 | 3 | 2 | 4 | 4 |
| [GA Salons — nail care](https://gasalons.com/nailcare) | premium (UK) | 4 | 3 | 2 | 4 | 3 | 4 |
| [Becca Nail Studio](https://beccanails.com/) | estudio privado (EE. UU.) | 3 | 4 | 4 | 3 | 3 | 3 |
| [cureate nails](https://cureatenails.com/) | estudio privado (EE. UU.) | 3 | 4 | 3 | 3 | 3 | 3 |
| [HORTUS New York](https://hortusnewyork.com/) | boutique (EE. UU.) | 3 | 4 | 2 | 3 | 3 | 3 |
| [Solid Nail](https://solidnail.uk/) | boutique (UK) | 3 | 3 | 4 | 3 | 3 | 3 |
| [Missy Lui](https://missylui.com.au/) | boutique (Australia) | 3 | 3 | 3 | 3 | 3 | 4 |
| [Canvas10](https://www.canvas10.co.uk/) | local comparable (Isla de Wight) | 3 | 4 | 3 | 3 | 3 | 3 |
| [Andreea's Nail Studio](https://andreeasnailstudio.com/) | estudio privado, formulario → WhatsApp (Irlanda) | 3 | 3 | 3 | 3 | 3 | 2 |
| [Townhouse](https://townhouse.co.uk/) | cadena premium (UK) | 3 | 2 | 3 | 4 | 3 | 3 |
| [Feet Office](https://podolog-amsterdam.nl/) | pies, solo WhatsApp (Ámsterdam) | 3 | 2 | 3 | 3 | 3 | 3 |
| [Glow Beauty Studio](https://glowbeautystudio.gg/) | local (Guernsey) | 3 | 4 | 3 | 3 | 2 | 3 |
| [Queen B](https://queenb.london/) | uñas + pies (UK) | 3 | 4 | 3 | 2 | 2 | 4 |
| [Just Lols Nails](https://www.justlolsnails.com/) | local (St Helier) | 3 | 2 | 3 | 4 | 2 | 3 |
| [Bare Nailscessity](https://barenailscessity.com/) | local comparable, una técnica | 3 | 2 | 2 | 3 | 2 | 4 |
| [Venetian Nail Spa](https://venetianspa.ca/) | premium, premiado en Awwwards 2026 | 3 | 1 | 2 | 4 | 2 | 2 |

Ningún sitio llega a 5 global: todos fallan en algo importante. Venetian Nail Spa, el único con
premio de diseño reciente, es el mejor ejemplo de que **verse bien no basta**: sus precios están en
PDF, su texto no llega al contraste AA y no tiene botón fijo en móvil.

Otros 30 sitios capturados (sin análisis profundo, solo medición): Nails by Thuy, Gloss Nails,
Nails by Niamh, Richmond Beauty Therapist, Paintbrush Nails, Take My Hand, Russian Manicure Studio,
Studio Thirteen Nails, J.A.G Studio, Milk Nails, BUFF, Project Essence, Ama The Salon, sundays,
Vanity Projects, Shoreditch Nails, Tropical Popical, MINK Dublin, Paintbox, Yulia Hamilton, JINsoon,
Remedi Nail Spa, Margaret Dabbs, March14, Medi Pedi NYC, Zoe Lavender, Luxe Feet, My Ideal Nails,
Body & Soul (St Helier) y Paint Nail Bar (Guernsey).

## 4. Lo que hacen los 51 sitios (medido, no opinado)

| Medida | Resultado |
| ------ | --------- |
| Muestran precios en lo capturado | 39/51 (76 %); en la propia home solo 21/51 (41 %) |
| Muestran duraciones | 32/51 (62 %) |
| Hablan de "solicitud" en vez de reserva | 5/51 (9 %) — casi nadie explica bien un modelo sin reserva instantánea |
| Enlace a WhatsApp en la home | 7/51 (13 %) |
| Usan plataforma de reservas externa | ~50 %; la más común es Fresha (8), y en Jersey domina |
| Cabecera fija en escritorio | 37/51 (72 %) |
| Elemento fijo con verbo de reserva en móvil | 18/51 (35 %) |
| Burbuja flotante (chat/WhatsApp) en móvil | 6/51 (11 %) |
| Héroe con foto | 39/51; solo 2 con héroe tipográfico/SVG |
| Titular alineado a la izquierda | 27 vs. 13 centrados |
| Datos estructurados `NailSalon` | 10/51 |
| Estrellas o "X reseñas" | 19/51 |
| CTA más repetido | "Book now" (19 sitios) |

Lectura: en **Jersey**, Fresha hace de web para casi todos los salones; los que tienen web propia
la usan como tarjeta de visita (precios en PDF, sin duraciones, sin explicar nada). Una web que
explique bien el menú y el proceso **ya se distingue en el mercado local**.

## 5. Patrones que funcionan (y cómo los adopta el DESIGN.md)

1. **Fila de menú completa.** Nombre claro → una frase de "para quién es" → duración → precio →
   acción propia que lleva ese servicio al formulario. Lo mejor: The Nail Editor, cureate, Becca,
   Paint Nails. *Adoptado:* componente **Menu row**.
2. **Nombre llano primero, nombre de la casa después.** "Gel Manicure (The Flex Edit)": se reconoce
   lo genérico y se aprende la marca. *Adoptado* en la sección de voz.
3. **Ayuda para elegir entre servicios parecidos** (gel vs. BIAB vs. ruso vs. extensiones; pedicura
   vs. cuidado de pies): elector por preguntas (Canvas10, Becca), "¿cuál es para mí?" (Queen B),
   párrafos "X o Y" (Zachwyt), una opción por defecto para indecisas (Ovora). *Adoptado:* el
   Treatment Finder actual + "qué no es" en cada descripción.
4. **Explicar el modelo de solicitud con la razón primero** ("una clienta a la vez, así que cada
   cita se confirma a mano") y en **tres pasos** con tiempo de respuesta (The Nail Editor, Little
   Nail Lab, Zachwyt). *Adoptado:* componente **How a request works**.
5. **Decir qué pasa después del clic, junto al botón** (cureate, MedPedicure). Casi nadie lo hace.
   *Adoptado:* regla obligatoria en Voice + **Note before request**.
6. **Confianza por hechos comprobables, no por estrellas**: tira de datos de proceso (GA Salons),
   protocolo de higiene numerado que termina en un paso que la clienta ve (Feet Office), "estándares"
   en lugar de reseñas (Ovora). *Adoptado:* **Fact strip** + **Hygiene block**.
7. **Políticas con su porqué, en números y junto a la acción** (HORTUS, Townhouse, Little Nail
   Lab). *Adoptado:* Note before request (cuando la dueña fije las reglas).
8. **Cuidado de pies con límites explícitos**: qué se hace, qué no, cuándo ir al médico/podólogo
   (MedPedicure, Missy Lui). *Adoptado:* **Foot-care scope note**.
9. **Secciones sin fotos que igual se ven diseñadas**: bandas de color, filetes finos, ojal +
   título serif, numerales grandes, ornamentos propios (Ovora, Becca, cureate, Venetian). *Adoptado:*
   es la base de todo el sistema (no hay fotos reales todavía).
10. **Una sola acción, una sola etiqueta, siempre a mano** (Paint Nails, Townhouse, Solid Nail).
    *Adoptado:* botón en la cabecera fija + barra inferior opcional en móvil, nunca burbuja flotante.

**Lo que NO se copia (aunque se vea bien):** héroe con foto o vídeo, galerías antes/después,
reseñas y estrellas, logos de prensa, "Book now" y cuentas de cliente, PDFs de precios, menús
escondidos tras pestañas, nombres "medical/podiatry" para pies, banners de descuento.

## 6. Diagnóstico del sitio actual frente al DESIGN.md

**Ya está bien (se mantiene):** paleta real muestreada de la guía, tipografías con roles claros,
logo en SVG, menú tipográfico con precio y duración, lenguaje de "request" en el menú y en el flujo,
cero reseñas o fotos inventadas, Treatment Finder, higiene explicada, FAQ, accesibilidad cuidada
(foco visible, movimiento reducido, contraste medido).

**Brechas detectadas (no se tocó código; es la lista de trabajo pendiente):**

| Prioridad | Brecha | Dónde | Cambio propuesto |
| --- | --- | --- | --- |
| Alta | Los botones principales dicen "Book an appointment"/"Book" | `Navbar.tsx`, `Hero.tsx`, `Footer.tsx` | "Request an appointment" / "Request" |
| Alta | No hay bloque visible de "cómo funciona una solicitud" (3 pasos + tiempo de respuesta) junto al formulario | flujo de reserva, Visiting | componente *How a request works* |
| Alta | El botón "Request" de cada fila mide 36 px de alto (`u-btn-sm`) | `Treatments.tsx` | mínimo 44 px |
| Alta | Falta nota sobre qué incluye el precio y cómo se cobra quitar producto de otro salón, reparaciones, arte | encima del menú | *Note* + respuesta de la dueña |
| Media | El borde de los campos (`oyster-300`, 1,59:1) no llega al 3:1 que exige WCAG para controles | `index.css` `.u-field` | `oyster-500` |
| Media | Texto secundario con opacidad (`text-jacobean/70`): sobre Pearl Bush pleno baja a 4,29:1 | varios | color sólido `#71534A` |
| Media | Pasos futuros del indicador con borde `oyster-400` (2,23:1) | `BookingModal.tsx` | `oyster-500` |
| Media | La nota "cuándo ir al médico/podólogo" está solo en el FAQ | `FootHealth.tsx` | repetirla junto a los servicios de pies |
| Media | Etiqueta de botón 12 px / 0,22em | `index.css` `.u-btn` | 13 px / 0,18em (más legible) |
| Baja | JSON-LD solo `BeautySalon` | `index.html` | `["NailSalon","BeautySalon"]` (Google pide el subtipo más específico) |
| Baja | Barra inferior de solicitud en móvil (opcional; la cabecera fija ya tiene botón) | — | solo si las métricas lo piden |

## 7. Puntos legales que condicionan el diseño (no es asesoría legal)

- **Reseñas falsas:** en Jersey, la *Consumer Protection (Unfair Practices) (Jersey) Law 2018*
  considera siempre desleal hacerse pasar por consumidor y mostrar sellos o avales sin autorización.
  En UK, la DMCC Act 2024 prohíbe además publicar reseñas falsas o sesgadas. → nada de reseñas
  hasta que sean reales y con permiso.
- **Títulos sanitarios:** en Jersey, la *Health Care (Registration) (Jersey) Law 1995* es **más
  amplia** que la norma inglesa: no solo protege "chiropodist/podiatrist", también castiga
  *ejercer* la ocupación o usar palabras que *impliquen* estar cualificada para ella, sin exigir
  intención de engañar. → **Pregunta abierta:** confirmar con un abogado o con la Jersey Care
  Commission si "podology" y "podology specialist" (usados hoy en la web) son aceptables. El
  `DESIGN.md` ya prohíbe "podiatry/chiropody/medical/treat/cure".
- **Datos personales:** el formulario recoge nombre, teléfono y notas que pueden incluir salud
  (dato de categoría especial en la *Data Protection (Jersey) Law 2018*). Quien recibe esos mensajes
  por WhatsApp es responsable del tratamiento y, según la JOIC, debe **registrarse** (cuota base de
  £70 para negocios de menos de 10 empleados). → pregunta para la dueña.
- **Precios "desde":** solo si una cita típica sencilla cuesta realmente ese precio (guía de la ASA).

## 8. Cómo usar el DESIGN.md en Stitch

Resumen: vas a crear un proyecto en Stitch y cargarle el `DESIGN.md` como sistema de diseño, para que
cada pantalla que generes respete la marca. Son 7 pasos por la vía de línea de comandos (la única
documentada oficialmente para subir el archivo). Necesitas una cuenta de Google con acceso a Stitch
y Node 20 o superior en tu portátil. **No lo probé** (no hay cuenta conectada aquí): los comandos
salen de la documentación oficial de Stitch para la CLI `@google/stitch` 0.13.0 (publicada el
17/11/2026).

1. 📍 **Terminal B — tu portátil**, cualquier carpeta. Instala la CLI oficial de Stitch:
   ```bash
   npm install -g @google/stitch
   ```
   Qué hace: instala los comandos `stitch` y `stitch-mcp`. Debes ver `added … packages` sin errores.
   Si dice `EACCES`, repítelo con un Node instalado con nvm (no uses `sudo`).

2. 📍 **Terminal B — tu portátil.** Inicia sesión:
   ```bash
   stitch login
   ```
   Qué hace: abre el navegador para el login de Google (por eso va en el portátil y no en el VPS).
   Debes ver un mensaje de sesión iniciada.

3. 📍 **Terminal B — tu portátil.** Crea el proyecto:
   ```bash
   stitch create project --title "The Coco Club"
   ```
   Qué hace: crea un proyecto vacío y muestra su ID. Copia ese ID para el paso 4.

4. 📍 **Terminal B — tu portátil.** Fija ese proyecto como el activo:
   ```bash
   stitch config set project <ID_DEL_PASO_3>
   ```
   Cambia `<ID_DEL_PASO_3>` por el ID que te devolvió el paso 3.

5. 📍 **Terminal B — tu portátil**, dentro de tu copia del repo (la que tenga el `DESIGN.md`).
   Sube el sistema de diseño:
   ```bash
   stitch upload design DESIGN.md --apply
   ```
   Qué hace: convierte el `DESIGN.md` en el sistema de diseño del proyecto; la siguiente pantalla que
   generes ya lo usa. Debes ver que se creó o actualizó un *design system*.

6. 📍 **Terminal B — tu portátil.** Comprueba que quedó cargado:
   ```bash
   stitch find design-systems
   ```
   Debe aparecer un sistema llamado "The Coco Club".

7. 📍 **Navegador — stitch.withgoogle.com.** Abre el proyecto y genera pantallas con los prompts de
   abajo. Si prefieres no usar la CLI: en el panel *Design System* de la web se puede editar el
   texto del DESIGN.md directamente y pegar el contenido (la documentación no detalla más pasos).

**Verificación final:** en la web de Stitch, abre *Design System → DESIGN.md* del proyecto y
comprueba que empieza por `name: The Coco Club`; genera la pantalla 1 y verifica que el fondo es
crema (#FDF8F2), los botones marrón (#452319) y que no aparece ni dorado ni negro.

⚠️ Si creas una API key de Stitch, **no la guardes en el repo** ni en un `.env` que se suba a Git.

**Aviso sobre fuentes:** Stitch admite Syne, pero no Italiana ni Fraunces, y puede sustituirlas.
El `DESIGN.md` ya le indica los sustitutos para maquetas (Bodoni Moda y Newsreader cursiva). La web
real sigue usando Italiana y Fraunces.

**Prompts listos para Stitch** (según la guía oficial: con el sistema cargado, no repitas colores
ni fuentes en el prompt; describe contenido, no estilo):

1. *Home móvil* — "Mobile landing page for a private one-to-one nail and foot-care studio in Saint
   Helier, Jersey. Sticky header with the logo and a 'Request' button. Centred hero: brand wordmark,
   the line 'The Art of Taking Care', two sentences saying one technician works with one client at a
   time on La Motte Street, a 'Request an appointment' button and a quiet 'Ask on WhatsApp' link.
   Under it a three-cell fact strip: 'One at a time', '30+ years', 'Saint Helier'. No photographs,
   no reviews, no ratings."
2. *Menú de servicios* — "Treatments and prices section. Left-aligned title, a short note on what
   prices include and how removal of other salons' work is charged. Ruled list grouped under small
   headings: BIAB & natural nails, Sculpted extensions, Pedicures & foot care, Nail art. Each row:
   treatment name, one sentence on who it suits, price and duration on the right, a 'Request'
   button. No images, no cards, no tabs."
3. *Flujo de solicitud* — "Three-step request dialog: choose a treatment, choose a preferred day and
   start time, enter name and mobile number. Sticky footer with running price and duration. Final
   screen titled 'Your request' showing the composed WhatsApp message, the status 'Awaiting
   confirmation' and a large 'Send my request on WhatsApp' button, with one line saying nothing is
   held until the studio replies."
4. *Cuidado de pies* — "Dark band section about non-medical foot care: title, one italic line, a
   short paragraph, a 2x2 grid of common concerns (hard skin, cracked heels, thickened nails, a nail
   corner that catches), a hygiene note in four numbered steps, a scope note saying when to see a GP
   or podiatrist instead, and one inverse 'Request foot care' button."

## 9. Preguntas abiertas para la dueña (no se inventaron)

1. Plazo de cancelación, retrasos y si habrá depósito.
2. Tiempo de respuesta real a las solicitudes (para escribirlo junto al botón).
3. Precio de retirar producto de otro salón y de reparaciones.
4. ¿"Podology" es aceptable en Jersey? (ver §7).
5. ¿Está registrada ante la JOIC como responsable de datos?
6. Dominio definitivo (`.je`) para canonical, Open Graph y JSON-LD.
7. Cuándo habrá fotos reales del trabajo y reseñas reales (los huecos ya están previstos en el sistema).

## 10. Archivos

- `DESIGN.md` (raíz del repo) — el sistema de diseño para Stitch y para cualquier agente.
- `docs/investigacion-diseno.md` — este informe.
- La carpeta `Otros/` que ya estaba en el servidor contiene las mismas 3 imágenes que `Varios/`
  (idénticas byte a byte) y no está versionada.
