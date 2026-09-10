# Decisiones técnicas

## Funcionalidad

- El botón de submit del formulario de login permanece habilitado aunque el formulario tenga errores. La validación ocurre al intentar enviarlo y los mensajes se muestran juntos en el alert superior, tal como pide la historia de usuario. Así el usuario siempre puede activar el feedback y entender qué debe corregir; el botón solo se deshabilita durante la petición para evitar envíos duplicados. Ver [NN/g](https://www.nngroup.com/videos/why-disabled-buttons-hurt-ux-and-how-to-fix-them/) y [Smashing Magazine](https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/).
- La empresa seleccionada se envía a transferencias mediante el estado de navegación. Angular la escribe en la entrada de `history.state`, por lo que puede recuperarla al recorrer el historial dentro de la SPA. En Angular 13, una recarga completa inicia una navegación que reemplaza ese estado; transferencias deberá tratar la ausencia de empresa como una entrada inválida. Para empresas se adopta `cuit`, pese a que `api.yaml` declara `cuil`, porque el requerimiento funcional, la entidad, los datos y los handlers reales coinciden en `cuit`.

## Estructura y estilos

- No se usa una única unidad para todo. `rem` se usa en texto, anchos máximos y breakpoints porque esos valores deberían acompañar el tamaño de fuente elegido por el usuario. `px` se usa en espaciados de layout y radios: si esos espacios crecen junto con el texto, pueden quitar área útil y volver la pantalla innecesariamente alta. La discusión `px` vs. `rem` suele simplificarse demasiado; estas referencias explican los trade-offs: [Josh Comeau](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/) y [Ashlee M. Boyer](https://ashleemboyer.com/blog/why-you-should-use-px-units-for-margin-padding-and-other-spacing-techniques).
- Se incorporaron design tokens para estilos nuevos y heredados. Al migrar valores existentes se preservaron los que tenían coherencia visual.
- Se eliminó `TypographyComponent`: no tenía usos y obligaba a renderizar un `<p>`, incluso cuando el contenido necesitaba otra semántica.
