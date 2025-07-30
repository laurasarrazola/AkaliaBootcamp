document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#etiquetasTagify");
  const hiddenInput = document.querySelector("#etiquetasHidden");

  if (input && hiddenInput) {
    const todasEtiquetas = JSON.parse(input.dataset.etiquetas || "[]");
    const etiquetasSeleccionadas = JSON.parse(input.dataset.etiquetasSeleccionadas || "[]");

    const tagify = new Tagify(input, {
      whitelist: todasEtiquetas.map(e => e.nombreEtiqueta),
      dropdown: { enabled: 1 }
    });

    // Mostrar etiquetas seleccionadas en forma visual
    const etiquetasIniciales = etiquetasSeleccionadas.map(id => {
      const encontrada = todasEtiquetas.find(et => et.idEtiqueta === id);
      return encontrada ? encontrada.nombreEtiqueta : null;
    }).filter(Boolean);

    tagify.addTags(etiquetasIniciales);

    // Actualiza el input oculto cuando cambia tagify
    const actualizarHidden = () => {
      const etiquetasSeleccionadas = tagify.value.map(tag => {
        const etiqueta = todasEtiquetas.find(et => et.nombreEtiqueta === tag.value);
        return etiqueta?.idEtiqueta?.toString();
      }).filter(Boolean);
      hiddenInput.value = JSON.stringify(etiquetasSeleccionadas);
    };

    tagify.on('add', actualizarHidden);
    tagify.on('remove', actualizarHidden);

    // Inicializa el valor oculto al inicio
    actualizarHidden();
  }
});
