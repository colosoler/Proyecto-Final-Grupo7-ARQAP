PrestamoController::registrarPrestamo(
  solicitante: Solicitante,
  piezas[1..*]: PiezaArqueologica
) {
  foreach (pieza in piezas) {
    // Le preguntamos a la pieza (la Experta en Información) si está disponible
    if (NOT pieza.estaDisponible()) {
      return false
    }
  }

  PrestamoBD.persistir(Prestamo.crear(solicitante, piezas));

  foreach (pieza in piezas) {
    pieza.Prestar();
  }
}

Prestamo::crear(
  solicitante: Solicitante,
  piezas[1..*]: PiezaArqueologica
) : Prestamo {
  p = self.new();
  p.setFechaHoraPrestamo(getDate());
  p.setFechaHoraDevolucion(null); // La devolución aún no ocurrió
  p.setSolicitante(solicitante);
  p.setPiezas(piezas)

  return p;
}


//Método de la clase PiezaArqueologica para consultar su estado
PiezaArqueologica::estaDisponible() {
  return self.disponible()
}

// Método de la clase PiezaArqueologica para actualizar su disponibilidad
PiezaArqueologica::Prestar() {
  self.setDisponible(false);
  PiezaArqueologicaBD.actualizarDisponibilidad(self);
}